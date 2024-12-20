var usuarioModel = require("../models/usuarioModel");

function autenticarUsuario(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticarUsuario(email, senha)
            .then(
                (resultado) => {
                    if (resultado.length == 1) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`);
                        res.status(200).json({
                            nomeUsuario: resultado[0].nomeUsuario,
                            email: resultado[0].email,
                            cpf: resultado[0].cpf,
                            senha: resultado[0].senha,
                            imagemPerfil: resultado[0].imagemPerfil,
                            fkNomeCargo: resultado[0].fkNomeCargo,
                            fkCnpj: resultado[0].fkCnpj,
                        });
                    } else {
                        res.status(403).send("Email ou senha inválido!")
                    }
                }
            ).catch(
                console.log("Erro na busca de usuário")
            );
    }
}

function autenticarEmpresa(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticarEmpresa(email, senha)
            .then(
                (resultado) => {
                    if (resultado.length == 1) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`);
                        res.status(200).json({
                            nomeEmpresa: resultado[0].nomeEmpresa,
                            nomeResponsavel: resultado[0].nomeResponsavel,
                            cnpj: resultado[0].cnpj,
                            emailResponsavel: resultado[0].emailResponsavel,
                            senha: resultado[0].senha,
                            imagemPerfil: resultado[0].imagemPerfil
                        });
                    } else {
                        res.status(403).send("Email ou senha inválido!")
                    }
                }
            ).catch(
                console.log("Erro na busca de empresa")
            );
    }
}

function pegarCargo(req, res) {
    var nomeCargo = req.body.nomeCargo;
    var cnpj = req.body.cnpj;

    if (nomeCargo == undefined) {
        res.status(400).send("Seu nomeCargo está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        usuarioModel.pegarCargo(nomeCargo, cnpj)
            .then(
                (resultado) => {
                    if (resultado.length == 1) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`);
                        res.status(200).json({
                            nomeCargo: resultado[0].nomeCargo,
                            acessos: resultado[0].acessos,
                            fkCnpj: resultado[0].fkCnpj,
                            nomeEmpresa: resultado[0].nomeEmpresa
                        });
                    } else {
                        res.status(403).send("Nome de cargo inválido!")
                    }
                }
            ).catch(
                console.log("Erro na busca de cargo")
            );
    }
}

function pegarCargoFuncionario(req, res) {
    var cpf = req.body.cpf;
    var cnpj = req.body.cnpj;

    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        usuarioModel.pegarCargoFuncionario(cpf, cnpj)
            .then(
                (resultado) => {
                    if (resultado.length == 1) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`);
                        res.status(200).json({
                            nomeCargo: resultado[0].nomeCargo,
                            acessos: resultado[0].acessos
                        });
                    } else {
                        res.status(403).send("CPF ou CNPJ inválido!")
                    }
                }
            ).catch(
                console.log("Erro na busca de cargo")
            );
    }
}

function pegarFuncionariosPorEmpresa(req, res) {
    var cnpj = req.params.cnpj;
    let listaNomes = []
    let listaEmails = []
    let listaCargos = []

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        usuarioModel.pegarFuncionariosPorEmpresa(cnpj)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    for (var i = 0; i < resultado.length; i++) {
                        listaNomes.push(resultado[i].nomeUsuario)
                        listaEmails.push(resultado[i].email)
                        listaCargos.push(resultado[i].fkNomeCargo)
                    }
                    res.status(200).json({
                        nomes: listaNomes,
                        emails: listaEmails,
                        cargos: listaCargos
                    });
                }
            ).catch(
                console.log("Erro na busca de funcionários")
            );
    }
}

function pegarCargosPorEmpresa(req, res) {
    var cnpj = req.params.cnpj;
    let listaCargos = []
    let listaAcessos = []

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        usuarioModel.pegarCargosPorEmpresa(cnpj)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    for (var i = 0; i < resultado.length; i++) {
                        listaCargos.push(resultado[i].nomeCargo)
                        listaAcessos.push(resultado[i].acessos)
                    }
                    res.status(200).json({
                        cargos: listaCargos,
                        acessos: listaAcessos
                    });
                }
            ).catch(
                console.log("Erro na busca de cargos")
            );
    }
}






















