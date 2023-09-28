// Elementos HTML
const monitor = document.getElementById("monitor");
const buttons = document.querySelectorAll(".button");

// Variáveis para acompanhar o estado da calculadora
let input = "";
let resultado = null; // Inicializamos resultado como null
let operacaoPendente = null;

// Adicionar event listeners para os botões
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const valor = button.textContent;

    // Lógica para botões numéricos e operadores
    if (!isNaN(valor) || valor === "." || valor === "+" || valor === "-" || valor === "*" || valor === "/") {
      input += valor;
      monitor.textContent = input;
    }
    // Lógica para o botão "C" (Clear)
    else if (valor === "CE") {
      input = "";
      monitor.textContent = "";
    }
    // Lógica para o botão "AC" (Clear All)
    else if (valor === "AC") {
      input = "";
      resultado = null;
      operacaoPendente = null;
      monitor.textContent = "";
    }
    // Lógica para o botão "=" (Igual)
    else if (valor === "=") {
      try {
        if (resultado === null) {
          resultado = eval(input);
        } else {
          resultado = eval(resultado + operacaoPendente + input);
        }

        // Exibir o resultado no monitor
        monitor.textContent = resultado;

        input = ""; // Limpar a entrada
        operacaoPendente = null;
      } catch (error) {
        monitor.textContent = "Erro";
      }
    }
    // Lógica para o botão "%" (Porcentagem)
    else if (valor === "%") {
      try {
        if (resultado === null) {
          resultado = eval(input) / 100;
        } else {
          resultado = eval(resultado + operacaoPendente + (eval(input) / 100));
        }

        // Exibir o resultado no monitor
        monitor.textContent = resultado;

        input = ""; // Limpar a entrada
        operacaoPendente = null;
      } catch (error) {
        monitor.textContent = "Erro";
      }
    }
    // Lógica para operadores
    else {
      if (operacaoPendente !== null) {
        // Se já houver uma operação pendente, calcule o resultado antes de continuar
        try {
          if (resultado === null) {
            resultado = eval(input);
          } else {
            resultado = eval(resultado + operacaoPendente + input);
          }

          // Exibir o resultado no monitor
          monitor.textContent = resultado;

          input = ""; // Limpar a entrada
          operacaoPendente = valor;
        } catch (error) {
          monitor.textContent = "Erro";
        }
      } else {
        // Se não houver operação pendente, defina a operação pendente e atualize a entrada
        operacaoPendente = valor;
        resultadoAnterior = input;
        input = "";
      }
    }
  });
});