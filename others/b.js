let array = [];
let sorting = false;

const arrayContainer = document.getElementById('array-container');
const messageBox = document.getElementById('message-box');
const numberInput = document.getElementById('numberInput');
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const sortBtn = document.getElementById('sortBtn');
const speedSlider = document.getElementById('speedSlider');

function setMessage(msg) {
    messageBox.textContent = msg;
}

function updateArrayDisplay() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        arrayContainer.appendChild(bar);
    });
}

function generateRandomArray() {
    array = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 1);
    updateArrayDisplay();
    setMessage('Random array generated');
}

function addElement() {
    const num = parseInt(numberInput.value);
    if (!isNaN(num) && num > 0 && num <= 100) {
        array.push(num);
        updateArrayDisplay();
        numberInput.value = '';
        setMessage(`Added ${num} to the array`);
    } else {
        setMessage('Please enter a valid number between 1 and 100');
    }
}

function removeElement() {
    if (array.length > 0) {
        array.pop();
        updateArrayDisplay();
        setMessage('Removed last element from the array');
    } else {
        setMessage('Array is already empty');
    }
}

function clearArray() {
    array = [];
    updateArrayDisplay();
    setMessage('Array cleared');
}

async function bubbleSort() {
    sorting = true;
    setControlsEnabled(false);
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                updateArrayDisplay();
                setMessage(`Comparing ${array[j]} and ${array[j+1]}`);
                await new Promise(resolve => setTimeout(resolve, 101 - speedSlider.value));
            }
        }
    }
    
    sorting = false;
    setControlsEnabled(true);
    setMessage('Sorting complete');
}

function setControlsEnabled(enabled) {
    addBtn.disabled = !enabled;
    removeBtn.disabled = !enabled;
    generateBtn.disabled = !enabled;
    clearBtn.disabled = !enabled;
    sortBtn.disabled = !enabled;
    numberInput.disabled = !enabled;
}

// Event listeners
addBtn.addEventListener('click', addElement);
removeBtn.addEventListener('click', removeElement);
generateBtn.addEventListener('click', generateRandomArray);
clearBtn.addEventListener('click', clearArray);
sortBtn.addEventListener('click', bubbleSort);

// Initialize
generateRandomArray();