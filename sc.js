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
    const altura = parseFloat(document.getElementById('tmb-altura').value);
    const idade = parseInt(document.getElementById('tmb-idade').value);
    const resultadoElement = document.getElementById('tmb-resultado');

    if (peso && altura && idade && peso > 0 && altura > 0 && idade > 0) {
        let tmb;

        if (sexo === 'masculino') {
            tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
        }
        resultadoElement.innerText = `TMB: ${tmb.toFixed(0)} kcal/dia`;
    } else {
        resultadoElement.innerText = 'Preencha todos os campos com valores válidos!';
    }
}

function calcularPesoIdeal() {

    const sexo = document.getElementById('pi-sexo').value;
    const alturaCm = parseFloat(document.getElementById('pi-altura').value);
    const resultadoElement = document.getElementById('pi-resultado');

    if (alturaCm && alturaCm > 152.4) {
        const alturaInches = alturaCm / 2.54;
        const heightAbove5Feet = alturaInches - 60;
        let pesoIdeal;

        if (sexo === 'masculino') {
            pesoIdeal = 50 + (2.3 * heightAbove5Feet);
        } else {
            pesoIdeal = 45.5 + (2.3 * heightAbove5Feet);
        }
        resultadoElement.innerText = `Peso Ideal (aprox.): ${pesoIdeal.toFixed(1)} kg`;
    } else if (alturaCm && alturaCm <= 152.4) {
         resultadoElement.innerText = 'Altura muito baixa para esta fórmula.';
    }
     else {
        resultadoElement.innerText = 'Preencha a altura válida (cm)!';
    }
}


function toggleCamposCrianca() {
    const tipoCliente = document.getElementById('tipo-cliente').value;
    const camposCrianca = document.getElementById('campos-crianca');

    camposCrianca.style.display = tipoCliente === 'crianca' ? 'grid' : 'none';


    const childInputs = camposCrianca.querySelectorAll('input, select');
    childInputs.forEach(input => {
        input.required = (tipoCliente === 'crianca');
    });
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


    if (!nome || !email || !peso || !altura || !idade || !tipoCliente || !tabaco || !alcool || !drogas) {
        resultadoElement.innerText = 'Preencha todos os campos obrigatórios!';
        resultadoElement.style.color = 'red';
        return;
    }

    let mensagem = `Cliente cadastrado:\nNome: ${nome}\nE-mail: ${email}\nPeso: ${peso} kg\nAltura: ${altura} cm\nIdade: ${idade} anos\nTipo: ${tipoCliente}\nTabaco: ${tabaco}\nÁlcool: ${alcool}\nDrogas: ${drogas}`;
    let allFieldsValid = true;

    if (tipoCliente === 'crianca') {
        const dataNascimento = document.getElementById('data-nascimento').value;
        const alturaPai = document.getElementById('altura-pai').value;
        const alturaMae = document.getElementById('altura-mae').value;
        const historicoPeso = document.getElementById('historico-peso').value;
        const historicoAltura = document.getElementById('historico-altura').value;
        const faseEscolar = document.getElementById('fase-escolar').value;


        if (!dataNascimento || !alturaPai || !alturaMae || !historicoPeso || !historicoAltura || !faseEscolar) {
             resultadoElement.innerText = 'Preencha todos os campos adicionais para crianças!';
             resultadoElement.style.color = 'red';
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

    }
}


function closeMenu() {

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.checked = false;
    }
}