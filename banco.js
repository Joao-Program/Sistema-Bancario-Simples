let banco = [
    {nome: "João", saldo: 1000, historico: []},
    {nome: "Maria", saldo: 500, historico: []},
    {nome: "Ana", saldo: 2000, historico: []},
    {nome: "Raissa", saldo: 100, historico: []}
];

function criarCliente(nome, saldoInicial){
    let novoCliente = {nome: nome, saldo: saldoInicial, historico: []};
    banco.push(novoCliente);
    console.log(`${nome} foi adicionado ao banco!`);
}

function buscarCliente(nome){
    return banco.find(cliente => cliente.nome === nome);
}

function listarClientes(){
    banco.forEach(cliente => {
    console.log(`
Nome: ${cliente.nome}
Saldo: ${cliente.saldo}
Transações: ${cliente.historico.length}
----------------------------------------
         `);
    });
}

function registrarTransacao(cliente, tipo, valor){
    cliente.historico.push({
        tipo: tipo,
        valor: valor,
        data: new Date().toLocaleString()
    });
}

function depositar(nomeCliente, valor){
    let cliente = buscarCliente(nomeCliente);

    if(!cliente){ 
        console.log("Cliente não encontrado!")
        return;
    }

    cliente.saldo += valor;
    registrarTransacao(cliente, "Depósito", valor);

    console.log(`R$${valor} foi adicionado à sua conta!`);
    console.log(`Saldo atual: ${cliente.saldo}`);
}

function sacar(nomeCliente, valor){
    let cliente = buscarCliente(nomeCliente);

    if(!cliente){ 
        console.log("Cliente não encontrado!")
        return;
    }

    if(cliente.saldo >= valor){
        cliente.saldo -= valor;
        registrarTransacao(cliente, "Saque", valor);

        console.log(`R$${valor} foi sacado da sua conta!`)
        console.log(`Saldo atual: ${cliente.saldo}`);  
    }else{
        console.log(`Saldo insuficiente para saque!`)
    };
}

function consultarSaldo(nomeCliente){
    let cliente = buscarCliente(nomeCliente);

    if(!cliente){
        console.log("Cliente não encontrado!");
        return;
    }

    console.log(`O saldo do cliente ${cliente.nome} é: R$${cliente.saldo}`);
}

function mostrarHistorico(nomeCliente){
    let cliente = buscarCliente(nomeCliente);
    if(!cliente){
        console.log("Cliente não encontrado!");
        return;
    }

    console.log(`Histórico de ${cliente.nome}:`);
    cliente.historico.forEach(transacao => {
        console.log(`${transacao.tipo} de R$${transacao.valor} — ${transacao.data}`);
    });
}

function transferir(clienteUm, clienteDois, valor){
    let clienteEnvia = buscarCliente(clienteUm);
    let clienteRecebe = buscarCliente(clienteDois);

    if(!clienteEnvia){
        console.log(`O cliente: ${clienteEnvia.nome} não existe`);
        return;
    }else if(!clienteRecebe){
        console.log(`O cliente: ${clienteRecebe.nome} não existe`)
        return;
    }

    clienteEnvia.saldo =- valor;
    clienteRecebe.saldo =+ valor;
    console.log(`
    ${clienteEnvia.nome} enviou R$${valor} para ${clienteRecebe}!
    `)
}

criarCliente("Rodrigo", 5000);
depositar("João", 300);
depositar("Maria", 200);
sacar("Ana", 500);

mostrarHistorico("João");
mostrarHistorico("Ana");
listarClientes();
