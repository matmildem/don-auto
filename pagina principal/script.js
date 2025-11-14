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

        const btnDetalhes = document.createElement("button");
        btnDetalhes.className = "btn btn-outline-dark btn-sm btn-modificar";
        btnDetalhes.textContent = "Detalhes";
        btnDetalhes.setAttribute("data-indice", index);

        btnDetalhes.addEventListener("click", function () {
          const produtoSelecionado = produtos[index];

          // 👉 Carregar JSON de detalhes
          fetch("../dados/detalhes/mock.json")
            .then(res => res.json())
            .then(detalhes => {

              // buscar item pelo nome
              const detalheItem = detalhes.find(
                item => item.descricao === produtoSelecionado.descricao
              );

              const item = detalheItem || produtoSelecionado;

              // Preenche nome e imagem no modal
              document.getElementById("modalCarName").innerText = item.descricao;
              document.getElementById("modalCarImage").src = item.imagem;

              // 👉 AQUI ESTAVA O ERRO — agora corrigido com crases
              document.getElementById("modalCarCavalos").innerHTML =
                `<strong>Cavalos:</strong> ${item.cavalos}`;

              document.getElementById("modalCarPreco").innerHTML =
                `<strong>Preço:</strong> R$ ${item.preco.toLocaleString("pt-BR")}`;

              // Salva no localStorage
              localStorage.setItem("carroSelecionado", JSON.stringify(item));

              // Abre o modal
              const modal = new bootstrap.Modal(document.getElementById("modalDetalhes"));
              modal.show();

              document.getElementById("btnSalvarAlteracoes").onclick = function () {
                modal.hide();
                window.location.href = "../montagens/index.html";
              };
            });
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(btnDetalhes);

        card.appendChild(imagem);
        card.appendChild(cardBody);

        produtosContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar dados", error));
});
