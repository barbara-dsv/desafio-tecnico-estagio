const quantityInput = document.getElementById('quantity');
const errorMessage = document.getElementById('errorMessage');
const generateBtn = document.getElementById('generateBtn');
const numbersDisplay = document.getElementById('numbersDisplay');
const averageValue = document.getElementById('averageValue');
const maxValue = document.getElementById('maxValue');
const minValue = document.getElementById('minValue');
const evenCount = document.getElementById('evenCount');
const oddCount = document.getElementById('oddCount');

// Organização do código em funções específicas para melhor manutenibilidade
// - Funções de validação e erro
// - Funções de geração e cálculo

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

// Validação da entrada do usuário
function validateInput(value) {
    // Limite de 10.000 para evitar travamento do navegador com arrays muito grandes
    if (isNaN(value) || value < 1 || value > 10000) {
        showError('Por favor, insira uma quantidade válida entre 1 e 10.000.');
        return false;
    }

    hideError();
    return true;
}
// Geração de números aleatórios
function generateRandomNumbers(quantity) {
    const numbers = [];
    for (let i = 0; i < quantity; i++) {
        // Gera números aleatórios entre 1 e 100 
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        numbers.push(randomNumber);
    }
    return numbers;
}
// Funções para análise estatística
function calculateAverage(numbers) {
    // Calcula a soma usando reduce (método mais moderno)
    const sum = numbers.reduce((acc, number) => acc + number, 0);
    return sum / numbers.length;
}

function findMaxNumber(numbers) {
    return Math.max(...numbers);
}

function findMinNumber(numbers) {
    return Math.min(...numbers);
}

function countEvenNumbers(numbers) {
    return numbers.filter(num => num % 2 === 0).length;
}

function countOddNumbers(numbers) {
    return numbers.filter(num => num % 2 !== 0).length;
}


generateBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);

    if (!validateInput(quantity)) {
        return;
    }
    try {
        const numbers = generateRandomNumbers(quantity);

        // Calcula as estatísticas
        const average = calculateAverage(numbers);
        const max = findMaxNumber(numbers);
        const min = findMinNumber(numbers);
        const even = countEvenNumbers(numbers);
        const odd = countOddNumbers(numbers);

        // Exibe os números gerados
        numbersDisplay.innerHTML = numbers
            .map(num => `<span class="number-item">${num}</span>`)
            .join('');

        // Atualiza as estatísticas na interface
        averageValue.textContent = average.toFixed(2);
        maxValue.textContent = max;
        minValue.textContent = min;
        evenCount.textContent = even;
        oddCount.textContent = odd;

    } catch (error) {
        console.error('Erro durante a geração e análise:', error);
        showError('Ocorreu um erro durante o processo. Tente novamente.');
    }
})