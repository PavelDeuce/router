// @ts-nocheck

/**
 * Parse pathname to segments
 *
 * @param {string} path Pathname string
 * @param {string} divider Pathname divider
 * @returns {string[]} Pathname segments
 */
export const parsePath = (path, divider) => (path === divider
  ? [path]
  : path
    .trim()
    .split(divider)
    .filter((s) => s !== ''));

/**
 * Predicate for dynamic segment
 *
 * @param {string} segment Pathname segment
 * @returns {boolean} Predicate's result
 */
export const isDynamicSegment = (segment) => segment.startsWith(':');

/**
 * Slice start of dynamic segment
 *
 * @param {string} segment Pathname segment
 * @returns {string} Dynamic segment
 */
export const getDynamicSegment = (segment) => segment.slice(1);

/**
 * Get constraint depends pathname segment
 *
 * @param {Object<string, RegExp | Function>} constraintsMapping Map of constraints
 * @param {string} segment Pathname segment
 * @returns {RegExp | Function | null} Constraint
 */
export const getConstraintBySegment = (constraintsMapping, segment) => {
  if (!isDynamicSegment(segment)) return null;

  const dynamicSegment = getDynamicSegment(segment);
  return constraintsMapping[dynamicSegment] ?? null;
};
