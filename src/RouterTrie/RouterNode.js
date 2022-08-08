import { getDynamicSegment, isDynamicSegment } from '../utils.js';

export default class RouterNode {
  constructor(path, routeData = null) {
    this.pathSegment = path;
    this.staticChildren = new Map();
    this.dynamicChildren = new Map();
    this.handlersByMethodMapping =
      routeData && routeData.method ? { [routeData.method]: routeData.handler } : {};
  }

  addChild(pathSegment, routeData) {
    const currentChildren = isDynamicSegment(pathSegment)
      ? this.dynamicChildren
      : this.staticChildren;

    if (!currentChildren.has(pathSegment)) {
      const node = new RouterNode(pathSegment, routeData);
      currentChildren.set(pathSegment, node);
      return node;
    }

    const { handler, method } = routeData;
    if (routeData && !this.handlersByMethodMapping[method])
      this.handlersByMethodMapping[method] = handler;
    return currentChildren.get(pathSegment);
  }

  findStaticChild(segments, method) {
    const [segment, ...rest] = segments;
    if (!this.staticChildren.has(segment)) return null;

    const child = this.staticChildren.get(segment);
    const data = child.findChild(rest, method);
    return { ...data, path: [segment, ...data.path] };
  }

  findDynamicChild(segments, method) {
    const [segment, ...rest] = segments;
    // eslint-disable-next-line no-restricted-syntax
    for (const [dynamicSegment, child] of this.dynamicChildren.entries()) {
      const data = child.findChild(rest, method);
      if (data !== null) {
        const name = getDynamicSegment(dynamicSegment);
        return {
          ...data,
          path: [dynamicSegment, ...data.path],
          params: { [name]: segment, ...data.params },
        };
      }
    }

    return null;
  }

  findChild(segments, method) {
    if (segments.length === 0) {
      const handler = this.handlersByMethodMapping[method];
      return { path: [], params: {}, handler };
    }

    const data = this.findStaticChild(segments, method);
    if (data) return data;

    return this.findDynamicChild(segments, method);
  }
}
