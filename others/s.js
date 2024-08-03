let array = [];
const arrayContainer = document.getElementById('arrayContainer');
const numberInput = document.getElementById('numberInput');
const arraySizeSpan = document.getElementById('arraySize');
const comparisonsSpan = document.getElementById('comparisons');
const swapsSpan = document.getElementById('swaps');


let comparisons = 0;
let swaps = 0;

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 2}px`;
        bar.title = value;
        arrayContainer.appendChild(bar);
    });
    arraySizeSpan.textContent = array.length;
}

function addNumber() {
    const value = parseInt(numberInput.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
        array.push(value);
        numberInput.value = '';
        renderArray();
    } else {
        alert('Please enter a valid number between 0 and 100');
    }
}

function generateRandomArray() {
    array = Array.from({length: 20}, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
}

function clearArray() {
    array = [];
    renderArray();
    resetStats();
}

function resetStats() {
    comparisons = 0;
    swaps = 0;
    updateStats();
}

function updateStats() {
    comparisonsSpan.textContent = comparisons;
    swapsSpan.textContent = swaps;
}

async function selectionSort() {
    resetStats();
    const bars = arrayContainer.children;
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = '#e74c3c';
        
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = '#f39c12';
            await new Promise(resolve => setTimeout(resolve, 50));
            
            comparisons++;
            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = '#3498db';
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = '#2ecc71';
            } else {
                bars[j].style.backgroundColor = '#3498db';
            }
            updateStats();
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            [bars[i].style.height, bars[minIndex].style.height] = [bars[minIndex].style.height, bars[i].style.height];
            [bars[i].title, bars[minIndex].title] = [bars[minIndex].title, bars[i].title];
            swaps++;
        }
        
        bars[i].style.backgroundColor = '#2ecc71';
        updateStats();
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    bars[array.length - 1].style.backgroundColor = '#2ecc71';
}

function runSelectionSort() {
    if (array.length > 0) {
        selectionSort();
    } else {
        alert('Please add numbers to the array first');
    }
}

numberInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addNumber();
    }
});

function showMessage(message, type = 'info') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = type;
    messageBox.style.display = 'block';
}

function hideMessage() {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'none';
}

// ... existing code ...

function updateMessageContainer(message) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = message;
}

function arrayToString(arr) {
    return arr.join(', ');
}

function addNumber() {
    const value = parseInt(numberInput.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
        array.push(value);
        numberInput.value = '';
        renderArray();
        updateMessageContainer(`Current array: ${arrayToString(array)}`);
    } else {
        alert('Please enter a valid number between 0 and 100');
    }
}

function generateRandomArray() {
    array = Array.from({length: 20}, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
    updateMessageContainer(`Generated array: ${arrayToString(array)}`);
}

function clearArray() {
    array = [];
    renderArray();
    resetStats();
    updateMessageContainer('Array cleared');
}

async function selectionSort() {
    resetStats();
    const bars = arrayContainer.children;
    const originalArray = [...array];
    updateMessageContainer(`Array before sorting: ${arrayToString(originalArray)}`);

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = '#e74c3c';
        
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = '#f39c12';
            await new Promise(resolve => setTimeout(resolve, 50));
            
            comparisons++;
            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = '#3498db';
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = '#2ecc71';
            } else {
                bars[j].style.backgroundColor = '#3498db';
            }
            updateStats();
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            [bars[i].style.height, bars[minIndex].style.height] = [bars[minIndex].style.height, bars[i].style.height];
            [bars[i].title, bars[minIndex].title] = [bars[minIndex].title, bars[i].title];
            swaps++;
        }
        
        bars[i].style.backgroundColor = '#2ecc71';
        updateStats();
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    bars[array.length - 1].style.backgroundColor = '#2ecc71';
    
    updateMessageContainer(`Array before sorting: ${arrayToString(originalArray)}\nArray after sorting: ${arrayToString(array)}`);
}

function runSelectionSort() {
    if (array.length > 0) {
        selectionSort();
    } else {
        alert('Please add numbers to the array first');
        updateMessageContainer('No array to sort. Please add numbers first.');
    }
}


generateRandomArray();