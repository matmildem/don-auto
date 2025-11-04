function enviar(){

    document.getElementById('nome').style.border = '1px solid black'
    document.getElementById('assunto').style.border = '1px solid black'

    const nome = document.getElementById('nome').value
    const assunto = document.getElementById('assunto').value

    if(!nome || !assunto){
        document.getElementById('nome').style.border = '2px solid red'
        document.getElementById('assunto').style.border = '2px solid red'
        return
    }

    const mensagem = `Gostaria de entrar em contato? \n\nNome: ${nome} \nAssunto: ${assunto}`
    const msg = encodeURIComponent(mensagem)
    window.location.href = `https://wa.me/5541997032216?text=${msg}`

}