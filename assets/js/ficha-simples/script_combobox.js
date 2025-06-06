
  const selects = document.querySelectorAll('.color-select');

  function atualizarOpcoes() {
    // Pega todas as cores selecionadas (excluindo vazio)
    const selecionadas = Array.from(selects)
      .map(s => s.value)
      .filter(val => val !== "");

    selects.forEach(select => {
      const valorAtual = select.value;

      Array.from(select.options).forEach(option => {
        // Sempre habilita a opção se ela for o valor atual do select (pra não travar a seleção)
        if (option.value === valorAtual) {
          option.disabled = false;
          return;
        }

        // Se a opção estiver selecionada em outro select, desabilita
        if (selecionadas.includes(option.value)) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
      });
    });
  }

  // Atualiza as opções ao mudar qualquer select
  selects.forEach(select => {
    select.addEventListener('change', atualizarOpcoes);
  });

  // Inicializa
  atualizarOpcoes();




//  Codigo no Head

// script_combobox.js
// document.addEventListener('DOMContentLoaded', function () {
//   const selects = document.querySelectorAll('.color-select');

//   function atualizarOpcoes() {
//     const selecionadas = Array.from(selects)
//       .map(s => s.value)
//       .filter(val => val !== "");

//     selects.forEach(select => {
//       const valorAtual = select.value;

//       Array.from(select.options).forEach(option => {
//         if (option.value === valorAtual) {
//           option.disabled = false;
//         } else {
//           option.disabled = selecionadas.includes(option.value);
//         }
//       });
//     });
//   }

//   selects.forEach(select => {
//     select.addEventListener('change', atualizarOpcoes);
//   });

//   atualizarOpcoes(); // chamada inicial
// });
