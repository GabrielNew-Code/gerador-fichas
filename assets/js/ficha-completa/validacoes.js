document.addEventListener('DOMContentLoaded', () => {
  const notaInput = document.getElementById('nota');
  if (!notaInput) return;

  notaInput.addEventListener('keydown', (e) => {
    const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End'];

    if (teclasPermitidas.includes(e.key)) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const proximo = document.querySelector('[data-sequencia="2"]');
        if (proximo) proximo.focus();
      }
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      return;
    }

    // Permitir apenas números
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    if (notaInput.value.length >= 10) {
      e.preventDefault();
      return;
    }
  });

  // No evento input, "limpa" qualquer caractere inválido e aplica limite de 10 caracteres
  notaInput.addEventListener('input', (e) => {
    let valor = notaInput.value;

    // Remove tudo que não for dígito
    valor = valor.replace(/\D/g, '');

    // Limita a 10 caracteres
    if (valor.length > 10) {
      valor = valor.substring(0, 10);
    }

    // Atualiza o valor do input caso tenha modificado
    if (notaInput.value !== valor) {
      notaInput.value = valor;
    }
  });

  notaInput.addEventListener('paste', (e) => {
    const texto = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^\d{0,10}$/.test(texto)) {
      e.preventDefault();
    }
  });
});















// Carro
function validarCarro(event) {
  const input = event.target;

  // Regex para permitir letras (com acentos), números, ponto, vírgula, ! e -
  const regexPermitido = /[^a-zA-Z0-9À-ÿ.,!\-\s]/g;

  // Remove caracteres não permitidos
  input.value = input.value.replace(regexPermitido, '');

  // Limita a 25 caracteres
  if (input.value.length > 22) {
    input.value = input.value.slice(0, 22);
  }

  // Deixa tudo maiúsculo
  input.value = input.value.toUpperCase();
}














// Cor
function validarCor(event) {
  const input = event.target;

  // Regex para permitir apenas letras com acentos e hífen
  const regexPermitido = /[^a-zA-ZÀ-ÿ\-]/g;

  // Remove caracteres não permitidos
  input.value = input.value.replace(regexPermitido, '');

  // Limita a 20 caracteres (pode mudar se quiser)
  if (input.value.length > 11) {
    input.value = input.value.slice(0, 11);
  }

  // Deixa tudo maiúsculo
  input.value = input.value.toUpperCase();
}




















// Ano
// Configurações de ano
const ANO_MIN = 1950;
const ANO_MAX = new Date().getFullYear() + 1;

document.addEventListener('DOMContentLoaded', function() {
    const inputAno = document.getElementById('ano');
    
    if (inputAno) {
        configurarInputAno(inputAno);
    }
});

function configurarInputAno(input) {
    let evitandoLoop = false;
    let ultimoValor = '';
    
    input.addEventListener('keydown', function(event) {
        // Permite apenas números e teclas de controle
        if (!((event.key >= '0' && event.key <= '9') || 
              ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))) {
            event.preventDefault();
        }
    });

    input.addEventListener('input', function(e) {
        if (evitandoLoop) return;
        
        // Salva posição do cursor
        const posCursor = input.selectionStart;
        let valor = input.value;
        
        // Remove a barra temporariamente para processamento
        valor = valor.replace(/\//g, '');
        
        // Insere barra automaticamente após 4 dígitos
        if (valor.length > 4) {
            valor = valor.substring(0, 4) + '/' + valor.substring(4, 8);
        }
        
        // Limita o tamanho máximo
        if (valor.length > 9) {
            valor = valor.substring(0, 9);
        }
        
        // Atualiza apenas se o valor mudou
        if (input.value !== valor) {
            evitandoLoop = true;
            input.value = valor;
            ultimoValor = valor;
            
            // Ajusta posição do cursor
            let novaPos = posCursor;
            if (posCursor >= 4 && valor.length > 4 && valor.includes('/')) {
                novaPos++;
            }
            if (novaPos > valor.length) novaPos = valor.length;
            
            input.setSelectionRange(novaPos, novaPos);
            evitandoLoop = false;
        }
        
        // Validação visual
        validarAnoVisual(input);
    });

    input.addEventListener('blur', function() {
        if (!evitandoLoop) {
            evitandoLoop = true;
            if (!validarAnoCompleto(input)) {
                setTimeout(() => input.focus(), 10);
            }
            evitandoLoop = false;
        }
    });
}

