export default (routes) => {
  const serve = (path) => {
    const foundPath = routes.find((route) => path === route.path);

    if (!foundPath) throw new Error('Unknown path');

    return foundPath.handler;
  };

  return { serve };
};
