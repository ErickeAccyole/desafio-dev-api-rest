/*
  Module dependencies
*/
import moment from 'moment';
import * as Joi from 'joi';
import Exception from './exception';

export default class Validations {
  static id(id) {
    const schema = Joi.number().integer().required();
    const result = schema.validate(id);

    if (result.error) {
      throw new Exception({
        message: 'ID inválido',
        code: 400
      });
    }

    return this;
  }

  static isInteger(number) {
    const schema = Joi.number().integer().required();
    const result = schema.validate(number);

    if (result.error) {
      throw new Exception({
        message: 'Número inteiro inválido',
        code: 400
      });
    }

    return this;
  }

  static isNumber(number) {
    const schema = Joi.number().required();
    const result = schema.validate(number);

    if (result.error) {
      throw new Exception({
        message: 'Número inválido',
        code: 400
      });
    }

    return this;
  }

  static isBoolean(b) {
    const schema = Joi.boolean();
    const result = schema.validate(b);

    if (result.error) {
      throw new Exception({
        message: 'Tipo boolean inválido',
        code: 400
      });
    }

    return this;
  }

  static date(date) {
    const isValid = moment(date).isValid();

    if (!isValid) {
      throw new Exception({
        message: 'Data inválida',
        code: 400
      });
    }
  }
}