function validarAnoVisual(input) {
    const valor = input.value;
    const valido = validarAnoCompleto(input, false);
    
    input.classList.toggle('ano-invalido', !valido && valor.length > 0);
    input.classList.toggle('ano-valido', valido);
}

function validarAnoCompleto(input, mostrarAlerta = true) {
    const valor = input.value.trim();
    
    if (valor === '') {
        return true;
    }
    
    const partes = valor.split('/');
    let valido = true;
    let mensagem = '';
    
    // Verifica formato
    if (partes.length > 2 || (partes.length === 2 && partes[1] === '')) {
        mensagem = "Formato incorreto. Use: 2020 ou 2020/2021";
        valido = false;
    }
    
    // Valida primeiro ano
    const ano1 = partes[0] ? parseInt(partes[0], 10) : NaN;
    if (isNaN(ano1)) {
        mensagem = "Ano inválido. Digite apenas números.";
        valido = false;
    } else if (ano1 < ANO_MIN || ano1 > ANO_MAX) {
        mensagem = `Ano inválido. Use um ano entre ${ANO_MIN} e ${ANO_MAX}.`;
        valido = false;
    }
    
    // Valida segundo ano se existir
    if (valido && partes.length === 2 && partes[1] !== '') {
        const ano2 = parseInt(partes[1], 10);
        
        if (isNaN(ano2)) {
            mensagem = "Segundo ano inválido. Digite apenas números.";
            valido = false;
        } else if (ano2 < ANO_MIN || ano2 > ANO_MAX) {
            mensagem = `Segundo ano inválido. Use um ano entre ${ANO_MIN} e ${ANO_MAX}.`;
            valido = false;
        } else if (ano2 < ano1) {
            mensagem = "O segundo ano não pode ser menor que o primeiro.";
            valido = false;
        }
    }
    
    if (!valido && mostrarAlerta) {
        alert(mensagem);
    }
    
    return valido;
}


















// Placa

// Função principal para validação da placa
function formatarPlaca(input) {
    // Verifica se já está processando para evitar loop
    if (input.getAttribute('data-formatando') === 'true') return;
    input.setAttribute('data-formatando', 'true');
    
    // Salva a posição do cursor
    const posCursor = input.selectionStart;
    
    // Obtém o valor atual e remove caracteres inválidos
    let valor = input.value.toUpperCase();
    valor = valor.replace(/[^A-Z0-9]/g, '');
    
    let resultado = '';
    
    // Processa os caracteres conforme o padrão da placa
    for (let i = 0; i < valor.length; i++) {
        const char = valor[i];
        
        // Primeiros 3 caracteres devem ser letras
        if (i < 3) {
            if (/[A-Z]/.test(char)) {
                resultado += char;
            }
        }
        // 4º caractere deve ser número
        else if (i === 3) {
            if (/[0-9]/.test(char)) {
                resultado += char;
            }
        }
        // 5º caractere pode ser letra ou número
        else if (i === 4) {
            if (/[A-Z0-9]/.test(char)) {
                resultado += char;
            }
        }
        // 6º e 7º caracteres devem ser números
        else if (i >= 5 && i < 7) {
            if (/[0-9]/.test(char)) {
                resultado += char;
            }
        }
    }
    
    // Insere o hífen após o 3º caractere se necessário
    if (resultado.length > 3 && resultado[3] !== '-') {
        resultado = resultado.substring(0, 3) + '-' + resultado.substring(3);
    }
    
    // Limita o tamanho máximo
    resultado = resultado.substring(0, 8);
    
    // Atualiza o valor do input
    input.value = resultado;
    
    // Restaura a posição do cursor, ajustando para a formatação
    let novaPos = posCursor;
    if (posCursor > 3 && resultado.length > 3 && resultado[3] === '-') {
        novaPos++;
    }
    if (novaPos > resultado.length) {
        novaPos = resultado.length;
    }
    input.setSelectionRange(novaPos, novaPos);
    
    // Remove o flag de processamento
    input.removeAttribute('data-formatando');
    
    // Valida a placa
    validarPlaca(input);
}

