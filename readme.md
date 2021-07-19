# desafio-dev-api-rest

Projeto de desafio feito por Ericke José de Lacerda Accyole

## Pré-requisitos
Necessário a instalação das seguintes ferramentas:
 - PostgreSQL 13;
 - Node.js v14.17.3

## Passos para execução

Para que o projeto seja executado é necessário que:
 
 - Certifique-se de ter o [Node.js](http://nodejs.org/) e o [PostgreSQL](https://www.postgresql.org/download/) instalados.

```sh
git clone https://github.com/ErickeAccyole/desafio-dev-api-rest.git 
cd api
npm install
npm run dev
```

 - Seu aplicativo agora deve estar em execução em [127.0.0.1:3000](http://127.0.0.1:3000/).
 
 - A aplicação se encarrega de criar o proprio banco de dados e o schema chamado 'dock'
	 - Caso seja necessário deve ser mudado a senha e o usuário do banco em: `api\env\.env.development`
 - Também é inserido um registro na tabela `Pessoas` para a realização das demais rotinas.
	 
## O que foi feito

Foi criado uma API restfull que simula algumas funcionalidades de um banco.


## Requisições

- Pode ser importado no Postman o arquivo contido em: `api\DesafioDock.json`.