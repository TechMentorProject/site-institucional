var database = require("../database/config")

function pegarDensidadePorCidade(cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDensidadePorCidade(): ", cidade, estado)
    var instrucaoSql = `
        SELECT densidadeDemografica FROM baseCensoIBGE 
            JOIN cidade ON cidade.nomeCidade = baseCensoIBGE.fkCidade
            WHERE cidade.nomeCidade = '${cidade}' AND cidade.fkEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarDensidadePorCidade
};