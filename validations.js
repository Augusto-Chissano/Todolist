/**
 * Aqui estão alguns métodos essenciais que podem ser usados para realizar validações em JavaScript:

1. `typeof`: Verifica o tipo de uma variável. Pode ser útil para validar se uma variável é do tipo esperado, por exemplo, `typeof valor === 'string'`.

2. `isNaN`: Verifica se um valor não é um número. Retorna `true` se o valor não for um número e `false` se for um número válido.

3. `Number.isInteger`: Verifica se um número é um número inteiro. Retorna `true` se for um número inteiro e `false` caso contrário.

4. `Array.isArray`: Verifica se um valor é um array. Retorna `true` se for um array e `false` caso contrário.

5. `String.prototype.length`: Retorna o número de caracteres em uma string. Pode ser usado para validar o comprimento de uma string.

6. `String.prototype.trim`: Remove espaços em branco do início e do final de uma string. É útil para validar se uma string está vazia após a remoção dos espaços.

7. `String.prototype.includes`: Verifica se uma string contém outra string. Pode ser usado para verificar se um determinado valor ou padrão está presente em uma string.

8. `RegExp.prototype.test`: Verifica se uma string corresponde a um padrão definido por uma expressão regular. Pode ser usado para validar formatos, como endereços de e-mail, números de telefone, etc.

9. `Object.prototype.hasOwnProperty`: Verifica se um objeto possui uma determinada propriedade. Pode ser usado para validar a existência de propriedades em um objeto.

10. `Date.prototype.getTime`: Retorna o valor numérico correspondente à data. Pode ser usado para comparar datas ou validar se uma data é válida.

Esses são apenas alguns exemplos de métodos que podem ser úteis para validações em JavaScript. A escolha dos métodos depende do tipo de validação específica que você precisa realizar.
 */


function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function isURL(value) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(value);
}

function isLength(value, min, max) {
    const length = value.length;
    return length >= min && length <= max;
}





