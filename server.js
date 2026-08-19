const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMTAxNiIsImp0aSI6IjY0M2FjZmYwYzZkN2E1NDNkMjBhNTczOTM3NjBjZTdkZWI4YmQwMTI2NDQ5YTBkOGEyMWVkNzQ2ODRlZWY1YWYzZmI0MzU4MTQ1ZmVjMzI0IiwiaWF0IjoxNzg2NTMzMjQ2LjM2NDA0NSwibmJmIjoxNzg2NTMzMjQ2LjM2NDA0NywiZXhwIjoxNzg5MTI1MjQ2LjMzOTAzOCwic3ViIjoiYTI3YmYxNGYtYTEyMi00MTFhLTkxN2YtMWNkZmFjMjA1ZGFjIiwic2NvcGVzIjpbInNoaXBwaW5nLWNhbGN1bGF0ZSJdfQ.TiAjGBQ4jMJ3bnYa1mwO14WZzZqTqybvimTY7BI13T_RU4nVSr_CWi-VuYQcmjCAzyrXwDdYLN9xG-b7Rv6Qz6lEFVXasfx1L-PGJiYllG2b7Nj19ZQ8JCekeX1ILMUYylesyyi9hJ4ZM9BQn4paErYldPUxDIUzrMPSLGSntGUxtLhX6oHRKezNLHF6aiGCH8kymzQpF7vC3wwtHTrHvbjdnVpfkfyzM4fRDWOd_RgsKn6Bg_-oqqBID5KkKhPJ6m-jJXZvjA5R10Upq-33KX3O9nq_8TKPQMy6EBa-I3l0lb13rToqpKHdbEEvEanqzjOoEhpTd5J2NwNZd3P4iWRzHlrdXXwEZFkk6rWUR_d26IIJJ0iY3gabLhZvlUa8H0sqdfHw_NHEKkGR_HtTlh8dqyb4G4c1IU_eAV5zXObYsbMB_PU8a3sQVBHUihFLKiskb1Goef7vGPje5OWgGSk2bTotjEs83GjN2G0mgD3pE4mbt2_Upk7Oc98gRTRT7w32DMl1l0N412nXMgY4Lr2ng3GelqILC6xjVhgXqhR0thp2WzZPV5tg6OhFKNs80cRGvIMJX98ZwvgSMuePEwpJiyIQW6m2FUvxwl60ekhyOF8RyDY8T1-HtdvOoDB0HYXa3Fz3Ghp2kfAQB7vlDNA4xmHyjalNJuY_f8FX1mM";

app.post("/frete", async (req, res) => {

    const dados = req.body;

    const resposta = await fetch(
        "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",
        {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "Teste Melhor Envio"
            },

            body: JSON.stringify({

                from: {
                    postal_code: dados.origem
                },

                to: {
                    postal_code: dados.destino
                },

                products: [
                    {
                        id: "1",
                        width: Number(dados.largura),
                        height: Number(dados.altura),
                        length: Number(dados.comprimento),
                        weight: Number(dados.peso),
                        quantity: 1
                    }
                ]
            })
        }
    );

    const resultado = await resposta.json();

    res.json(resultado);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});