import RouterTrie from './RouterTrie/RouterTrie.js';
import defaultMethod from './constants.js';

export default (routes) => {
  const router = new RouterTrie(routes);

  const serve = ({ path, method = defaultMethod }) => {
    const route = router.findRoute(path, method);

    if (!route) throw new Error(`Unknown path - ${path}`);

    return route;
  };

  return { serve };
};
