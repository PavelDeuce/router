import RouterNode from './RouterNode';
import { parsePath } from '../utils';

export default class RouterTrie {
  constructor(routes, divider = '/') {
    this.root = new RouterNode('Router');
    this.divider = divider;

    routes.forEach((route) => {
      this.addRoute(route);
    });
  }

  addRoute(route) {
    const { path } = route;
    const segments = parsePath(path, this.divider);

    segments.reduce((currentNode, segment) => {
      return currentNode.addChild(segment, route);
    }, this.root);
  }

  findRoute(path) {
    const segments = parsePath(path, this.divider);
    const result = this.root.findChild(segments);

    return result ? { ...result, path: result.path.join(this.divider) } : null;
  }
}
