document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".form-group");
    const descricaoInput = document.getElementById("description");
    const codigoHtml = document.getElementById("html-code");
    const codigoCss = document.getElementById("css-code");
    const secaoPreview = document.getElementById("preview-section");

    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault();


        const descricao = descricaoInput.value.trim();

        if (!descricao) {
            return;
        }

        mostrarCarregamento(true);

        try {
            const resposta = await fetch("https://yizek.app.n8n.cloud/webhook/fundo-magico", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ descricao })
            });

            const dados = await resposta.json();

            codigoHtml.textContent = dados.html || "";
            codigoCss.textContent = dados.css || "";

            secaoPreview.style.display = "block";
            secaoPreview.innerHTML = dados.html || "";


            let tagEstilo = document.getElementById("estilo-dinamico");

            if (tagEstilo) {
                tagEstilo.remove();
            }

            if (dados.css) {
                tagEstilo = document.createElement("style");
                tagEstilo.id = "estilo-dinamico";
                tagEstilo.textContent = dados.css;
                document.head.appendChild(tagEstilo);
            }



        } catch (error) {
            console.error("Erro ao gerar o fundo mágico:", error);
            codigoHtml.textContent = "Não consegui gerar o HTML, tente novamente.";
            codigoCss.textContent = "Não consegui gerar o CSS, tente novamente.";
            secaoPreview.innerHTML = "";

        } finally {
            mostrarCarregamento(false);
        }

    });
});
function mostrarCarregamento() {
    const botaoEnviar = document.getElementById("generate-btn");
    if (true) {
        botaoEnviar.textContent = "Gerando Fundo Mágico...";
    } else {
        botaoEnviar.textContent = "Gerar Fundo Mágico";
    }
}