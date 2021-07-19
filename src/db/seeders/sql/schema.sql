-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 9.6
-- Project Site: pgmodeler.com.br
-- Model Author: Ericke Accyole

CREATE SCHEMA ${schema~};
ALTER SCHEMA ${schema~} OWNER TO postgres;

CREATE SEQUENCE pessoas_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

CREATE SEQUENCE contas_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

CREATE SEQUENCE transacoes_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

CREATE TABLE pessoas(
	idPessoa smallint NOT NULL DEFAULT nextval('dock.pessoas_id_seq'::regclass),
	nome varchar(60) NOT NULL,
	cpf varchar(11) NOT NULL,
	dataNascimento date NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT pessoas_id_pk PRIMARY KEY (idPessoa)
);

CREATE TABLE contas(
	idConta smallint NOT NULL DEFAULT nextval('dock.contas_id_seq'::regclass),
	idPessoa smallint NOT NULL,
	saldo money,
	limiteSaqueDiario money,
	flagAtivo boolean NOT NULL DEFAULT true,
	tipoConta smallint NOT NULL,
	dataCriacao date DEFAULT CURRENT_DATE,
	CONSTRAINT contas_id_pk PRIMARY KEY (idConta)
);

CREATE TABLE transacoes(
	idTransacao smallint NOT NULL DEFAULT nextval('dock.transacoes_id_seq'::regclass),
	idConta smallint NOT NULL,
	valor money,
	dataTransacao date DEFAULT CURRENT_DATE,
	CONSTRAINT transacoes_id_pk PRIMARY KEY (idTransacao)
);


ALTER TABLE transacoes ADD CONSTRAINT transacoes_id_conta_fk FOREIGN KEY (idConta)
REFERENCES contas (idConta) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE contas ADD CONSTRAINT contas_id_pessoa_fk FOREIGN KEY (idPessoa)
REFERENCES pessoas (idPessoa) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
