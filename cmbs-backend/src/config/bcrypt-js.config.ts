import {hashSync, genSaltSync, compareSync} from 'bcryptjs';

export const generateEncryption = (param: string): string => {
  const salt = genSaltSync(10);
  const hashed = hashSync(param, salt);
  return hashed;
};

export const compareEncryption = (
  planeParam: string,
  encryptedParam: string,
): boolean => {
  return compareSync(planeParam, encryptedParam);
};
