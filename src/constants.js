export const defaultMethod = 'GET';

export const errorsMapping = {
  unknownPathError: (path = '') => `No such path - ${path}`,
  unknownConstraintType: () => 'Unknown constraint type',
};
