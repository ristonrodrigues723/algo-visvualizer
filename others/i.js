let array = [];
let sortingInterval;
let isSorting = false;
let isPaused = false;
let currentIndex = 1;
let comparisons = 0;
let swaps = 0;

const arrayContainer = document.getElementById('array-container');
const comparisonsElement = document.getElementById('comparisons');
const swapsElement = document.getElementById('swaps');
const pauseButton = document.getElementById('pauseButton');
const currentStateElement = document.getElementById('currentState');
const messagesElement = document.getElementById('messages');

function generateArray() {
    resetSort();
    const size = parseInt(document.getElementById('arraySize').value);
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
    addMessage(`Generated new array: [${array.join(', ')}]`);
}

function displayArray() {
    arrayContainer.innerHTML = '';
    const maxValue = Math.max(...array);
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value / maxValue) * 280}px`;
        bar.setAttribute('data-value', value);
        arrayContainer.appendChild(bar);
    });
}

function addElement() {
    if (!isSorting) {
        const newElementInput = document.getElementById('newElement');
        const newValue = parseInt(newElementInput.value);
        if (newValue >= 1 && newValue <= 100) {
            array.push(newValue);
            displayArray();
            addMessage(`Added element: ${newValue}`);
            newElementInput.value = '';
        } else {
            addMessage('Please enter a number between 1 and 100');
        }
    }
}

function removeElement() {
    if (!isSorting && array.length > 0) {
        const removedElement = array.pop();
        displayArray();
        addMessage(`Removed element: ${removedElement}`);
    }
}

function startSort() {
    if (!isSorting) {
        isSorting = true;
        pauseButton.disabled = false;
        addMessage(`Array before sorting: [${array.join(', ')}]`);
        sortingInterval = setInterval(sortStep, getSpeed());
        updateCurrentState("Sorting");
    } else if (isPaused) {
        isPaused = false;
        pauseButton.textContent = 'Pause';
        sortingInterval = setInterval(sortStep, getSpeed());
        updateCurrentState("Sorting");
    }
}

function pauseSort() {
    if (isSorting && !isPaused) {
        clearInterval(sortingInterval);
        isPaused = true;
        pauseButton.textContent = 'Resume';
        updateCurrentState("Paused");
    } else {
        startSort();
    }
}

function resetSort() {
    clearInterval(sortingInterval);
    isSorting = false;
    isPaused = false;
    currentIndex = 1;
    comparisons = 0;
    swaps = 0;
    updateInfo();
    pauseButton.disabled = true;
    pauseButton.textContent = 'Pause';
    displayArray();
    updateCurrentState("Reset");
}

function sortStep() {
    if (currentIndex >= array.length) {
        clearInterval(sortingInterval);
        isSorting = false;
        pauseButton.disabled = true;
        updateCurrentState("Sorting completed");
        addMessage(`Array after sorting: [${array.join(', ')}]`);
        return;
    }

    const key = array[currentIndex];
    let j = currentIndex - 1;

    comparisons++;
    updateInfo();

    const bars = document.getElementsByClassName('bar');
    bars[currentIndex].style.backgroundColor = '#e74c3c';

    while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = bars[j].style.height;
        bars[j + 1].setAttribute('data-value', array[j]);
        bars[j].style.backgroundColor = '#e74c3c';
        j--;
        swaps++;
        updateInfo();
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${(key / Math.max(...array)) * 280}px`;
    bars[j + 1].setAttribute('data-value', key);

    setTimeout(() => {
        for (let k = 0; k <= currentIndex; k++) {
            bars[k].style.backgroundColor = '#3498db';
        }
    }, getSpeed() - 50);

    currentIndex++;
}

function getSpeed() {
    return 1000 - document.getElementById('sortSpeed').value * 9;
}

function updateInfo() {
    comparisonsElement.textContent = comparisons;
    swapsElement.textContent = swaps;
}

function updateCurrentState(state) {
    currentStateElement.textContent = state;
}

function addMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesElement.insertBefore(messageElement, messagesElement.firstChild);
    if (messagesElement.childElementCount > 5) {
        messagesElement.removeChild(messagesElement.lastChild);
    }
}

generateArray();