// @ts-check

import RouterTrie from './RouterTrie/RouterTrie.js';
import { defaultMethod, errorsMapping } from './constants.js';

/**
 * Build router for routes
 *
 * @param {Array<{
 * path: string, method: string, handler: Function, constraints: Object<string, RegExp | Function>}>
 * } routes Pathname segment
 * @returns {{serve: Function}} Router's serve method
 */
export default (routes) => {
  const router = new RouterTrie(routes);

  const serve = ({ path, method = defaultMethod }) => {
    const route = router.findRoute(path, method);

    if (!route || !route.handler) throw new Error(errorsMapping.unknownPathError(path));

    return route;
  };

  return { serve };
};