// Função para validar a placa completa
function validarPlaca(input) {
    const placa = input.value;
    const padrao = /^[A-Z]{3}-[0-9][A-Z0-9][0-9]{2}$/;
    const valido = padrao.test(placa);
    
    // Adiciona/remove classe de validação
    input.classList.toggle('placa-invalida', !valido && placa.length > 0);
    input.classList.toggle('placa-valida', valido);
    
    return valido;
}

// Função para controlar a navegação com Tab/Enter
function controlarNavegacaoPlaca(event) {
    const input = event.target;
    
    // Permite teclas de navegação
    const teclasPermitidas = [
        'Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight',
        'ArrowUp', 'ArrowDown', 'Home', 'End'
    ];
    
    // Bloqueia caracteres não permitidos
    if (!event.key.match(/^[A-Za-z0-9]$/) && !teclasPermitidas.includes(event.key)) {
        event.preventDefault();
        return;
    }
    
    // Valida antes de permitir Tab ou Enter
    if (event.key === 'Tab' || event.key === 'Enter') {
        if (!validarPlaca(input) && input.value.length > 0) {
            event.preventDefault();
            alert('Placa inválida! Formato correto: ABC-1D23');
            input.focus();
        }
    }
}

// Configura o input da placa
function configurarInputPlaca() {
    const inputPlaca = document.getElementById('placa');
    
    if (inputPlaca) {
        inputPlaca.addEventListener('input', function() {
            formatarPlaca(this);
        });
        
        inputPlaca.addEventListener('keydown', controlarNavegacaoPlaca);
        
        inputPlaca.addEventListener('blur', function() {
            if (this.value.length > 0 && !validarPlaca(this)) {
                alert('Placa inválida! Formato correto: ABC-1D23');
                this.focus();
            }
        });
        
        // Validação inicial se já tiver valor
        if (inputPlaca.value) {
            formatarPlaca(inputPlaca);
        }
    }
}

// Configura quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', configurarInputPlaca);










// ==============  Novo    Novo    Novo  =====================




function formatarPlaca(input) {
    // Evita loop desnecessário
    if (input.getAttribute('data-formatando') === 'true') return;
    input.setAttribute('data-formatando', 'true');

    const valorAntigo = input.value;
    const posCursor = input.selectionStart;

    // Limpeza e processamento
    let valor = valorAntigo.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let resultado = '';

    for (let i = 0; i < valor.length; i++) {
        const char = valor[i];
        if (i < 3 && /[A-Z]/.test(char)) {
            resultado += char;
        } else if (i === 3 && /[0-9]/.test(char)) {
            resultado += char;
        } else if (i === 4 && /[A-Z0-9]/.test(char)) {
            resultado += char;
        } else if ((i === 5 || i === 6) && /[0-9]/.test(char)) {
            resultado += char;
        }
    }

    if (resultado.length > 3) {
        resultado = resultado.slice(0, 3) + '-' + resultado.slice(3);
    }

    resultado = resultado.slice(0, 8);

    // Atualiza o valor do input apenas se mudou
    if (input.value !== resultado) {
        input.value = resultado;

        // Ajuste simples de cursor
        let novaPos = posCursor;
        if (posCursor === 4 && resultado[3] === '-') {
            novaPos++;
        }
        if (novaPos > resultado.length) novaPos = resultado.length;
        input.setSelectionRange(novaPos, novaPos);
    }

    input.removeAttribute('data-formatando');

    validarPlaca(input);
}

