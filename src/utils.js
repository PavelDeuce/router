export const parsePath = (path, divider) =>
  path
    .trim()
    .split(divider)
    .filter((s) => s !== '');

export const isDynamicSegment = (segment) => segment.startsWith(':');

export const getDynamicSegment = (segment) => segment.slice(1);
