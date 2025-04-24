function setResultMessage(elementId, message, isError = false) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = message;
        element.style.color = isError ? 'var(--vermelho-erro)' : 'var(--verde-escuro)';
         element.style.fontWeight = isError ? '600' : '600';
    }
}

function clearResult(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}


function calcularIMC() {
    const peso = parseFloat(document.getElementById('imc-peso').value);
    const altura = parseFloat(document.getElementById('imc-altura').value);
    const resultadoElementId = 'imc-resultado';
    clearResult(resultadoElementId);

    if (peso && altura && altura > 0 && peso > 0) {
        const imc = peso / (altura * altura);
        let classificacao = '';
        if (imc < 18.5) classificacao = 'Abaixo do peso';
        else if (imc < 24.9) classificacao = 'Peso normal';
        else if (imc < 29.9) classificacao = 'Sobrepeso';
        else if (imc < 34.9) classificacao = 'Obesidade Grau I';
        else if (imc < 39.9) classificacao = 'Obesidade Grau II';
        else classificacao = 'Obesidade Grau III';
        setResultMessage(resultadoElementId, `Seu IMC: <strong>${imc.toFixed(2)} kg/m²</strong><br>Classificação: ${classificacao}`);
    } else {
        setResultMessage(resultadoElementId, 'Preencha peso (kg) e altura (m) válidos!', true);
    }
}

function calcularTMB() {
    const sexo = document.getElementById('tmb-sexo').value;
    const peso = parseFloat(document.getElementById('tmb-peso').value);
    const alturaCm = parseFloat(document.getElementById('tmb-altura').value);
    const idade = parseInt(document.getElementById('tmb-idade').value);
    const resultadoElementId = 'tmb-resultado';
    clearResult(resultadoElementId);

    if (peso && alturaCm && idade && peso > 0 && alturaCm > 50 && idade > 0 && idade < 120) {
        let tmb;
        if (sexo === 'masculino') {
            tmb = 88.362 + (13.397 * peso) + (4.799 * alturaCm) - (5.677 * idade);
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * alturaCm) - (4.330 * idade);
        }
        setResultMessage(resultadoElementId, `Sua TMB (aprox.):<br><strong>${tmb.toFixed(0)} kcal/dia</strong><br><small>(Energia em repouso)</small>`);
    } else {
        setResultMessage(resultadoElementId, 'Preencha todos os campos com valores válidos!', true);
    }
}

function calcularPesoIdeal() {
    const sexo = document.getElementById('pi-sexo').value;
    const alturaCm = parseFloat(document.getElementById('pi-altura').value);
    const resultadoElementId = 'pi-resultado';
    clearResult(resultadoElementId);

    if (alturaCm && alturaCm > 140 && alturaCm < 230) {
         let pesoIdealMin, pesoIdealMax;
         const alturaM = alturaCm / 100;
         pesoIdealMin = 18.5 * (alturaM * alturaM);
         pesoIdealMax = 24.9 * (alturaM * alturaM);

         if (pesoIdealMin > 0 && pesoIdealMax > 0) {
             setResultMessage(resultadoElementId, `Faixa de Peso Ideal (IMC 18.5-24.9):<br><strong>${pesoIdealMin.toFixed(1)} kg - ${pesoIdealMax.toFixed(1)} kg</strong><br><small>(Referência baseada no IMC)</small>`);
         } else {
              setResultMessage(resultadoElementId, 'Altura inválida para cálculo.', true);
         }
    } else {
        setResultMessage(resultadoElementId, 'Preencha altura válida (entre 140 e 230 cm)!', true);
    }
}

function calcularIMCInfantil() {
    const peso = parseFloat(document.getElementById('imc-infantil-peso').value);
    const altura = parseFloat(document.getElementById('imc-infantil-altura').value);
    const idadeAnos = parseInt(document.getElementById('imc-infantil-idade-anos').value);
    const idadeMesesInput = document.getElementById('imc-infantil-idade-meses').value;
    const sexo = document.getElementById('imc-infantil-sexo').value;
    const resultadoElementId = 'imc-infantil-resultado';
    clearResult(resultadoElementId);

    const idadeMeses = idadeMesesInput === '' ? 0 : parseInt(idadeMesesInput);

    let errorMsg = '';
    if (isNaN(idadeAnos) || idadeAnos < 0 || idadeAnos > 19) {
         errorMsg = 'Idade em anos inválida (0-19).';
    } else if (isNaN(idadeMeses) || idadeMeses < 0 || idadeMeses > 11) {
         errorMsg = 'Idade em meses inválida (0-11).';
    } else if (idadeAnos === 0 && idadeMeses === 0 && !(peso && altura)) {
         errorMsg = 'Informe a idade em anos e/ou meses.';
     } else if (idadeAnos === 19 && idadeMeses > 0) {
         errorMsg = 'Para 19 anos, deixe os meses em 0.';
     } else if (!peso || peso <= 0) {
         errorMsg = 'Informe um peso válido (kg).';
     } else if (!altura || altura <= 0 || altura > 2.5) {
         errorMsg = 'Informe uma altura válida (m).';
     }

    if (errorMsg) {
        setResultMessage(resultadoElementId, errorMsg, true);
        return;
    }

    const imc = peso / (altura * altura);
    setResultMessage(resultadoElementId, `IMC Calculado: <strong>${imc.toFixed(2)} kg/m²</strong><br><small class="warn"><strong>Atenção:</strong> Interpretação requer curvas de percentil e avaliação profissional.</small>`);

}


