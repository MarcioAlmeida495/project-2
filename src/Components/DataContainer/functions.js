function calcularTotal(texto) {
  var total = '0.00'; // Inicializando total como um número, não como uma string.
  var auxtext = texto.replaceAll(',', '.');
  const arr = auxtext.split(/[ ;\n]+/);

  arr.map((element) => {
    if (/[.,]/.test(element)) {
      var evalValue;
      try {
        console.log('ELEMENT: ', element);
        evalValue = eval(element);
        console.log('dps do Eval', evalValue);

      } catch (error) {
        evalValue = '0.00';
      }
      var elementValue = parseFloat(evalValue); // Converte o valor em float
      if (!isNaN(elementValue)) {
        total += ' + ' + elementValue; // Soma o valor diretamente ao total
        console.log(total);
      }
    }
  });
  console.log('TESTANDO EVAL', eval('0 + 10 * 5 + 2'));
  total = eval(total);
  console.log(`Total final: ${total}`);
  return total;
}
