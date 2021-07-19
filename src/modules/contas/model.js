import CustomValidations from './custom-validations';
import Exception from '../../common/exception';
import * as repository from './repository';
import * as pessoasModel from '../pessoas/model';

/**
 * @returns {Function} - Returns a Promise
 */
export const getAll = () => repository.getAll();

/**
 * @param {Number} idConta
 * @returns {Function} - Returns a Promise
 */
export const getOne = async (idConta) => {
  await CustomValidations.id(idConta);

  return repository.getOne(idConta);
};

/**
 * @param {Object} conta
 * @returns {Function} - Returns a Promise
 */
export const create = async (conta) => {
  await CustomValidations.create(conta);
  await _validaConta(conta);

  return repository.create(conta);
};

/**
 * @param {Number} idConta
 * @returns {Function} - Returns a Promise
 */
 export const bloquearConta = async (idConta) => {
  await CustomValidations.id(idConta);

  const contaConsulta = await getOne(idConta);
  
  if (!contaConsulta) {
    throw new Exception({
      message: 'Conta não localizada!',
      code: 404
    });
  }

  const conta = {
    idconta: idConta,
    flagativo: false
  };

  return repository.update(conta);
};

/**
 * @param {Number} idConta
 * @returns {Function} - Returns a Promise
 */
 export const consultarSaldo = async (idConta) => {
  await CustomValidations.id(idConta);
  
  const conta = await repository.consultarSaldo(idConta);
  if (!conta) {
    throw new Exception({
      message: 'Conta não localizada!',
      code: 404
    });
  }

  return conta;
};

const _validaConta = async (conta) => {
  const pessoaConsulta = await pessoasModel.getOne(conta.idPessoa);
  if (!pessoaConsulta) {
    throw new Exception({
      message: 'Pessoa não localizada!',
      code: 404
    });
  }
}
