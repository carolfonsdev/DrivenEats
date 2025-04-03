// Inicializando as variáveis com null, que vão armazenar a escolha do usuário
let comida = null; // Vai armazenar a comida selecionada
let bebida = null; // Vai armazenar a bebida selecionada
let sobremesa = null; // Vai armazenar a sobremesa selecionada

// Função para selecionar a comida
function selecionarComida(comidas) {
    // Se já houver uma comida selecionada, remove a borda e esconde o ícone de checklist
    if (comida !== null) {
        comida.classList.remove("borda"); // Remove a borda da comida anterior
        comida.querySelector('.check').style.display = 'none'; // Esconde o ícone de check
    }
    // Adiciona a borda e exibe o ícone de check para a comida selecionada
    comidas.classList.add("borda"); // Adiciona borda na comida escolhida
    comidas.querySelector('.check').style.display = 'flex'; // Exibe o ícone de check
    comida = comidas; // Atualiza a variável 'comida' com a nova seleção

    fecharPedido(); // Chama a função para verificar se é possível fechar o pedido
}

// Função para selecionar a bebida
function selecionarBebida(bebidas) {
    if (bebida !== null) {
        bebida.classList.remove("borda"); // Remove a borda da bebida anterior
        bebida.querySelector('.check').style.display = 'none'; // Esconde o ícone de check
    }
    bebidas.classList.add("borda"); // Adiciona borda na bebida escolhida
    bebidas.querySelector('.check').style.display = 'flex'; // Exibe o ícone de check
    bebida = bebidas; // Atualiza a variável 'bebida' com a nova seleção

    fecharPedido(); // Chama a função para verificar se é possível fechar o pedido
}

// Função para selecionar a sobremesa
function selecionarSobremesa(sobremesas) {
    if (sobremesa !== null) {
        sobremesa.classList.remove("borda"); // Remove a borda da sobremesa anterior
        sobremesa.querySelector('.check').style.display = 'none'; // Esconde o ícone de check
    }
    sobremesas.classList.add("borda"); // Adiciona borda na sobremesa escolhida
    sobremesas.querySelector('.check').style.display = 'flex'; // Exibe o ícone de check
    sobremesa = sobremesas; // Atualiza a variável 'sobremesa' com a nova seleção

    fecharPedido(); // Chama a função para verificar se é possível fechar o pedido
}

// Função para habilitar o botão "Fechar pedido" quando todos os itens forem selecionados
function fecharPedido() {
    const botao = document.querySelector('.clicar'); // Seleciona o botão de fechar pedido

    // Verifica se todos os itens foram selecionados e habilita o botão
    if (comida !== null && bebida !== null && sobremesa !== null) {
        botao.classList.add("habilitado"); // Habilita o botão
        botao.innerHTML = "Fechar pedido"; // Altera o texto do botão
        botao.onclick = seusPedidos; // Define a função que será chamada ao clicar no botão
    } else {
        botao.classList.remove("habilitado"); // Desabilita o botão se algum item não foi selecionado
    }
}

// Função chamada quando o botão "Fechar pedido" é clicado
function seusPedidos() {
    const finalizado = document.querySelector('.finalizado'); // Seleciona a seção de pedido finalizado
    const pedidos = document.querySelector('.pedidos'); // Seleciona o contêiner de pedidos

    // Obtém os nomes e preços dos itens selecionados
    const comidaNome = comida.querySelector('h1').innerHTML;
    const comidaPreco = parseFloat(comida.querySelector('.preco').innerHTML.replace("R$", "").replace(",", "."));
    
    const bebidaNome = bebida.querySelector('h1').innerHTML;
    const bebidaPreco = parseFloat(bebida.querySelector('.preco').innerHTML.replace("R$", "").replace(",", "."));
    
    const sobremesaNome = sobremesa.querySelector('h1').innerHTML;
    const sobremesaPreco = parseFloat(sobremesa.querySelector('.preco').innerHTML.replace("R$", "").replace(",", "."));

    // Calcula o total do pedido somando os preços
    const total = (comidaPreco + bebidaPreco + sobremesaPreco).toFixed(2);

    // Preenche a seção de pedidos com os detalhes do pedido
    pedidos.innerHTML = `
        <ul class="pedidos"> 
            <li>${comidaNome} - R$ ${comidaPreco.toFixed(2).replace(".", ",")}</li> 
            <li>${bebidaNome} - R$ ${bebidaPreco.toFixed(2).replace(".", ",")}</li> 
            <li>${sobremesaNome} - R$ ${sobremesaPreco.toFixed(2).replace(".", ",")}</li>
        </ul>
        <p class="total"> Total: R$ ${total.replace(".", ",")}</p>
    `;

    // Exibe a seção de finalização
    finalizado.style.display = "flex";
}

// Função para cancelar o pedido e esconder a seção finalizada
function cancelarPedido(){
    const finalizado = document.querySelector('.finalizado');
    finalizado.style.display = 'none'; // Esconde a seção de finalização
}

// Função para abrir o WhatsApp com o pedido pronto para enviar
function whatsappWeb(){
    const phoneNumber = "5521965110324"; // Número de telefone para enviar o pedido

    // Obtém os detalhes do pedido
    const pratoSelecionado = comida.querySelector('h1').innerHTML;
    const bebidaSelecionada = bebida.querySelector('h1').innerHTML;
    const sobremesaSelecionada = sobremesa.querySelector('h1').innerHTML;

    const precoPrato = parseFloat(comida.querySelector('.preco').innerHTML.replace("R$", "").replace(",", "."));
    const precoBebida = parseFloat(bebida.querySelector('.preco').innerHTML.replace("R$", "").replace(",", "."));
    const precoSobremesa = parseFloat(sobremesa.querySelector('.preco').innerHTML.replace("R$", "").replace(",", "."));

    // Calcula o valor total
    const total = precoPrato + precoBebida + precoSobremesa;

    // Cria a mensagem para enviar pelo WhatsApp
    const mensagem = `Olá, gostaria de fazer o pedido: - Prato: ${pratoSelecionado} - Bebida: ${bebidaSelecionada} - Sobremesa: ${sobremesaSelecionada} Total: R$ ${total.toFixed(2)}`; 

    // Cria o link para o WhatsApp com a mensagem
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp com a mensagem pré-preenchida
    window.open(whatsappLink, "_blank");
}