function validarPlaca(input) {
    const placa = input.value;
    const padrao = /^[A-Z]{3}-[0-9][A-Z0-9][0-9]{2}$/;
    const valido = padrao.test(placa);

    input.classList.toggle('placa-invalida', !valido && placa.length > 0);
    input.classList.toggle('placa-valida', valido);

    return valido;
}

function controlarNavegacaoPlaca(event) {
    const input = event.target;
    const teclasPermitidas = [
        'Backspace', 'Delete', 'Tab', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'
    ];

    if (!event.key.match(/^[A-Za-z0-9]$/) && !teclasPermitidas.includes(event.key)) {
        event.preventDefault();
        return;
    }

    if ((event.key === 'Tab' || event.key === 'Enter') && input.value.length > 0) {
        if (!validarPlaca(input)) {
            event.preventDefault();
            alert('Placa inválida! Formato correto: ABC-1D23');
            // Não dar foco novamente aqui
        }
    }
}

function configurarInputPlaca() {
    const inputPlaca = document.getElementById('placa');

    if (inputPlaca) {
        inputPlaca.addEventListener('input', function () {
            formatarPlaca(this);
        });

        inputPlaca.addEventListener('keydown', controlarNavegacaoPlaca);

        inputPlaca.addEventListener('blur', function () {
            if (this.value.length > 0 && !validarPlaca(this)) {
                alert('Placa inválida! Formato correto: ABC-1D23');
                // Remover o this.focus() aqui para evitar loop
            }
        });

        // Validação inicial
        if (inputPlaca.value) {
            formatarPlaca(inputPlaca);
        }
    }
}

document.addEventListener('DOMContentLoaded', configurarInputPlaca);




























//Km

const kmInput = document.getElementById('km');

kmInput.addEventListener('keydown', function (e) {
  const allowedKeys = ['Backspace', 'Enter', 'ArrowLeft', 'ArrowRight'];

  if (
    !allowedKeys.includes(e.key) &&
    !(e.key >= '0' && e.key <= '9')
  ) {
    e.preventDefault();
  }
});

kmInput.addEventListener('input', function () {
  let value = this.value.replace(/\D/g, ''); // remove não-números

  value = value.slice(0, 8); // limita a 8 dígitos numéricos

  // aplica os pontos de milhar
  let formatted = '';
  for (let i = 0; i < value.length; i++) {
    if ((value.length - i) % 3 === 0 && i !== 0) {
      formatted += '.';
    }
    formatted += value[i];
  }

  this.value = formatted;
});



















// Chassi

// Função para validar o campo de Chassi
function validarChassi() {
  const chassiInput = document.getElementById('chassi');
  let chassi = chassiInput.value;

  // Converte para maiúsculas
  chassi = chassi.toUpperCase();

  // Remove qualquer caractere que não seja letra ou número
  chassi = chassi.replace(/[^A-Z0-9]/g, '');

  // Atualiza o valor do campo com os novos dados validados
  chassiInput.value = chassi;

  return chassi;
}

// Função para verificar se o chassi tem 17 caracteres
function verificarComprimento() {
  const chassiInput = document.getElementById('chassi');
  const chassi = chassiInput.value;

  // Verifica se o comprimento é menor que 17
  if (chassi.length < 17) {
    alert('O chassi precisa ter exatamente 17 caracteres!');
  }
}

// Evento para validar enquanto digita
document.addEventListener('DOMContentLoaded', function() {
  const chassiInput = document.getElementById('chassi');

  // Valida enquanto digita (transforma para maiúsculas e remove caracteres inválidos)
  chassiInput.addEventListener('input', function() {
    validarChassi();
  });

  // Verifica o comprimento quando o campo perde o foco (blur)
  chassiInput.addEventListener('blur', function() {
    verificarComprimento();
  });
});




