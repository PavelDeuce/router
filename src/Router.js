import Trie from './Trie/Trie.js';
import { parsePath } from './utils.js';

const isDynamicRoute = (path) => path.startsWith(':');

const normalizePath = (path) => {
  const trimmedPath = path.trim();
  return trimmedPath.endsWith('/') ? trimmedPath.slice(0, -1) : trimmedPath;
};

export default class Router {
  constructor(routes) {
    this.router = new Trie('RouterTrie', '/');
    // eslint-disable-next-line no-restricted-syntax
    for (const route of routes) {
      this.addRoute(route);
    }
  }

  addRoute(route) {
    const normalizedPath = normalizePath(route.path);
    this.router.insert(normalizedPath.slice(1), {
      ...route,
      replacedPath: parsePath(normalizedPath),
    });
  }

  findRoute(path) {
    const data = this.router.find(path.slice(1));
    if (!data) return null;

    return path.match(data.getData().replacedPath) ? data : null;
  }
}
