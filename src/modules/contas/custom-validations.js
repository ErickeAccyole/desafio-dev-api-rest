/**
 * Module dependencies
 */
 import * as Joi from 'joi';
 import Validations from '../../common/validations';
 import Exception from '../../common/exception';
 
 export default class CustomValidations extends Validations {
   static create(fields) {
     const schema = Joi.object().keys({
       idPessoa: Joi.number().integer().required(),
       saldo: Joi.number().greater(0).required(),
       limiteSaqueDiario: Joi.number().greater(0).required(),
       flagAtivo: Joi.boolean().required(),
       tipoConta: Joi.number().integer().required(),
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
 
   static update(fields) {
     const schema = Joi.object().keys({
       idConta: Joi.number().integer().required(),
       idPessoa: Joi.number().integer().required(),
       saldo: Joi.number().greater(0).required(),
       limiteSaqueDiario: Joi.number().greater(0).required(),
       flagAtivo: Joi.boolean().required(),
       tipoConta: Joi.number().integer().required(),
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
 