import RouterTrie from './RouterTrie/RouterTrie.js';
import { defaultMethod, errorsMapping } from './constants.js';

export default (routes) => {
  const router = new RouterTrie(routes);

  const serve = ({ path, method = defaultMethod }) => {
    const route = router.findRoute(path, method);

    if (!route || !route.handler) throw new Error(errorsMapping.unknownPathError(path));

    return route;
  };

  return { serve };
};
