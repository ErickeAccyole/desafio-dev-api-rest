import * as model from './model';
import {
  logInfo,
  handleData,
  handleError,
} from '../../common/utils';

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const create = async (request, response) => {
  logInfo('[TRANSACOES] - [/POST] HTTP Request :: create method');

  try {
    response.status(200).json(handleData(await model.create(request.body)));
  } catch (e) {
    response.status(500).json(handleError(e));
  }
};

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const getAll = async (request, response) => {
  logInfo('[TRANSACOES] - [/GET] HTTP Request :: getAll method');

  try {
    response.status(200).json(handleData(await model.getAll()));
  } catch (e) {
    response.status(500).json(handleError(e));
  }
};

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const getOne = async (request, response) => {
  logInfo('[TRANSACOES] - [/GET] HTTP Request :: getOne method');

  try {
    response.status(200).json(handleData(await model.getOne(request.query.idTransacao)));
  } catch (e) {
    response.status(500).json(handleError(e));
  }
};

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const update = async (request, response) => {
  logInfo('[TRANSACOES] - [/PUT] HTTP Request :: apdate method');

  try {
    response.status(200).json(handleData(await model.update(request.body)));
  } catch (e) {
    response.status(500).json(handleError(e));
  }
};

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const remove = async (request, response) => {
  logInfo('[TRANSACOES] - [/REMOVE] HTTP Request :: remove method');

  try {
    response.status(200).json(handleData(await model.remove(request.query.idTransacao)));
  } catch (e) {
    response.status(500).json(handleError(e));
  }
};

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const deposito = async (request, response) => {
  logInfo('[TRANSACOES] - [/POST] HTTP Request :: deposito method');

  try {
    response.status(201).json(handleData(await model.deposito(request.body)));
  } catch (e) {
    response.status(e.code ? e.code : 500).json(handleError(e));
  }
};

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const saque = async (request, response) => {
  logInfo('[TRANSACOES] - [/POST] HTTP Request :: saque method');

  try {
    response.status(201).json(handleData(await model.saque(request.body)));
  } catch (e) {
    response.status(e.code ? e.code : 500).json(handleError(e));
  }
};

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const getExtrato = async (request, response) => {
  logInfo('[TRANSACOES] - [/GET] HTTP Request :: getExtrato method');

  try {
    response.status(200).json(handleData(await model.getExtrato(request.query.idConta)));
  } catch (e) {
    response.status(500).json(handleError(e));
  }
};

/**
*
* @param {Object} request - HTTP request
* @param {Object} response - HTTP response
* @returns {Object} HTTP response with status code and data
*/
export const getExtratoPorPeriodo = async (request, response) => {
  logInfo('[TRANSACOES] - [/GET] HTTP Request :: getExtratoPorPeriodo method');

  try {
    let data = request.body;
    data.idConta = request.query.idConta;

    response.status(200).json(handleData(await model.getExtratoPorPeriodo(data)));
  } catch (e) {
    response.status(500).json(handleError(e));
  }
};
