let produtos;

window.onload = function () {
  var storedUser = localStorage.getItem("usuario");
  var user = JSON.parse(storedUser);

  var dataEntrada = new Date(user.dataEntrada);
  var dataFormatada = dataEntrada.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("perfil").innerText = dataFormatada;
  document.getElementById("user").innerText = user.name;
  document.getElementById("idPerfil").innerText = user.id;
};

document.addEventListener("DOMContentLoaded", function () {
  fetch("../dados/mock.json")
    .then((response) => response.json())
    .then((data) => {
      produtos = data;

      const produtosContainer = document.getElementById("produtos-container");

      produtos.forEach((produto, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";
        card.style.marginRight = "10px";
        card.style.marginBottom = "10px";

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.className = "card-img-top";
        imagem.style.height = "10rem";
        imagem.style.width = "fit-content";
        imagem.style.alignSelf = "center";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = produto.descricao;

        const cardText = document.createElement("p");
        cardText.className = "card-text";

        const btnDetalhes = document.createElement("button");
        btnDetalhes.className = "btn btn-outline-dark btn-sm btn-modificar";
        btnDetalhes.textContent = "Detalhes";
        btnDetalhes.setAttribute("data-indice", index);

        // 🟢 Ao clicar no botão "Detalhes"
        btnDetalhes.addEventListener("click", function () {
          const produtoSelecionado = produtos[index];

          // Preenche o modal com as informações
          document.getElementById("modalCarName").innerText = produtoSelecionado.descricao;
          document.getElementById("modalCarImage").src = produtoSelecionado.imagem;

          // Salva o produto selecionado no localStorage (para a próxima página)
          localStorage.setItem("carroSelecionado", JSON.stringify(produtoSelecionado));

          // Abre o modal
          const modal = new bootstrap.Modal(document.getElementById("modalDetalhes"));
          modal.show();

          // Quando clicar no botão "Modificar" dentro do modal
          document.getElementById("btnSalvarAlteracoes").onclick = function () {
            modal.hide();
            // Redireciona para a página de montagem
            window.location.href = "../montagens/index.html";
          };
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(btnDetalhes);

        card.appendChild(imagem);
        card.appendChild(cardBody);

        produtosContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar dados", error));
});