// ===========   Novo  codigo =============



// Cria o modal de alerta personalizado
function criarModalAlerta() {
  if (document.getElementById('modal-alerta')) return; // evita duplicação

  const modal = document.createElement('div');
  modal.id = 'modal-alerta';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = '#fff';
  modal.style.padding = '20px';
  modal.style.border = '1px solid #ccc';
  modal.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
  modal.style.zIndex = '1000';
  modal.style.display = 'none';
  modal.style.maxWidth = '300px';
  modal.style.textAlign = 'center';
  modal.style.borderRadius = '8px';

  const texto = document.createElement('p');
  texto.id = 'modal-texto';

  const botao = document.createElement('button');
  botao.textContent = 'OK';
  botao.style.marginTop = '10px';
  botao.onclick = function () {
    modal.style.display = 'none';
  };

  modal.appendChild(texto);
  modal.appendChild(botao);
  document.body.appendChild(modal);
}

// Exibe o modal com a mensagem
function mostrarModalAlerta(mensagem) {
  const modal = document.getElementById('modal-alerta');
  const texto = document.getElementById('modal-texto');
  texto.textContent = mensagem;
  modal.style.display = 'block';
}

// Função para validar o campo de Chassi
function validarChassi() {
  const chassiInput = document.getElementById('chassi');
  let chassi = chassiInput.value;

  chassi = chassi.toUpperCase();
  chassi = chassi.replace(/[^A-Z0-9]/g, '');

  chassiInput.value = chassi;
  return chassi;
}

// Verifica se o chassi tem 17 caracteres e mostra modal se estiver errado
function verificarComprimento() {
  const chassiInput = document.getElementById('chassi');
  const chassi = chassiInput.value;

  if (chassi.length < 17) {
    mostrarModalAlerta('O chassi precisa ter exatamente 17 caracteres!');
    chassiInput.classList.add('erro');
  } else {
    chassiInput.classList.remove('erro');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  criarModalAlerta();

  const chassiInput = document.getElementById('chassi');

  chassiInput.addEventListener('input', function() {
    validarChassi();
  });

  chassiInput.addEventListener('blur', function() {
    verificarComprimento();
  });
});























// Observação


function validarObs(event) {
  const input = event.target;

  // Regex para permitir letras (com acentos), números, ponto, vírgula, ! e -
  const regexPermitido = /[^a-zA-Z0-9À-ÿ.,!\-\s]/g;

  // Remove caracteres não permitidos
  input.value = input.value.replace(regexPermitido, '');

  // Limita a 25 caracteres
  if (input.value.length > 22) {
    input.value = input.value.slice(0, 22);
  }

  // Deixa tudo maiúsculo
  input.value = input.value.toUpperCase();
}
















// Validar Impressão


function validarFormulario(acao) {
  const carro = document.getElementById('carro')?.value.trim();
  const anoInput = document.getElementById('ano');
  const chassi = document.getElementById('chassi')?.value.trim();
  const placaInput = document.getElementById('placa');

  // Verifica se os campos obrigatórios estão preenchidos
  if (!carro || !anoInput?.value.trim() || !chassi || !placaInput?.value.trim()) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Validação do ano (usando sua função já existente)
  if (!validarAnoCompleto(anoInput, true)) {
    return;
  }

  // Validação da placa (usando sua função existente)
  if (!validarPlaca(placaInput)) {
    alert('Placa inválida! Formato correto: ABC-1D23');
    return;
  }

  // Validação do chassi (deve ter 17 caracteres)
  if (chassi.length !== 17) {
    alert('O chassi precisa ter exatamente 17 caracteres.');
    return;
  }

  // Tudo válido, executar a ação
  if (acao === 'gerar') {
    gerarPDF();
  } else if (acao === 'imprimir') {
    imprimirPDF();
  }
}