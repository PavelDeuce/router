import RouterNode from './RouterNode.js';
import { parsePath } from '../utils.js';
import defaultMethod from '../constants.js';

export default class RouterTrie {
  constructor(routes, divider = '/') {
    this.root = new RouterNode('Router');
    this.divider = divider;

    routes.forEach((route) => {
      const { method = defaultMethod } = route;
      this.addRoute({ ...route, method });
    });
  }

  addRoute(route) {
    const { path } = route;
    const segments = parsePath(path, this.divider);

    segments.reduce((currentNode, segment) => {
      return currentNode.addChild(segment, route);
    }, this.root);
  }

  findRoute(path, method) {
    console.log(path, method);
    const segments = parsePath(path, this.divider);
    const result = this.root.findChild(segments, method);

    return result ? { ...result, path: result.path.join(this.divider) } : null;
  }
}
