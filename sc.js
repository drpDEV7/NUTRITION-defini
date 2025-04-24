function calcularIMC() {
    const peso = parseFloat(document.getElementById('imc-peso').value);
    const altura = parseFloat(document.getElementById('imc-altura').value);
    const resultadoElement = document.getElementById('imc-resultado');
    resultadoElement.style.color = 'var(--verde-escuro)';

    if (peso && altura && altura > 0 && peso > 0) {
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
    resultadoElement.style.color = 'var(--verde-escuro)';

    if (peso && alturaCm && idade && peso > 0 && alturaCm > 0 && idade > 0) {
        let tmb;
        if (sexo === 'masculino') {
            tmb = 88.362 + (13.397 * peso) + (4.799 * alturaCm) - (5.677 * idade);
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * alturaCm) - (4.330 * idade);
        }
        resultadoElement.innerText = `TMB (aprox.): ${tmb.toFixed(0)} kcal/dia`;
    } else {
        resultadoElement.innerText = 'Preencha todos os campos com valores válidos!';
         resultadoElement.style.color = 'red';
    }
}

function calcularPesoIdeal() {
    const sexo = document.getElementById('pi-sexo').value;
    const alturaCm = parseFloat(document.getElementById('pi-altura').value);
    const resultadoElement = document.getElementById('pi-resultado');
    resultadoElement.style.color = 'var(--verde-escuro)';

    if (alturaCm && alturaCm > 100) {
         let pesoIdeal;
         if (sexo === 'masculino') {
             pesoIdeal = 50 + 0.91 * (alturaCm - 152.4);
         } else {
             pesoIdeal = 45.5 + 0.91 * (alturaCm - 152.4);
         }

         if (pesoIdeal > 0) {
             resultadoElement.innerText = `Peso Ideal (aprox.): ${pesoIdeal.toFixed(1)} kg`;
         } else {
              resultadoElement.innerText = 'Altura resulta em valor inválido.';
              resultadoElement.style.color = 'red';
         }

    } else {
        resultadoElement.innerText = 'Preencha uma altura válida (cm > 100)!';
        resultadoElement.style.color = 'red';
    }
}

function calcularIMCInfantil() {
    const peso = parseFloat(document.getElementById('imc-infantil-peso').value);
    const altura = parseFloat(document.getElementById('imc-infantil-altura').value);
    const idadeAnos = parseInt(document.getElementById('imc-infantil-idade-anos').value);
    const idadeMeses = parseInt(document.getElementById('imc-infantil-idade-meses').value);
    const sexo = document.getElementById('imc-infantil-sexo').value;
    const resultadoElement = document.getElementById('imc-infantil-resultado');
    resultadoElement.style.color = 'var(--verde-escuro)';

    if (isNaN(idadeAnos) || idadeAnos < 0 || idadeAnos > 19) {
         resultadoElement.innerText = 'Idade em anos inválida (0-19).';
         resultadoElement.style.color = 'red';
         return;
    }
     if (isNaN(idadeMeses) || idadeMeses < 0 || idadeMeses > 11) {
         resultadoElement.innerText = 'Idade em meses inválida (0-11).';
         resultadoElement.style.color = 'red';
         return;
    }
     if (idadeAnos === 0 && idadeMeses === 0) {
         resultadoElement.innerText = 'Informe a idade em anos e/ou meses.';
         resultadoElement.style.color = 'red';
         return;
     }


    if (peso && altura && altura > 0 && peso > 0) {
        const imc = peso / (altura * altura);
        resultadoElement.innerHTML = `IMC Calculado: ${imc.toFixed(2)}<br><small style='color: #e67e22; display: block; margin-top: 5px;'><strong>Importante:</strong> Este valor de IMC deve ser interpretado por um profissional de saúde usando curvas de crescimento (percentis) específicas para idade e sexo.</small>`;
    } else {
        resultadoElement.innerText = 'Preencha peso e altura válidos!';
        resultadoElement.style.color = 'red';
    }
}


function toggleCamposCrianca() {
    const tipoCliente = document.getElementById('tipo-cliente').value;
    const camposCrianca = document.getElementById('campos-crianca');
    const childInputs = camposCrianca.querySelectorAll('input, select');
    const isCrianca = tipoCliente === 'crianca';

    camposCrianca.style.display = isCrianca ? 'grid' : 'none';

    childInputs.forEach(input => {
        if (isCrianca) {
            if (input.id !== 'data-nascimento' && input.id !== 'altura-pai' && input.id !== 'altura-mae' && input.id !== 'historico-peso' && input.id !== 'historico-altura' && input.id !== 'fase-escolar') {
                 input.required = true;
             } else {
                 input.required = false;
             }
         } else {
             input.required = false;
         }
    });
}


function cadastrarCliente() {
    const form = document.getElementById('cadastro-form');
    const resultadoElement = document.getElementById('cadastro-resultado');
    const formData = new FormData(form);
    const dados = {};
    let allFieldsValid = true;


    for (let field of form.elements) {
        if (field.required && !field.value) {
            allFieldsValid = false;
            break;
        }
         if (field.type === 'email' && field.value && !field.checkValidity()) {
             allFieldsValid = false;
             break;
         }
          if (field.type === 'number' && field.value && !field.checkValidity()) {
             allFieldsValid = false;
             break;
         }
    }

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
         resultadoElement.innerText = 'Preencha todos os campos obrigatórios (*) corretamente!';
         resultadoElement.style.color = 'red';
         const firstInvalid = form.querySelector(':invalid:required');
         if(firstInvalid) {
            try {
                firstInvalid.focus();
            } catch(e) {
                console.warn("Could not focus on invalid field:", firstInvalid);
            }
         }
    }
}


function closeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
        const event = new Event('change');
        menuToggle.dispatchEvent(event);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tipoClienteSelect = document.getElementById('tipo-cliente');
    if(tipoClienteSelect) {
       toggleCamposCrianca();
       tipoClienteSelect.addEventListener('change', toggleCamposCrianca);
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
        updateIcons();
    }

    const cadastroForm = document.getElementById('cadastro-form');
     if (cadastroForm) {
         cadastroForm.setAttribute('novalidate', true);
         cadastroForm.addEventListener('submit', function(event) {
             event.preventDefault();
             cadastrarCliente();
         });
     }
});