function cadastrarUsuario(req, res) {
    var imagemPerfil = "padraoUsuario.png";
    var nome = req.body.nome;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var senha = req.body.senha;
    var fkNomeCargo = req.body.fkNomeCargo;
    var fkCnpj = req.body.fkCnpj;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Sua cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkNomeCargo == undefined) {
        res.status(400).send("Sua fkNomeCargo está undefined!");
    } else if (fkCnpj == undefined) {
        res.status(400).send("Sua fkCnpj está undefined!");
    } else {
        usuarioModel.cadastrarUsuario(nome, email, cpf, senha, imagemPerfil, fkNomeCargo, fkCnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEmpresa(req, res) {
    var imagemPerfil = "padraoUsuario.png";
    var nomeEmpresa = req.body.nomeEmpresa;
    var nomeResponsavel = req.body.nomeResponsavel;
    var cnpj = req.body.cnpj;
    var emailResponsavel = req.body.emailResponsavel;
    var senha = req.body.senha;

    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nomeEmpresa está undefined!");
    } else if (nomeResponsavel == undefined) {
        res.status(400).send("Seu nomeResponsavel está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else if (emailResponsavel == undefined) {
        res.status(400).send("Sua emailResponsavel está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrarEmpresa(nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha, imagemPerfil)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarCargo(req, res) {
    var nomeCargo = req.body.nomeCargo;
    var acessos = req.body.acessos;
    var cnpj = req.body.cnpj;

    if (nomeCargo == undefined) {
        res.status(400).send("Seu nomeCargo está undefined!");
    } else if (acessos == undefined) {
        res.status(400).send("Seu acessos está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else {
        usuarioModel.cadastrarCargo(nomeCargo, acessos, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}































function atualizarUsuario(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var fkNomeCargo = req.body.fkNomeCargo;
    var emailAntigo = req.body.emailAntigo;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (fkNomeCargo == undefined) {
        res.status(400).send("Sua fkNomeCargo está undefined!");
    } else if (emailAntigo == undefined) {
        res.status(400).send("Sua emailAntigo está undefined!");
    } else {
        usuarioModel.atualizarUsuario(nome, email, fkNomeCargo, emailAntigo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarSenhaUsuario(req, res) {
    var senhaNova = req.body.senhaNova;
    var cpf = req.body.cpf;
    var senha = req.body.senhaAntiga;

    if (senhaNova == undefined) {
        res.status(400).send("Seu senhaNova está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Sua cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.atualizarSenhaUsuario(senhaNova, cpf, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarEmpresa(req, res) {
    var nomeEmpresa = req.body.nomeEmpresa;
    var nomeResponsavel = req.body.nomeResponsavel;
    var cnpj = req.body.cnpj;
    var emailResponsavel = req.body.emailResponsavel;
    var senha = req.body.senha;

    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nomeEmpresa está undefined!");
    } else if (nomeResponsavel == undefined) {
        res.status(400).send("Seu nomeResponsavel está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else if (emailResponsavel == undefined) {
        res.status(400).send("Sua emailResponsavel está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.atualizarEmpresa(nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarSenhaEmpresa(req, res) {
    var senhaNova = req.body.senhaNova;
    var cnpj = req.body.cnpj;
    var senha = req.body.senhaAntiga;

    if (senhaNova == undefined) {
        res.status(400).send("Seu senhaNova está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.atualizarSenhaEmpresa(senhaNova, cnpj, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarCargo(req, res) {
    var nomeCargo = req.body.nomeCargo;
    var novoNomeCargo = req.body.novoNomeCargo;
    var acessos = req.body.acessos;
    var cnpj = req.body.cnpj;

    let listaCpfs = []

    if (nomeCargo == undefined) {
        res.status(400).send("Seu nomeCargo está undefined!");
    } else if (novoNomeCargo == undefined) {
        res.status(400).send("Seu novoNomeCargo está undefined!");
    } else if (acessos == undefined) {
        res.status(400).send("Sua acessos está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else {
        usuarioModel.pegarUsuariosComCargo(nomeCargo, cnpj)
            .then(
                function (resultado) {
                    if (resultado.length == 0) {
                        usuarioModel.atualizarCargo(nomeCargo, novoNomeCargo, acessos, cnpj)
                            .then(
                                function (resultado) {
                                    res.status(200)
                                }
                            ).catch((e) => {
                                console.log(e);
                                console.log("\nHouve um erro ao realizar a atualização! Erro: ", e.sqlMessage);
                                res.status(500).json(e.sqlMessage);
                            }
                            );
                    } else {


                        for (let i = 0; i < resultado.length; i++) {
                            listaCpfs.push(resultado[i].cpf)
                        }

                        for (let i = 0; i < listaCpfs.length; i++) {

                            usuarioModel.atualizarCargoParaNull(listaCpfs[i])
                                .then(
                                    function (resultado) {
                                        console.log(i)
                                        if (i + 1 == listaCpfs.length) {
                                            usuarioModel.atualizarCargo(nomeCargo, novoNomeCargo, acessos, cnpj)
                                                .then(
                                                    function (resultado) {


                                                        for (let i = 0; i < listaCpfs.length; i++) {
                                                            usuarioModel.atualizarCargoFuncionario(novoNomeCargo, listaCpfs[i])
                                                                .then(
                                                                    function (resultado) {
                                                                        if (i + 1 == listaCpfs.length) {
                                                                            res.status(200)
                                                                        }
                                                                    }
                                                                ).catch((e) => {
                                                                    console.log(e);
                                                                    console.log("\nHouve um erro ao realizar a atualização! Erro: ", e.sqlMessage);
                                                                    res.status(500).json(e.sqlMessage);
                                                                }
                                                                );
                                                        }


                                                    }
                                                ).catch((e) => {
                                                    console.log(e);
                                                    console.log("\nHouve um erro ao realizar a atualização! Erro: ", e.sqlMessage);
                                                    res.status(500).json(e.sqlMessage);
                                                }
                                                );
                                        }




                                    }
                                ).catch((e) => {
                                    console.log(e);
                                    console.log("\nHouve um erro ao realizar a atualização! Erro: ", e.sqlMessage);
                                    res.status(500).json(e.sqlMessage);
                                }
                                );
                        }

                    }

                }
            ).catch((e) => {
                console.log(e);
                console.log("\nHouve um erro ao realizar a atualização! Erro: ", e.sqlMessage);
                res.status(500).json(e.sqlMessage);
            }
            );


    }
}


























function removerUsuario(req, res) {
    var email = req.body.email;
    let cpf;

    if (email == undefined) {
        res.status(400).send("Sua email está undefined!");
    } else {
        usuarioModel.pegarUsuarioPorEmail(email)
            .then(
                (resultado) => {
                    cpf = resultado[0].cpf
                    usuarioModel.removerCargoUsuario(cpf)
                        .then(
                            function (resultado) {
                                usuarioModel.removerHistoricoUsuario(cpf)
                                    .then(
                                        function (resultado) {
                                            usuarioModel.removerUsuario(cpf)
                                                .then(
                                                    function (resultado) {
                                                        res.json(resultado);
                                                    }
                                                ).catch((erro) => {
                                                    console.log(erro);
                                                    console.log("\nHouve um erro ao realizar a remoção! Erro: ", erro.sqlMessage);
                                                    res.status(500).json(erro.sqlMessage);
                                                });
                                        }
                                    ).catch((erro) => {
                                        console.log(erro);
                                        console.log("\nHouve um erro ao realizar a remoção do histórico! Erro: ", erro.sqlMessage);
                                        res.status(500).json(erro.sqlMessage);
                                    });
                            }
                        ).catch((erro) => {
                            console.log(erro);
                            console.log("\nHouve um erro ao realizar a remoção do cargo! Erro: ", erro.sqlMessage);
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a seleção para remoção! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function removerImagemUsuario(req, res) {
    var cpf = req.body.cpf;

    if (cpf == undefined) {
        res.status(400).send("Sua cpf está undefined!");
    } else {
        usuarioModel.removerImagemUsuario(cpf)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a remoção da imagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}










function inativarEmpresa(req, res) {
    var cnpj = req.body.cnpj;

    if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else {

        usuarioModel.pegarUsuariosRemEmp(cnpj)
            .then(resultado => {
                if (resultado.length != 0) {

                    for (let i = 0; i < resultado.length; i++) {
                        usuarioModel.removerHistoricosRemEmp(resultado.cpf)
                            .then(resultado10 => {

                                usuarioModel.removerUsuariosRemEmp(resultado.cpf)
                                    .then(resultado1 => {

                                        if (resultado.length == i + 1) {
                                            usuarioModel.pegarCargosRemEmp(cnpj)
                                                .then(resultado2 => {

                                                    if (resultado2.length != 0) {
                                                        for (let i = 0; i < resultado2.length; i++) {
                                                            usuarioModel.removerCargosRemEmp(cnpj)
                                                                .then(resultado4 => {

                                                                    if (resultado2.length == i + 1) {

                                                                        usuarioModel.removerEmpresaRemEmp(cnpj)
                                                                            .then(resultado6 => {
                                                                                res.status(200)
                                                                            }
                                                                            ).catch(erro => {
                                                                                console.log(erro, ' - ', erro.sqlMessage);
                                                                                res.status(500).json(erro.sqlMessage);
                                                                            });
                                                                    }

                                                                }
                                                                ).catch(erro => {
                                                                    console.log(erro, ' - ', erro.sqlMessage);
                                                                    res.status(500).json(erro.sqlMessage);
                                                                });
                                                        }
                                                    } else {

                                                        usuarioModel.removerEmpresaRemEmp(cnpj)
                                                            .then(resultado7 => {
                                                                res.status(200)
                                                            }
                                                            ).catch(erro => {
                                                                console.log(erro, ' - ', erro.sqlMessage);
                                                                res.status(500).json(erro.sqlMessage);
                                                            });

                                                    }

                                                }
                                                ).catch(erro => {
                                                    console.log(erro, ' - ', erro.sqlMessage);
                                                    res.status(500).json(erro.sqlMessage);
                                                });
                                        }
                                    }
                                    ).catch(erro => {
                                        console.log(erro, ' - ', erro.sqlMessage);
                                        res.status(500).json(erro.sqlMessage);
                                    });
                            }
                            ).catch(erro => {
                                console.log(erro, ' - ', erro.sqlMessage);
                                res.status(500).json(erro.sqlMessage);
                            });
                    }

                } else {

                    usuarioModel.pegarCargosRemEmp(cnpj)
                        .then(resultado3 => {

                            if (resultado3.length != 0) {
                                for (let i = 0; i < resultado3.length; i++) {


                                    usuarioModel.removerCargosRemEmp(cnpj)
                                        .then(resultado5 => {

                                            if (resultado3.length == i + 1) {

                                                usuarioModel.removerEmpresaRemEmp(cnpj)
                                                    .then(resultado8 => {
                                                        res.status(200)
                                                    }
                                                    ).catch(erro => {
                                                        console.log(erro, ' - ', erro.sqlMessage);
                                                        res.status(500).json(erro.sqlMessage);
                                                    });

                                            }
                                        }
                                        ).catch(erro => {
                                            console.log(erro, ' - ', erro.sqlMessage);
                                            res.status(500).json(erro.sqlMessage);
                                        });
                                }
                            } else {

                                usuarioModel.removerEmpresaRemEmp(cnpj)
                                    .then(resultado9 => {
                                        res.status(200)
                                    }
                                    ).catch(erro => {
                                        console.log(erro, ' - ', erro.sqlMessage);
                                        res.status(500).json(erro.sqlMessage);
                                    });

                            }

                        }
                        ).catch(erro => {
                            console.log(erro, ' - ', erro.sqlMessage);
                            res.status(500).json(erro.sqlMessage);
                        });

                }
            }
            ).catch(erro => {
                console.log(erro, ' - ', erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}













function removerImagemEmpresa(req, res) {
    var cnpj = req.body.cnpj;

    if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else {
        usuarioModel.removerImagemEmpresa(cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a remoção da imagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}





function removerCargo(req, res) {
    var cnpj = req.body.cnpj;
    var nomeCargo = req.body.nomeCargo;
    let listaNomes = []

    if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else if (nomeCargo == undefined) {
        res.status(400).send("Sua nomeCargo está undefined!");
    } else {
        usuarioModel.pegarUsuariosComCargo(nomeCargo, cnpj)
            .then(
                function (resultado) {
                    console.log('Resultado')
                    console.log(resultado)
                    if (resultado.length == 0) {
                        usuarioModel.removerCargo(nomeCargo, cnpj)
                            .then(
                                function (resultado) {
                                    res.status(200).json('deletado')
                                }
                            ).catch((e) => {
                                console.log(e);
                                console.log("\nHouve um erro ao realizar a remoção! Erro: ", e.sqlMessage);
                                res.status(500).json(e.sqlMessage);
                            }
                            );
                    } else {
                        for (let i = 0; i < resultado.length; i++) {
                            listaNomes.push(resultado[i].nomeUsuario)
                        }

                        res.status(200).json({
                            nomes: listaNomes
                        });
                    }

                }
            ).catch((e) => {
                console.log(e);
                console.log("\nHouve um erro ao realizar a remoção! Erro: ", e.sqlMessage);
                res.status(500).json(e.sqlMessage);
            }
            );
    }
}







function salvarFotoUsuario(req, res) {
    var imagem = req.file.filename;
    var cpf = req.params.cpf;

    if (imagem == undefined) {
        res.status(400).send("Seu imagem está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else {
        usuarioModel.salvarFotoUsuario(imagem, cpf)
            .then(resultado => {
                res.status(201).send("Imagem alterada");
            }).catch(err => {
                res.status(500).send(err);
            });
    }
}

function salvarFotoEmpresa(req, res) {
    var imagem = req.file.filename;
    var cnpj = req.params.cnpj;

    if (imagem == undefined) {
        res.status(400).send("Seu imagem está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        usuarioModel.salvarFotoEmpresa(imagem, cnpj)
            .then(resultado => {
                res.status(201).send("Imagem alterada");
            }).catch(err => {
                res.status(500).send(err);
            });
    }
}


module.exports = {
    autenticarUsuario,
    autenticarEmpresa,
    pegarCargo,
    pegarCargoFuncionario,
    pegarFuncionariosPorEmpresa,
    pegarCargosPorEmpresa,

    cadastrarUsuario,
    cadastrarEmpresa,
    cadastrarCargo,

    atualizarUsuario,
    atualizarSenhaUsuario,
    atualizarEmpresa,
    atualizarSenhaEmpresa,
    atualizarCargo,

    removerUsuario,
    removerImagemUsuario,
    inativarEmpresa,
    removerImagemEmpresa,
    removerCargo,

    salvarFotoUsuario,
    salvarFotoEmpresa,
}