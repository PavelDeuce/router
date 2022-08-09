import { errorsMapping } from '../constants.js';
import { getDynamicSegment, isDynamicSegment, constraintValidatorsMapping } from '../utils.js';

export default class RouterNode {
  constructor(routeData = null) {
    this.staticChildren = new Map();
    this.dynamicChildren = new Map();
    this.constraint =
      routeData && routeData.constraint && RouterNode.validateConstraint(routeData.constraint)
        ? routeData.constraint
        : null;
    this.handlersByMethodMapping =
      routeData && routeData.method ? { [routeData.method]: routeData.handler } : {};
  }

  static validateConstraint(constraint) {
    const validConstraint =
      constraintValidatorsMapping.isNull(constraint) ||
      constraintValidatorsMapping.isRegExp(constraint) ||
      constraintValidatorsMapping.isFunction(constraint);

    if (!validConstraint) throw new Error(errorsMapping.unknownConstraintType());
    return validConstraint;
  }

  validateParam(paramName) {
    if (constraintValidatorsMapping.isNull(this.constraint)) return true;
    if (constraintValidatorsMapping.isFunction(this.constraint)) return this.constraint(paramName);
    return paramName.match(this.constraint);
  }

  addChild(pathSegment, routeData) {
    const currentChildren = isDynamicSegment(pathSegment)
      ? this.dynamicChildren
      : this.staticChildren;

    if (!currentChildren.has(pathSegment)) {
      const node = new RouterNode(routeData);
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
    return data ? { ...data, path: [segment, ...data.path] } : null;
  }

  findDynamicChild(segments, method) {
    const [segment, ...rest] = segments;
    // eslint-disable-next-line no-restricted-syntax
    for (const [dynamicSegment, child] of this.dynamicChildren.entries()) {
      const data = child.findChild(rest, method);
      if (data !== null && child.validateParam(segment)) {
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
