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
  logInfo('[CONTAS] - [/POST] HTTP Request :: create method');

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
  logInfo('[CONTAS] - [/GET] HTTP Request :: getAll method');

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
  logInfo('[CONTAS] - [/GET] HTTP Request :: getOne method');

  try {
    response.status(200).json(handleData(await model.getOne(request.query.idConta)));
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
  logInfo('[CONTAS] - [/PUT] HTTP Request :: apdate method');

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
  logInfo('[CONTAS] - [/REMOVE] HTTP Request :: remove method');

  try {
    response.status(200).json(handleData(await model.remove(request.query.idConta)));
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
export const bloquearConta = async (request, response) => {
  logInfo('[CONTAS] - [/PUT] HTTP Request :: bloquearConta method');

  try {
    response.status(200).json(handleData(await model.bloquearConta(request.query.idConta)));
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
export const consultarSaldo = async (request, response) => {
  logInfo('[CONTAS] - [/GET] HTTP Request :: consultarSaldo method');

  try {
    response.status(200).json(handleData(await model.consultarSaldo(request.query.idConta)));
  } catch (e) {
    response.status(500).json(handleError(e));
  }
};
