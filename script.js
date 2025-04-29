const form = document.getElementById('formulario');
const steps = [...document.querySelectorAll('.form-step')];
const btnNext = [...document.querySelectorAll('.btn-next')];
const btnPrev = [...document.querySelectorAll('.btn-prev')];
const progress = document.getElementById('progress');
const stepsEl = [...document.querySelectorAll('.progress-step')];
const modalOverlay = document.getElementById('modal-overlay');
const btnConfirm   = document.getElementById('modal-confirm');
const btnCancel    = document.getElementById('modal-cancel');

let currentStep = 0;
function updateFormSteps() {
  steps.forEach((fs,i) => fs.classList.toggle('form-step-active', i === currentStep));
  stepsEl.forEach((el,i) => {
    el.classList.toggle('progress-step-active', i <= currentStep);
  });
  const percent = (currentStep)/(steps.length-1) * 100;
  progress.style.setProperty('--progress-width', percent + '%');
  progress.style.setProperty('--animate', percent + '%');
  progress.querySelector('::after');
  progress.style.setProperty('--w', percent + '%');
  progress.style.setProperty('width', '100%');
  progress.style.setProperty('--calc-width', percent + '%');
  progress.style.setProperty('--before-width', percent + '%');
  progress.style.setProperty('--animate-width', percent + '%');
  progress.style.setProperty('--progress-filled', `${percent}%`);
  progress.style.setProperty('width', '100%');
  progress.style.setProperty('--after-width', `${percent}%`);
  progress.style.setProperty('--fill-width', `${percent}%`);
  progress.style.setProperty('--progress-done', `${percent}%`);
  progress.style.setProperty('--fill', `${percent}%`);
  progress.querySelector('::after');
  progress.style.setProperty('--after', `${percent}%`);
}

btnNext.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    currentStep++;
    updateFormSteps();
  });
});
btnPrev.forEach(btn => {
  btn.addEventListener('click', () => {
    currentStep--;
    updateFormSteps();
  });
});

function handleOther(radioName, radioId, inputId) {
  document.getElementsByName(radioName).forEach(r => {
    r.addEventListener('change', () => {
      document.getElementById(inputId).style.display =
        document.getElementById(radioId).checked ? 'block' : 'none';
    });
  });
}
handleOther('tipoVeiculo','outroTipo1','campoOutro1');
handleOther('conheceuLoja','outroConheceu3','campoOutro3');

document.getElementsByName('tipoVeiculo').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('error-outroTipoVeiculo').textContent = '';
    });
  });
  
  document.getElementsByName('conheceuLoja').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('error-outroConheceuLoja').textContent = '';
    });
  });

document.getElementById('telefone').addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g,'');
  if (v.length > 0) v = '(' + v;
  if (v.length > 3) v = v.slice(0,3) + ') ' + v.slice(3);
  if (v.length > 10) v = v.slice(0,10) + '-' + v.slice(10,15);
  e.target.value = v;
});

function showError(id, msg) {
  document.getElementById('error-'+id).textContent = msg;
}
function clearErrors(stepIndex) {
  const fs = steps[stepIndex];
  fs.querySelectorAll('.error-message').forEach(e => e.textContent = '');
}
function validateStep(stepIndex) {
  clearErrors(stepIndex);
  const fs = steps[stepIndex];
  let valid = true;
  fs.querySelectorAll('input[required], select[required]').forEach(input => {
    if ((input.type==='radio' && !fs.querySelector(`input[name="${input.name}"]:checked`)) ||
        (input.value.trim()==='' )) {
      valid = false;
      showError(input.name, {
        nome: 'Por favor insira seu nome completo.',
        idade: 'Insira sua idade.',
        profissao: 'Descreva sua profissão.',
        possuiVeiculo: 'Selecione uma opção.',
        tipoVeiculo: 'Escolha o tipo de veículo.',
        preferenciaVeiculo: 'Selecione preferência.',
        investimento: 'Escolha a faixa de investimento.',
        pagamento: 'Selecione forma de pagamento.',
        tempoCompra: 'Defina a previsão de compra.',
        financiamento: 'Selecione status do financiamento.',
        conheceuLoja: 'Como você nos conheceu?',
        email: 'Por favor insira um e-mail válido.',
        telefone: 'Insira seu celular.',
      }[input.name] || 'Campo obrigatório.');
    } else if (input.type==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      valid = false;
      showError('email','Insira um e-mail válido.');
    }
  });

   if (stepIndex === 0 && document.getElementById('outroTipo1').checked) {
    const outro1 = document.getElementById('campoOutro1');
    if (outro1.value.trim() === '') {
      valid = false;
      showError('outroTipoVeiculo', 'Por favor, especifique.');
    }
  }

  if (stepIndex === 2 && document.getElementById('outroConheceu3').checked) {
    const outro3 = document.getElementById('campoOutro3');
    if (outro3.value.trim() === '') {
      valid = false;
      showError('outroConheceuLoja', 'Por favor, especifique.');
    }
  }

  return valid;
}

let waUrl = '';

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateStep(currentStep)) return;

  const data = new FormData(form);
  let msg = "🚗 *Formulário de Pré-Atendimento*\n\n";
  for (let [k,v] of data.entries()) if (v.trim())
    msg += `*${k}*: ${v}\n`;
  msg += "\nAguardando resposta!";
  const tel = "5519982457962";
  waUrl = `https://wa.me/${tel}?text=${encodeURIComponent(msg)}`;

  modalOverlay.classList.remove('hidden');
});

btnConfirm.addEventListener('click', () => {
  window.open(waUrl, '_blank');
  modalOverlay.classList.add('hidden');
});

btnCancel.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
});

updateFormSteps();