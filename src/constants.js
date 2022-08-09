export const defaultMethod = 'GET';

export const errorsMapping = {
  unknownPathError: (path) => `Unknown path - ${path}`,
  unknownConstraintType: () => `Unknown constraint type`,
};
