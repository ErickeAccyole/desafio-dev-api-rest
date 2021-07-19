import CustomValidations from './custom-validations';
import Exception from '../../common/exception';
import moment from 'moment';
import { getCurrentDate } from '../../common/utils'
import * as repository from './repository';
import * as contasModel from '../contas/model';
import * as helper from './helper';

/**
 * @param {Number} idTransacao
 * @returns {Function} - Returns a Promise
 */
export const getOne = async (idTransacao) => {
  await CustomValidations.id(idTransacao);

  return repository.getOne(idTransacao);
};

/**
 * @param {Object} transacao
 * @returns {Function} - Returns a Promise
 */
 export const deposito = async (transacao) => {
  await CustomValidations.create(transacao);
  const contaConsulta = await contasModel.getOne(transacao.idConta);

  await _validaDeposito(transacao, contaConsulta);

  const conta = {
    idconta: transacao.idConta,
    saldo: parseFloat(contaConsulta.saldo.substring(3).replace(',', '.')) + parseFloat(transacao.valor)
  };

  transacao.dataTransacao = getCurrentDate();

  return await repository.create(transacao, conta);
};

/**
 * @param {Object} transacao
 * @returns {Function} - Returns a Promise
 */
 export const saque = async (transacao) => {
  await CustomValidations.create(transacao);
  const contaConsulta = await contasModel.getOne(transacao.idConta);  

  await _validaSaque(transacao, contaConsulta);

  const conta = {
    idconta: transacao.idConta,
    saldo: parseFloat(contaConsulta.saldo.substring(3).replace(',', '.') - parseFloat(transacao.valor))
  };

  transacao.valor = transacao.valor * -1;
  transacao.dataTransacao = getCurrentDate();

  return repository.create(transacao, conta);
};

/**
 * @param {Number} idConta
 * @returns {Function} - Returns a Promise
 */
 export const getExtrato = async (idConta) => {
   await CustomValidations.id(idConta);

   let result = await repository.getExtrato(idConta);
   if (!result.length) {
    throw new Exception({
      message: 'Nenhuma transação realizada para esse período!',
      code: 404
    });
  }

   result = await helper.agrupaExtratoPorData(result);

   return result;
 };

 /**
 * @param {Object} data
 * @returns {Function} - Returns a Promise
 */
  export const getExtratoPorPeriodo = async (data) => {
     await CustomValidations.getExtratoPorPeriodo(data);
     await _validaDatasExtrato(data);

     let result = await repository.getExtratoPorPeriodo(data);
     if (!result.length) {
      throw new Exception({
        message: 'Nenhuma transação realizada para esse período!',
        code: 404
      });
     }

     return await helper.agrupaExtratoPorData(result);
   };

  const _validaDeposito = async (transacao, conta) => {
    if (!conta) {
      throw new Exception({
        message: 'Conta não localizada!',
        code: 404
      });
    }

    if (!conta.flagAtivo) {
      throw new Exception({
        message: 'Não é possivel realizar um depósito para uma conta inativa!',
        code: 500
      });
    }
  };

  const _validaSaque = async (transacao, conta) => {
    if (!conta) {
      throw new Exception({
        message: 'Conta não localizada!',
        code: 404
      });
    }

    if (!conta.flagAtivo) {
      throw new Exception({
        message: 'Não é possivel realizar um saque em uma conta inativa!',
        code: 500
      });
    }

    const valor = parseFloat(transacao.valor);
    const saldoEmConta = parseFloat(conta.saldo.substring(3).replace(',', '.'));
    if (valor > saldoEmConta) {
      throw new Exception({
        message: 'Saldo insuficiente!',
        code: 500
      });
    }

    const result = await repository.getTotalSaqueDiaAtual(transacao.idConta);

    const totalSacadoNoDia = parseFloat(result.totalSacadoNoDia)
    const limiteSaqueDiario = parseFloat(conta.limiteSaqueDiario.substring(3).replace(',', '.'));
    
    if ((totalSacadoNoDia + valor) > limiteSaqueDiario) {
      throw new Exception({
        message: 'Limite diário de saque atingido!',
        code: 500
      });
    }
  };

  const _validaDatasExtrato = (data) => {
    const dataInicial = moment(data.dataInicial, "DD/MM/YYYY", true);
    if (!dataInicial.isValid()) {
      throw new Exception({
        message: 'A data inicial inválida! Deve seguir o seguinte padrão: DD/MM/YYYY',
        code: 400
      });
    }

    const dataFinal = moment(data.dataFinal, "DD/MM/YYYY", true);
    if (!dataFinal.isValid()) {
      throw new Exception({
        message: 'A data final inválida! Deve seguir o seguinte padrão: DD/MM/YYYY',
        code: 400
      });
    }

    if (dataInicial > dataFinal) {
      throw new Exception({
        message: 'A data inicial não pode ser maior que a data final!',
        code: 400
      });
    }
  }
