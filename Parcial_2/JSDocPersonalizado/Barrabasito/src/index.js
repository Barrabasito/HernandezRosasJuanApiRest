const frases = [
    "La vida es como una bicicleta, para mantener el equilibrio debes seguir adelante. - Albert Einstein",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito. - Albert Schweitzer",
    "No cuentes los días, haz que los días cuenten. - Muhammad Ali",
    "La única forma de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
    "La vida es 10% lo que me sucede y 90% cómo reacciono ante ello. - Charles R. Swindoll"
  ];
  /**
   * Esta función regresa una frase
   * @param {*} indice posición de la frase
   * @returns retorna la frase mediante la posición recibida captada por el parámetro indice
   */
  function obtenerFrase(indice) {
    if (indice >= 0 && indice < frases.length) {
      return frases[indice];
    } else {
      return "Índice fuera de rango. Por favor, elige un índice válido.";
    }
  }
  
  const fraseObtenida = obtenerFrase(indice);
  console.log(fraseObtenida);