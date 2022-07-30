import Router from './Router.js';
import { parseParams } from './utils.js';

export default (routes) => {
  const router = new Router(routes);

  const serve = (path) => {
    const route = router.findRoute(path);

    if (!route) throw new Error(`Unknown path - ${path}`);

    const routeData = route.getData();

    return {
      path: routeData.path,
      handler: routeData.handler,
      params: parseParams(routeData.path, path),
    };
  };

  return { serve };
};
