// validar()
exibirCargos()
let nomeAntigo;

function abrirEditarCargo(cargo) {
    nomeAntigo = cargo;
    document.getElementById('edit-modal-container').style.display = 'flex'
}

async function editarCargo() {
    let novosAcessos = []
    if (await document.getElementById('estado-es-edit').checked) novosAcessos.push('ES');
    if (await document.getElementById('estado-mg-edit').checked) novosAcessos.push('MG');
    if (await document.getElementById('estado-pr-edit').checked) novosAcessos.push('PR');
    if (await document.getElementById('estado-rj-edit').checked) novosAcessos.push('RJ');
    if (await document.getElementById('estado-rs-edit').checked) novosAcessos.push('RS');
    if (await document.getElementById('estado-sc-edit').checked) novosAcessos.push('SC');
    if (await document.getElementById('estado-sp-edit').checked) novosAcessos.push('SP');

    if (novosAcessos.length == 0) {
        popUpNotOk('quantAcesso')

    } else {
        if (await document.getElementById('operadora-claro-edit').checked) novosAcessos.push('CLARO');
        if (await document.getElementById('operadora-oi-edit').checked) novosAcessos.push('OI');
        if (await document.getElementById('operadora-tim-edit').checked) novosAcessos.push('TIM');
        if (await document.getElementById('operadora-vivo-edit').checked) novosAcessos.push('VIVO');
        let nomeNovo = await document.getElementById('cargo-name-edit').value
        if (nomeNovo.length <= 2) {
            popUpNotOk('nomePequeno')

            document.getElementById('edit-modal-container').style.display = 'none'

        } else if (novosAcessos.length <= 0) {
            alert('selecione um acesso pelo menos')

            document.getElementById('edit-modal-container').style.display = 'none'

        } else {
            atualizarCargo(novosAcessos, nomeNovo)
            popUpOk('atualizacao')

            setInterval(() => {
                window.location.reload()
            }, 1500);
            document.getElementById('edit-modal-container').style.display = 'none'
            criarNotificaoEmpresa(`O cargo ${nomeNovo} foi atualizado com sucesso!`, sessionStorage.CNPJ)
        }
    }
}

async function atualizarCargo(acessos, nomeNovo) {
    return fetch(`/usuarios/atualizarCargo`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeCargo: nomeAntigo,
            novoNomeCargo: nomeNovo,
            acessos: acessos,
            cnpj: sessionStorage.CNPJ
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            popUpOk('atualizacao')
            console.log(res)
            return
        })
        .catch(error => {
            console.log(`#ERRO ao atualizar cargos: ${error}`);
            return null;
        });
}

async function exibirCargos() {
    let dados = await buscarCargos()
    console.log(dados)
    let cargos = dados[0]
    let acessos = dados[1]
    let estadosAcesso = []

    for (var i = 0; i < cargos.length; i++) {
        estadosAcesso.push([])
        if (acessos[i].includes('ES')) estadosAcesso[i].push('ES');
        if (acessos[i].includes('MS')) estadosAcesso[i].push('MS');
        if (acessos[i].includes('MG')) estadosAcesso[i].push('MG');
        if (acessos[i].includes('RJ')) estadosAcesso[i].push('RJ');
        if (acessos[i].includes('RS')) estadosAcesso[i].push('RS');
        if (acessos[i].includes('PR')) estadosAcesso[i].push('PR');
        if (acessos[i].includes('SC')) estadosAcesso[i].push('SC');
        if (acessos[i].includes('SP')) estadosAcesso[i].push('SP');
        if (acessos[i].includes('CLARO')) estadosAcesso[i].push('Claro');
        if (acessos[i].includes('OI')) estadosAcesso[i].push('Oi');
        if (acessos[i].includes('TIM')) estadosAcesso[i].push('Tim');
        if (acessos[i].includes('VIVO')) estadosAcesso[i].push('Vivo');

        document.getElementById('cargos').innerHTML += `
        <div class="cargo">
        <div class="ponto"></div>
        <div class="texto">
            <h3>${cargos[i]}</h3>
            <h4>Permissões: ${estadosAcesso[i]}</h4>
        </div>
        <div class="edicao-exclusao">
            <div onclick="abrirEditarCargo('${cargos[i]}')" class="edit-button"></div>
            <div onclick="abrirExcluir('${cargos[i]}')" class="remove-button"></div>
        </div>
        </div>`;
    }
}

async function buscarCargos() {
    return fetch(`/usuarios/pegarCargosPorEmpresa/${sessionStorage.CNPJ}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.cargos, res.acessos]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cargos: ${error}`);
            return null;
        });
}

