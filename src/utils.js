export const parsePath = (path) => new RegExp(`^${path.replace(/:\w+/gi, '\\w+')}$`);

export const parseParams = (routePath, path) => {
  const parts = path.split('/');
  const colon = ':';

  return routePath.split('/').reduce((params, part, index) => {
    if (!part.startsWith(colon)) return params;

    return { ...params, [part.slice(part.indexOf(colon) + 1)]: parts[index] };
  });
};
