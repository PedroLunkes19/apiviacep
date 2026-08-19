async function buscarCEP(cep, cidade, estado) {
    cep = cep.replace(/\D/g, "");

    if (cep.length !== 8) {
        alert("Digite um CEP válido.");
        return;
    }

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado.");
            cidade.value = "";
            estado.value = "";
            return;
        }

        cidade.value = dados.localidade || "";
        estado.value = dados.uf || "";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao consultar o CEP.");
    }
}


document
    .getElementById("buscarRemetente")
    .addEventListener("click", () => {

        const cep = document.getElementById("cepRemetente");
        const cidade = document.getElementById("cidadeRemetente");
        const estado = document.getElementById("estadoRemetente");

        buscarCEP(
            cep.value,
            cidade,
            estado
        );
    });


document
    .getElementById("buscarDestinatario")
    .addEventListener("click", () => {

        const cep = document.getElementById("cepDestinatario");
        const cidade = document.getElementById("cidadeDestinatario");
        const estado = document.getElementById("estadoDestinatario");

        buscarCEP(
            cep.value,
            cidade,
            estado
        );
    });


document
    .getElementById("calcular")
    .addEventListener("click", async () => {

        const origem = document
            .getElementById("cepRemetente")
            .value
            .replace(/\D/g, "");

        const destino = document
            .getElementById("cepDestinatario")
            .value
            .replace(/\D/g, "");

        const peso = document
            .getElementById("peso")
            .value;

        const largura = document
            .getElementById("largura")
            .value;

        const altura = document
            .getElementById("altura")
            .value;

        const comprimento = document
            .getElementById("comprimento")
            .value;

        const resultado = document.getElementById("resultado");


        if (origem.length !== 8) {
            alert("Digite um CEP de remetente válido.");
            return;
        }

        if (destino.length !== 8) {
            alert("Digite um CEP de destinatário válido.");
            return;
        }

        if (!peso || !largura || !altura || !comprimento) {
            alert("Preencha todos os dados do produto.");
            return;
        }


        resultado.innerHTML = `
            <p class="mensagem">
                Calculando frete...
            </p>
        `;


        try {

            const resposta = await fetch(
                "http://localhost:3000/frete",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        origem: origem,
                        destino: destino,
                        peso: Number(peso),
                        largura: Number(largura),
                        altura: Number(altura),
                        comprimento: Number(comprimento)
                    })
                }
            );


            const dados = await resposta.json();


            if (!resposta.ok) {

                console.error(dados);

                throw new Error(
                    dados.erro ||
                    "Erro ao calcular o frete."
                );
            }


            if (!Array.isArray(dados)) {

                console.error("Resposta recebida:", dados);

                throw new Error(
                    "O Melhor Envio não retornou uma lista de fretes."
                );
            }


            if (dados.length === 0) {

                resultado.innerHTML = `
                    <p class="mensagem">
                        Nenhuma opção de frete encontrada.
                    </p>
                `;

                return;
            }


            resultado.innerHTML = "";


            dados.forEach((frete) => {

                const div = document.createElement("div");

                div.classList.add("frete");


                const nome = frete.name || "Transportadora";

                const servico =
                    frete.service ||
                    frete.service_name ||
                    "Serviço";

                const prazo =
                    frete.delivery_time ??
                    frete.custom_delivery_time ??
                    "-";

                const preco =
                    frete.custom_price ??
                    frete.price ??
                    0;


                div.innerHTML = `
                    <h4>${nome}</h4>

                    <p>
                        Serviço: ${servico}
                    </p>

                    <p>
                        Prazo: ${prazo} dias
                    </p>

                    <p class="preco">
                        R$ ${Number(preco)
                            .toFixed(2)
                            .replace(".", ",")}
                    </p>
                `;


                resultado.appendChild(div);

            });


        } catch (erro) {

            console.error("Erro:", erro);


            resultado.innerHTML = `
                <p style="color: #ff5252;">
                    ${erro.message}
                </p>
            `;
        }

    });

