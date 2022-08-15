// @ts-check

export const defaultMethod = 'GET';

export const errorsMapping = {
  unknownPathError: (path = '') => `No such path - ${path}`,
  unknownConstraintType: () => 'Unknown constraint type',
};

export const constraintValidatorsMapping = {
  isNull: (constraint) => constraint === null,
  isFunction: (constraint) => typeof constraint === 'function',
  isRegExp: (constraint) => constraint instanceof RegExp,
};
