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
        resultadoElement.style.color = 'red';
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
        if (sexo === 'masculino') {
            tmb = 88.362 + (13.397 * peso) + (4.799 * alturaCm) - (5.677 * idade);
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * alturaCm) - (4.330 * idade);
        }
        resultadoElement.innerText = `TMB (aprox.): ${tmb.toFixed(0)} kcal/dia`;
        resultadoElement.style.color = 'var(--verde-escuro)';
    } else {
        resultadoElement.innerText = 'Preencha todos os campos com valores válidos!';
         resultadoElement.style.color = 'red';
    }
}

function calcularPesoIdeal() {
    const sexo = document.getElementById('pi-sexo').value;
    const alturaCm = parseFloat(document.getElementById('pi-altura').value);
    const resultadoElement = document.getElementById('pi-resultado');

    if (alturaCm && alturaCm > 100) { // Added a basic minimum height check
         let pesoIdeal;
         if (sexo === 'masculino') {
             pesoIdeal = 50 + 0.91 * (alturaCm - 152.4);
         } else {
             pesoIdeal = 45.5 + 0.91 * (alturaCm - 152.4);
         }

         if (pesoIdeal > 0) {
             resultadoElement.innerText = `Peso Ideal (aprox.): ${pesoIdeal.toFixed(1)} kg`;
             resultadoElement.style.color = 'var(--verde-escuro)';
         } else {
              resultadoElement.innerText = 'Altura resulta em valor inválido.';
              resultadoElement.style.color = 'red';
         }

    } else {
        resultadoElement.innerText = 'Preencha uma altura válida (cm)!';
        resultadoElement.style.color = 'red';
    }
}


function toggleCamposCrianca() {
    const tipoCliente = document.getElementById('tipo-cliente').value;
    const camposCrianca = document.getElementById('campos-crianca');
    const childInputs = camposCrianca.querySelectorAll('input, select');
    const isCrianca = tipoCliente === 'crianca';

    camposCrianca.style.display = isCrianca ? 'grid' : 'none';
    childInputs.forEach(input => { input.required = isCrianca; });
}

function cadastrarCliente() {
    const form = document.getElementById('cadastro-form');
    const resultadoElement = document.getElementById('cadastro-resultado');
    const formData = new FormData(form);
    const dados = {};
    let allFieldsValid = form.checkValidity(); // Use built-in form validation

    formData.forEach((value, key) => {
        dados[key] = value;
    });

    if (allFieldsValid) {
        resultadoElement.innerText = 'Cadastro realizado com sucesso!';
        resultadoElement.style.color = 'green';
        console.log("Dados do Cadastro:", dados);
        form.reset();
        toggleCamposCrianca();
    } else {
         resultadoElement.innerText = 'Preencha todos os campos obrigatórios corretamente!';
         resultadoElement.style.color = 'red';
         // Optionally, find the first invalid field and focus it
         const firstInvalid = form.querySelector(':invalid');
         if(firstInvalid) {
            firstInvalid.focus();
         }
    }
}


function closeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
        // Manually trigger change event to update icons if needed
        const event = new Event('change');
        menuToggle.dispatchEvent(event);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tipoClienteSelect = document.getElementById('tipo-cliente');
    if(tipoClienteSelect) {
       toggleCamposCrianca(); // Initialize on load
       tipoClienteSelect.addEventListener('change', toggleCamposCrianca); // Ensure listener is active
    }

    const menuToggle = document.getElementById('menu-toggle');
    const menuBtn = document.querySelector('.menu-btn');
    if(menuToggle && menuBtn){
        const openIcon = menuBtn.querySelector('.menu-open');
        const closeIcon = menuBtn.querySelector('.menu-close');

        const updateIcons = () => {
             if (menuToggle.checked) {
                openIcon.style.display = 'none';
                closeIcon.style.display = 'inline';
            } else {
                openIcon.style.display = 'inline';
                closeIcon.style.display = 'none';
            }
        };

        menuToggle.addEventListener('change', updateIcons);
        updateIcons(); // Initial state check
    }
});