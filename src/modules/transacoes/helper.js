/**
 * @param {Array} rows - Linhas da consulta SQL
 * @return {Array} Retorna array de Ordens de produção detalhadas para o dashboard
 */
export const agrupaExtratoPorData = async (rows) => {
  const listaExtrato = [];
  let extrato = {
    dataTransacao: null,
    transacoes: [],
  };

  let dataAtual = null;
  let dataAnterior = null;
  let operacao = '';
  for (const row of rows) {
    dataAtual = row.dataTransacao;
    operacao = row.valor.indexOf('-')  == 0 ? 'Saque' : 'Depósito';
    if (dataAnterior == null) {
      extrato.dataTransacao = row.dataTransacao;
      extrato.transacoes.push({
        operacao,
        valor: row.valor
      });

      dataAnterior = dataAtual;
    } else if (dataAnterior == dataAtual) {
      extrato.transacoes.push({
        operacao,
        valor: row.valor
      });

      dataAnterior = dataAtual;
    } else {
      listaExtrato.push(extrato);
      extrato = {
        dataTransacao: row.dataTransacao,
        transacoes: [{
          operacao,
          valor: row.valor
        }]
      };
      dataAnterior = dataAtual;
      dataAtual;
    }
  }

  listaExtrato.push(extrato);

  return listaExtrato;
};
