import CustomValidations from './custom-validations';
import * as repository from './repository';


/**
 * @param {Number} idPessoa
 * @returns {Function} - Returns a Promise
 */
export const getOne = async (idPessoa) => {
  await CustomValidations.id(idPessoa);

  return repository.getOne(idPessoa);
};
