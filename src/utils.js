export const parsePath = (path, divider) =>
  path
    .trim()
    .split(divider)
    .filter((s) => s !== '');

export const isDynamicSegment = (segment) => segment.startsWith(':');

export const getDynamicSegment = (segment) => segment.slice(1);

export const constraintValidatorsMapping = {
  isNull: (constraint) => constraint === null,
  isFunction: (constraint) => typeof constraint === 'function',
  isRegExp: (constraint) => constraint instanceof RegExp,
};

export const getConstraintBySegment = (constraintsMapping, segment) => {
  if (!isDynamicSegment(segment)) return null;

  const dynamicSegment = getDynamicSegment(segment);
  return constraintsMapping[dynamicSegment] ?? null;
};
