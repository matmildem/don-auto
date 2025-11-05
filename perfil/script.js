function enviar(){
    document.getElementById('Nome').style.border = "1px solid black"
    document.getElementById('Assunto').style.border = "1px solid black"

    const nome = document.getElementById('Nome').value 
    const assunto = document.getElementById('Assunto').value
    
    if(!nome || !assunto){
        document.getElementById('Nome').style.border = "2px solid red"
        document.getElementById('Assunto').style.border = "2px solid red"
        return
    }

    const mensagem = `Gostaria de entrar em contato!!! \n\nNome: ${nome} \nAssunto: ${assunto}`
    const msg = encodeURIComponent(mensagem)
    window.location.href = `https://wa.me/5541997032216?text=${msg}`
}