function toggleCamposCrianca() {
    const tipoClienteSelect = document.getElementById('tipo-cliente');
    if (!tipoClienteSelect) return; // Only run if the element exists

    const tipoCliente = tipoClienteSelect.value;
    const camposCrianca = document.getElementById('campos-crianca');
    const childInputs = camposCrianca ? camposCrianca.querySelectorAll('input, select') : [];
    const isCrianca = tipoCliente === 'crianca';

    if (camposCrianca) {
        camposCrianca.style.display = isCrianca ? 'grid' : 'none';
    }

    childInputs.forEach(input => {
        input.required = false; // Assume optional unless explicitly required for child
    });
}

function cadastrarCliente() {
    const form = document.getElementById('cadastro-form');
    const resultadoElement = document.getElementById('cadastro-resultado');
    if (!form || !resultadoElement) return; // Exit if elements not found

    const formData = new FormData(form);
    const dados = {};
    let firstInvalidField = null;
    let allFieldsValid = true;

    resultadoElement.innerText = ''; // Clear previous messages

    for (let field of form.elements) {
        if (field.tagName === 'INPUT' || field.tagName === 'SELECT' || field.tagName === 'TEXTAREA') {
             const isVisible = field.offsetWidth > 0 || field.offsetHeight > 0 || field.getClientRects().length > 0;

            if (field.required && isVisible && !field.value.trim()) {
                allFieldsValid = false;
                field.style.borderColor = 'var(--vermelho-erro)';
                if (!firstInvalidField) firstInvalidField = field;
            } else if (field.type === 'email' && field.value && !/^\S+@\S+\.\S+$/.test(field.value)) {
                 allFieldsValid = false;
                 field.style.borderColor = 'var(--vermelho-erro)';
                 if (!firstInvalidField) firstInvalidField = field;
             } else {
                 field.style.borderColor = ''; // Reset border color if valid
             }
        }
    }

    formData.forEach((value, key) => {
        dados[key] = value.trim();
    });

    if (allFieldsValid) {
        resultadoElement.innerText = 'Cadastro enviado com sucesso! (Simulação)';
        resultadoElement.style.color = 'green';
        console.log("Dados do Cadastro (Simulação):", dados);
        form.reset(); // Reset form fields
        toggleCamposCrianca(); // Ensure child fields are hidden again
        // Clear border colors on successful submission
         for (let field of form.elements) {
             if (field.tagName === 'INPUT' || field.tagName === 'SELECT' || field.tagName === 'TEXTAREA') {
                 field.style.borderColor = '';
             }
         }
    } else {
         resultadoElement.innerText = 'Por favor, preencha todos os campos obrigatórios (*) corretamente!';
         resultadoElement.style.color = 'var(--vermelho-erro)';
         if(firstInvalidField) {
            try {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch(e) {
                console.warn("Não foi possível focar no campo inválido:", firstInvalidField);
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

function mostrarCalculadoras(tipo) {
    const adultoContainer = document.getElementById('calculadoras-adulto');
    const criancaContainer = document.getElementById('calculadoras-crianca');
    const btnAdulto = document.getElementById('btn-adulto');
    const btnCrianca = document.getElementById('btn-crianca');

    if (!adultoContainer || !criancaContainer || !btnAdulto || !btnCrianca) return;

    if (tipo === 'adulto') {
        adultoContainer.style.display = 'block';
        criancaContainer.style.display = 'none';
        btnAdulto.classList.add('active');
        btnCrianca.classList.remove('active');
         clearResult('imc-infantil-resultado');
    } else if (tipo === 'crianca') {
        adultoContainer.style.display = 'none';
        criancaContainer.style.display = 'block';
        btnAdulto.classList.remove('active');
        btnCrianca.classList.add('active');
        clearResult('imc-resultado');
        clearResult('tmb-resultado');
        clearResult('pi-resultado');
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
             if (!openIcon || !closeIcon) return;
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
         cadastroForm.addEventListener('submit', function(event) {
             event.preventDefault();
             cadastrarCliente();
         });
         // Add listener to remove error border on input
         cadastroForm.addEventListener('input', function(event) {
             if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
                 event.target.style.borderColor = ''; // Clear border on input
             }
         });
     }

     // Calculadoras Page Logic
     const btnAdulto = document.getElementById('btn-adulto');
     const btnCrianca = document.getElementById('btn-crianca');

     if (btnAdulto && btnCrianca) {
         btnAdulto.addEventListener('click', () => mostrarCalculadoras('adulto'));
         btnCrianca.addEventListener('click', () => mostrarCalculadoras('crianca'));

         // Initialize view (show adult by default)
         mostrarCalculadoras('adulto');
     }
});