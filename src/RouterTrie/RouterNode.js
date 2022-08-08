import { getDynamicSegment, isDynamicSegment } from '../utils';

export default class RouterNode {
  constructor(path, routeData = null) {
    this.pathSegment = path;
    this.staticChildren = new Map();
    this.dynamicChildren = new Map();
    this.routeData = routeData;
  }

  getRouteData() {
    return this.routeData;
  }

  addChild(pathSegment, routeData) {
    const currentChildren = isDynamicSegment(pathSegment)
      ? this.dynamicChildren
      : this.staticChildren;

    if (currentChildren.has(pathSegment)) return currentChildren.get(pathSegment);

    const node = new RouterNode(pathSegment, routeData);
    currentChildren.set(pathSegment, node);
    return node;
  }

  findStaticChild(segments, method) {
    const [segment, ...rest] = segments;
    if (!this.staticChildren.has(segment)) return null;

    const child = this.staticChildren.get(segment);
    const data = child.findChild(rest, method);
    return { ...data, path: [segment, ...data.path] };
  }

  findDynamicChild(segments) {
    const [segment, ...rest] = segments;
    // eslint-disable-next-line no-restricted-syntax
    for (const [dynamicSegment, child] of this.dynamicChildren.entries()) {
      const data = child.findChild(rest);
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

  findChild(segments) {
    if (segments.length === 0) {
      const { handler } = this.getRouteData();
      return { path: [], params: {}, handler };
    }

    const data = this.findStaticChild(segments);
    if (data) return data;

    return this.findDynamicChild(segments);
  }
}