async function criarCargo() {
    let novosAcessos = []
    if (await document.getElementById('estado-es').checked) novosAcessos.push('ES');
    if (await document.getElementById('estado-mg').checked) novosAcessos.push('MG');
    if (await document.getElementById('estado-pr').checked) novosAcessos.push('PR');
    if (await document.getElementById('estado-rj').checked) novosAcessos.push('RJ');
    if (await document.getElementById('estado-rs').checked) novosAcessos.push('RS');
    if (await document.getElementById('estado-sc').checked) novosAcessos.push('SC');
    if (await document.getElementById('estado-sp').checked) novosAcessos.push('SP');

    if (novosAcessos.length == 0) {
        popUpNotOk('quantAcesso')

    } else {
        if (await document.getElementById('operadora-claro').checked) novosAcessos.push('CLARO');
        if (await document.getElementById('operadora-oi').checked) novosAcessos.push('OI');
        if (await document.getElementById('operadora-tim').checked) novosAcessos.push('TIM');
        if (await document.getElementById('operadora-vivo').checked) novosAcessos.push('VIVO');
        let nomeNovo = await document.getElementById('adicionar-nome').value

        if (nomeNovo.length <= 2) {
            popUpNotOk('nomePequeno')

        } else if (novosAcessos.length <= 0) {
            alert('selecione um acesso pelo menos')

        } else {
            cadastrarCargo(novosAcessos, nomeNovo)
            criarNotificaoEmpresa(`O cargo ${nomeNovo} com os acessos: ${novosAcessos} foi criado com sucesso!`, sessionStorage.CNPJ)
        }
    }
}

async function cadastrarCargo(acessos, nome) {
    return fetch(`/usuarios/cadastrarCargo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeCargo: nome,
            acessos: acessos,
            cnpj: sessionStorage.CNPJ
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            popUpOk('cadastro')
            console.log(res)
            setInterval(() => {
                window.location.reload() = '';
            }, 1500);
            return
        })
        .catch(error => {
            console.log(`#ERRO ao cadastrar cargo: ${error}`);
            window.location.reload()
            return null;
        });
}





function fechar() {
    document.getElementById('remove-modal-container').style.display = 'none'
    document.getElementById('edit-modal-container').style.display = 'none'
}






function abrirExcluir(nome) {
    nomeAntigo = nome;
    document.getElementById('remove-modal-container').style.display = 'flex'
}

function formatarData(dataInicial, pattern = "yyyy-MM-dd") {
    const yyyy = dataInicial.getFullYear();
    const MM = String(dataInicial.getMonth() + 1).padStart(2, '0');
    const dd = String(dataInicial.getDate()).padStart(2, '0');

    return pattern
        .replace("yyyy", yyyy)
        .replace("MM", MM)
        .replace("dd", dd);
}

function pegarDataAtual() {
    return formatarData(new Date())
}

async function confirmarExcluir() {
    let dados = await removerCargo()
    let usuariosNaoDeletados = []

    if (dados == null) {
        alert('erro ao deletar')

        document.getElementById('remove-modal-container').style.display = 'none'
    } else if (dados == 'deletado') {
        popUpOk('remocao')

        setInterval(() => {
            window.location.reload()
        }, 1500);
        document.getElementById('remove-modal-container').style.display = 'none'
        criarNotificaoEmpresa(`O cargo ${nomeAntigo} foi removido com sucesso!`, sessionStorage.CNPJ)
    } else {
        for (let i = 0; i < dados.nomes.length; i++) {
            usuariosNaoDeletados.push(dados.nomes[i])
        }

        popUpNotOk('comCargo', usuariosNaoDeletados)
        setInterval(() => {
            window.location.reload()
        }, 1500);

        document.getElementById('remove-modal-container').style.display = 'none'
    }
}

async function removerCargo() {
    console.log('AQUI')
    return fetch(`/usuarios/removerCargo`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeCargo: nomeAntigo,
            cnpj: sessionStorage.CNPJ
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return res
        })
        .catch(error => {
            console.log(`#ERRO ao excluir cargo: ${error}`);
            return null;
        });
}


function popUpOk(tipo) {
    let mensagem = ''

    if (tipo == 'cadastro') {
        mensagem = 'Cargo criado com sucesso!'

    } else if (tipo == 'remocao') {
        mensagem = 'Cargo removido!'

    } else if (tipo == 'atualizacao') {
        mensagem = 'Cargo atualizado!'

    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
            toast.style.marginTop = "50.5px";
        }
    });
    Toast.fire({
        iconColor: "#43BAFF",
        icon: "success",
        title: mensagem
    });
}

function popUpNotOk(tipo, usuariosNaoDeletados) {
    if (tipo == 'quantAcesso') {
        mensagem = 'Selecione ao menos um Estado.'

    } else if (tipo == 'nomePequeno') {
        mensagem = `Nome de cargo muito pequeno.`
    
    } else if (tipo == 'comCargo') {
        mensagem = `Há usuários utilizando este cargo:
        ${usuariosNaoDeletados}`
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
            toast.style.marginTop = "50.5px";
        }
    });
    Toast.fire({
        icon: "error",
        title: mensagem
    });
}