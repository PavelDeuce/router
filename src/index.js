import RouterTrie from './RouterTrie/RouterTrie';

export default (routes) => {
  const router = new RouterTrie(routes);

  const serve = (path) => {
    const route = router.findRoute(path);

    if (!route) throw new Error(`Unknown path - ${path}`);

    return route;
  };

  return { serve };
};
