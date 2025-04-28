document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const dados = new FormData(form);

    const camposFormatados = {
        nome: 'Nome',
        idade: 'Idade',
        profissao: 'Profissão',
        possuiVeiculo: 'Possui Veículo',
        tipoVeiculo: 'Tipo do Veículo',
        preferenciaVeiculo: 'Preferência do Veículo',
        investimento: 'Investimento',
        pagamento: 'Pagamento',
        tempoCompra: 'Tempo da Compra',
        financiamento: 'Financiamento',
        conheceuLoja: 'Conheceu a Loja',
        indicacao: 'Indicação',
        email: 'E-mail',
        telefone: 'Celular',
        observacoes: 'Observações'
    };

    const email = form.querySelector('input[name="email"]').value;
    const emailValido = validarEmail(email);

    if (!emailValido) {
        alert("Por favor, insira um email válido.");
        return;
    }

    let mensagem = "🚗 *Formulário de Pré-Atendimento*\n\n";

    for (let [campo, valor] of dados.entries()) {
        if (valor.trim() !== "") {
            let nomeCampo = camposFormatados[campo] || campo;
            mensagem += `*${nomeCampo}:* ${valor}\n`;
        }
    }

    mensagem += "\nAguardando resposta!";

    const telefoneDestino = "5519982457962";
    const urlWhatsApp = `https://wa.me/${telefoneDestino}?text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsApp, '_blank');
});

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

document.querySelectorAll('input[name="tipoVeiculo"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const campo = document.getElementById('campoOutroTipo');
        campo.style.display = (document.getElementById('outroTipo').checked) ? 'block' : 'none';
    });
});

document.querySelectorAll('input[name="conheceuLoja"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const campo = document.getElementById('campoOutroConheceu');
        campo.style.display = (document.getElementById('outroConheceu').checked) ? 'block' : 'none';
    });
});

document.getElementById('telefone').addEventListener('input', function(e) {
    let valor = e.target.value;

    valor = valor.replace(/\D/g, '');

    if (valor.length > 0) {
        valor = '(' + valor;
    }
    if (valor.length > 3) {
        valor = valor.slice(0, 3) + ') ' + valor.slice(3);
    }
    if (valor.length > 10) {
        valor = valor.slice(0, 10) + '-' + valor.slice(10);
    }
    if (valor.length > 15) {
        valor = valor.slice(0, 15);
    }

    e.target.value = valor;
});
