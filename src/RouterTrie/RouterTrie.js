// @ts-check

import RouterNode from './RouterNode.js';
import { parsePath, getConstraintBySegment } from '../utils.js';
import { defaultMethod, errorsMapping } from '../constants.js';

/** Class representing Router Trie */
export default class RouterTrie {
  constructor(routes, divider = '/') {
    this.root = new RouterNode();
    this.divider = divider;

    routes.forEach((route) => {
      const { method = defaultMethod } = route;
      this.addRoute({ ...route, method });
    });
  }

  addRoute(route) {
    const { path, constraints = {} } = route;
    const segments = parsePath(path, this.divider);

    segments.reduce((currentNode, segment) => {
      const constraint = getConstraintBySegment(constraints, segment);
      return currentNode.addChild(segment, { ...route, constraint });
    }, this.root);
  }

  findRoute(path, method) {
    const segments = parsePath(path, this.divider);

    if (segments.length === 0 && path !== this.divider) {
      throw new Error(errorsMapping.unknownPathError(path));
    }

    const result = this.root.findChild(segments, method);

    return result ? { ...result, path: result.path.join(this.divider) } : null;
  }
}
