// script.js
document.querySelectorAll('input[type="text"]').forEach(input => {
  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const seq = parseInt(this.getAttribute('data-sequencia'), 10);
      if (!isNaN(seq)) {
        const proximo = document.querySelector(`input[data-sequencia="${seq + 1}"]`);
        if (proximo) proximo.focus();
        else this.blur();
      }
    }
  });
});


// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelectorAll('input[type="text"]').forEach(input => {
//     input.addEventListener('keydown', function(event) {
//       if (event.key === 'Enter') {
//         event.preventDefault();
//         const seq = parseInt(this.getAttribute('data-sequencia'), 10);
//         if (!isNaN(seq)) {
//           const proximo = document.querySelector(`input[data-sequencia="${seq + 1}"]`);
//           if (proximo) proximo.focus();
//           else this.blur();
//         }
//       }
//     });
//   });
// });
