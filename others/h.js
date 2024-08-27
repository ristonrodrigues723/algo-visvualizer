let heap = [];
let sortingIndex;
let sorting = false;
let comparisons = 0;
let swaps = 0;

function generateRandomNumbers() {
    const size = parseInt(document.getElementById('arraySize').value);
    if (size < 5 || size > 20) {
        addMessage("Please enter a size between 5 and 20");
        return;
    }
    heap = Array.from({length: size}, () => Math.floor(Math.random() * 100) + 1);
    resetStats();
    buildMaxHeap();
    visualizeHeap();
    updateButtons(true, true, true);
    addMessage("Random numbers generated and max heap built. Ready to sort!");
}

function initializeHeap() {
    buildMaxHeap();
    visualizeHeap();
    updateButtons(true, true, true);
    addMessage("Max heap built. Ready to sort!");
}

function buildMaxHeap() {
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        heapify(heap.length, i);
    }
}

function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    comparisons += 2;
    if (left < n && heap[left] > heap[largest]) {
        largest = left;
    }

    if (right < n && heap[right] > heap[largest]) {
        largest = right;
    }

    if (largest !== i) {
        swaps++;
        [heap[i], heap[largest]] = [heap[largest], heap[i]];
        heapify(n, largest);
    }
}

function startSort() {
    sorting = true;
    sortingIndex = heap.length - 1;
    updateButtons(false, false, true);
    sortStep();
}

function sortStep() {
    if (sortingIndex > 0) {
        swaps++;
        [heap[0], heap[sortingIndex]] = [heap[sortingIndex], heap[0]];
        heapify(sortingIndex, 0);
        sortingIndex--;
        visualizeHeap();
        addMessage(`Swapped largest element (${heap[sortingIndex + 1]}) with last unsorted element. Heapifying remaining elements.`);
        updateStats();
        setTimeout(sortStep, 1000); // Continue sorting after 1 second
    } else {
        sorting = false;
        updateButtons(false, true, true);
        addMessage("Heap sort completed!");
    }
}

function visualizeHeap() {
    const barContainer = document.getElementById('bar-container');
    const numberContainer = document.getElementById('number-container');
    barContainer.innerHTML = '';
    numberContainer.innerHTML = '';

    const maxValue = Math.max(...heap);
    
    heap.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        const height = (value / maxValue) * 280;
        bar.style.height = `${height}px`;
        
        if (sorting && index > sortingIndex) {
            bar.style.backgroundColor = '#2ecc71';
        } else if (index === 0 && sorting) {
            bar.style.backgroundColor = '#e74c3c';
        }
        
        barContainer.appendChild(bar);

        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = value;
        numberContainer.appendChild(number);
    });
}

function updateButtons(sortEnabled, addRemoveEnabled, resetEnabled) {
    document.getElementById('sortButton').disabled = !sortEnabled;
    document.getElementById('addButton').disabled = !addRemoveEnabled;
    document.getElementById('removeButton').disabled = !addRemoveEnabled;
    document.getElementById('resetButton').disabled = !resetEnabled;
}

function addMessage(text) {
    const messageList = document.getElementById('messageList');
    const message = document.createElement('p');
    message.textContent = text;
    messageList.appendChild(message);
    messageList.scrollTop = messageList.scrollHeight;
}

function updateStats() {
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
}

function resetStats() {
    comparisons = 0;
    swaps = 0;
    updateStats();
}

function reset() {
    heap = [];
    sorting = false;
    resetStats();
    document.getElementById('bar-container').innerHTML = '';
    document.getElementById('number-container').innerHTML = '';
    document.getElementById('messageList').innerHTML = '';
    updateButtons(false, true, false);
    addMessage('Heap reset. Ready for new input.');
}

function addNumber() {
    if (sorting) return;
    const newNumber = parseInt(document.getElementById('newNumber').value);
    if (isNaN(newNumber)) {
        addMessage("Please enter a valid number");
        return;
    }
    if (heap.length >= 20) {
        addMessage("Maximum array size reached (20)");
        return;
    }
    heap.push(newNumber);
    buildMaxHeap();
    visualizeHeap();
    addMessage(`Number ${newNumber} added and heap rebuilt`);
    document.getElementById('newNumber').value = '';
}

function removeNumber() {
    if (sorting) return;
    if (heap.length <= 5) {
        addMessage("Minimum array size reached (5)");
        return;
    }
    const removedNumber = heap.pop();
    buildMaxHeap();
    visualizeHeap();
    addMessage(`Number ${removedNumber} removed and heap rebuilt`);
}


