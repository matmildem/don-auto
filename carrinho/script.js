$(document).ready(function(){
    // recupera o carrinho do local storage
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    //atribuit a uma variavel a lista do html e do total da compra
    const listaElement = $('#lista')
    const totalElement = $('#total')

    //funcao para exibir o carrinho num for each, ou for, percorrendo o array de produtos
    function exibirCarrinho(){
        //limpa o conteudo atual da lista no cache no sistema
        listaElement.empty()

        //variavel para calcular o total
        let totalPreco = 0

        $.each(carrinho, function(index, item) {
            //cria um elemento de lista para cada item
            const listItem = $('<li>').text(`${item.descricao} - Preço: $${item.preco.toFixed(2)}`)

            //cria um botao de remover o item
            const removeButton = $('<button>').text('❌').css('margin-left', '10px').click(function(){
                removerItemDoCarrinho(index)
            })

            listItem.append(removeButton)
            listaElement.append(listItem)

            //adiciona o preço do item ao total
            totalPreco += item.preco
        })

        totalElement.text(`TOTAL: $${totalPreco.toFixed(2)}`)

    }

    function removerItemDoCarrinho(index){
        carrinho.splice(index, 1)
        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        exibirCarrinho()
    }

    exibirCarrinho()
});

function gerarPedido(){
    const listaElement = document.getElementById("lista")
    const totalElement = document.getElementById("total")

    const listaClone = listaElement.cloneNode(true)

    $(listaClone).find('button').remove()

    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML

    const conteudoHTML = `
        <html>
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <h1>Pedido confirmado</h1>
                <h3>Agradecemos sua compra conosco ❤</h3>
                <br>
                ${listaHtml}
                <br>
                <br>
                ${totalHtml}
            </body>
        </html>
    `;

    const blob = new Blob([conteudoHTML], {type: "application/msword"})
    const link = document.createElement("a")

    link.href = URL.createObjectURL(blob)
    link.download = "pedido.doc"
    link.click()

    document.getElementById('pedido').style.display = "block"

}


function successClose(){
    document.getElementById('pedido').style.display = 'none'
}