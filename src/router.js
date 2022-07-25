import { parseRoutes, parseParams } from './utils.js';

export default (routes) => {
  const parsedRoutes = parseRoutes(routes);

  const serve = (path) => {
    const route = parsedRoutes.find((r) => path.match(r.replacedPath));

    if (!route) throw new Error(`Unknown path - ${path}`);

    return {
      path: route.path,
      handler: route.handler,
      params: parseParams(route.path, path),
    };
  };

  return { serve };
};
