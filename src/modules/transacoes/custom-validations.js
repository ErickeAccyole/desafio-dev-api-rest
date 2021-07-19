/**
 * Module dependencies
 */
 import * as Joi from 'joi';
 import Validations from '../../common/validations';
 import Exception from '../../common/exception';
 
 export default class CustomValidations extends Validations {
   static create(fields) {
     const schema = Joi.object().keys({
       idConta: Joi.number().integer().required(),
       valor: Joi.number().greater(0).required()
     });
 
     const result = schema.validate(fields);
     if (result.error) {
       throw new Exception({
         message: result.error.message,
         code: 400
       });
     }
 
     return this;
   }

   static getExtratoPorPeriodo(fields) {
    const schema = Joi.object().keys({
      idConta: Joi.number().integer().required(),
      dataInicial: Joi.string().trim().required(),
      dataFinal: Joi.string().trim().required()
    });

    const result = schema.validate(fields);
    if (result.error) {
      throw new Exception({
        message: result.error.message,
        code: 400
      });
    }

    return this;
  }
 }
 