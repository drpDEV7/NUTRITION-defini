function calcularIMC() {
    const peso = parseFloat(document.getElementById('imc-peso').value);
    const altura = parseFloat(document.getElementById('imc-altura').value);
    const resultadoElement = document.getElementById('imc-resultado');

    if (peso && altura && altura > 0) {
        const imc = peso / (altura * altura);
        let classificacao = '';
        if (imc < 18.5) classificacao = 'Abaixo do peso';
        else if (imc < 24.9) classificacao = 'Peso normal';
        else if (imc < 29.9) classificacao = 'Sobrepeso';
        else classificacao = 'Obesidade';
        resultadoElement.innerText = `IMC: ${imc.toFixed(2)} - ${classificacao}`;
    } else {
        resultadoElement.innerText = 'Preencha peso e altura válidos!';
    }
}

function calcularTMB() {
    const sexo = document.getElementById('tmb-sexo').value;
    const peso = parseFloat(document.getElementById('tmb-peso').value);
    const alturaCm = parseFloat(document.getElementById('tmb-altura').value);
    const idade = parseInt(document.getElementById('tmb-idade').value);
    const resultadoElement = document.getElementById('tmb-resultado');

    if (peso && alturaCm && idade && peso > 0 && alturaCm > 0 && idade > 0) {
        let tmb;
        const alturaM = alturaCm / 100;

        if (sexo === 'masculino') {
            tmb = 88.362 + (13.397 * peso) + (4.799 * alturaCm) - (5.677 * idade);
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * alturaCm) - (4.330 * idade);
        }
        resultadoElement.innerText = `TMB (aprox.): ${tmb.toFixed(0)} kcal/dia`;
    } else {
        resultadoElement.innerText = 'Preencha todos os campos com valores válidos!';
    }
}


function calcularPesoIdeal() {
    const sexo = document.getElementById('pi-sexo').value;
    const alturaCm = parseFloat(document.getElementById('pi-altura').value);
    const resultadoElement = document.getElementById('pi-resultado');

    if (alturaCm && alturaCm > 0) {
         let pesoIdeal;
         const alturaM = alturaCm / 100;

         if (sexo === 'masculino') {
             pesoIdeal = 50 + 0.91 * (alturaCm - 152.4); // Robinson formula approximation
         } else {
             pesoIdeal = 45.5 + 0.91 * (alturaCm - 152.4); // Robinson formula approximation
         }

         if (pesoIdeal > 0) {
             resultadoElement.innerText = `Peso Ideal (aprox.): ${pesoIdeal.toFixed(1)} kg`;
         } else {
              resultadoElement.innerText = 'Altura muito baixa para esta fórmula.';
         }

    } else {
        resultadoElement.innerText = 'Preencha a altura válida (cm)!';
    }
}


function toggleCamposCrianca() {
    const tipoCliente = document.getElementById('tipo-cliente').value;
    const camposCrianca = document.getElementById('campos-crianca');
    const childInputs = camposCrianca.querySelectorAll('input, select');

    if (tipoCliente === 'crianca') {
        camposCrianca.style.display = 'grid';
        childInputs.forEach(input => { input.required = true; });
    } else {
        camposCrianca.style.display = 'none';
        childInputs.forEach(input => { input.required = false; });
    }
}

function cadastrarCliente() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const idade = document.getElementById('idade').value;
    const tipoCliente = document.getElementById('tipo-cliente').value;
    const tabaco = document.getElementById('tabaco').value;
    const alcool = document.getElementById('alcool').value;
    const drogas = document.getElementById('drogas').value;
    const resultadoElement = document.getElementById('cadastro-resultado');

    let allFieldsValid = true;

    if (!nome || !email || !peso || !altura || !idade || !tipoCliente || !tabaco || !alcool || !drogas) {
        allFieldsValid = false;
    }

    let mensagem = `Cliente cadastrado:\nNome: ${nome}\nE-mail: ${email}\nPeso: ${peso} kg\nAltura: ${altura} cm\nIdade: ${idade} anos\nTipo: ${tipoCliente}\nTabaco: ${tabaco}\nÁlcool: ${alcool}\nDrogas: ${drogas}`;

    if (tipoCliente === 'crianca') {
        const dataNascimento = document.getElementById('data-nascimento').value;
        const alturaPai = document.getElementById('altura-pai').value;
        const alturaMae = document.getElementById('altura-mae').value;
        const historicoPeso = document.getElementById('historico-peso').value;
        const historicoAltura = document.getElementById('historico-altura').value;
        const faseEscolar = document.getElementById('fase-escolar').value;

        if (!dataNascimento || !alturaPai || !alturaMae || !historicoPeso || !historicoAltura || !faseEscolar) {
             allFieldsValid = false;
        } else {
            mensagem += `\nData de Nascimento: ${dataNascimento}\nAltura do Pai: ${alturaPai} cm\nAltura da Mãe: ${alturaMae} cm\nHistórico de Peso: ${historicoPeso}\nHistórico de Altura: ${historicoAltura}\nFase Escolar: ${faseEscolar}`;
        }
    }

    if (allFieldsValid) {
        resultadoElement.innerText = 'Cadastro realizado com sucesso!';
        resultadoElement.style.color = 'green';
        console.log("Dados do Cadastro:");
        console.log(mensagem);
        document.getElementById('cadastro-form').reset(); // Optionally reset form
        toggleCamposCrianca(); // Reset conditional fields visibility
    } else {
         resultadoElement.innerText = 'Preencha todos os campos obrigatórios corretamente!';
         resultadoElement.style.color = 'red';
    }
}


function closeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
    }
}

// Initialize conditional fields on page load in case of browser back/forward cache
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('tipo-cliente')) {
       toggleCamposCrianca();
    }
    // Add event listeners for menu toggle to change icon (optional but good UX)
    const menuToggle = document.getElementById('menu-toggle');
    const menuBtn = document.querySelector('.menu-btn');
    if(menuToggle && menuBtn){
        const openIcon = menuBtn.querySelector('.menu-open');
        const closeIcon = menuBtn.querySelector('.menu-close');
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                openIcon.style.display = 'none';
                closeIcon.style.display = 'inline';
            } else {
                openIcon.style.display = 'inline';
                closeIcon.style.display = 'none';
            }
        });
    }
});