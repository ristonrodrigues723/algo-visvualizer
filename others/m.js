let array = [];
let arrayContainer = document.getElementById('array-container');
let messagesContainer = document.getElementById('messages');
let sortingProcess = null;
let isSorting = false;

function generateArray() {
    const size = parseInt(document.getElementById('arraySize').value);
    array = Array.from({length: size}, () => Math.floor(Math.random() * 100) + 1);
    updateArrayDisplay();
    addMessage("Generated new array: " + array.join(', '));
    resetSortingControls();
}

function updateArrayDisplay() {
    arrayContainer.innerHTML = '';
    const maxValue = Math.max(...array);
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value / maxValue) * 280}px`;
        bar.id = `bar-${index}`;
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = value;
        
        bar.appendChild(label);
        arrayContainer.appendChild(bar);
    });
}

function addMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addElement() {
    const newValue = Math.floor(Math.random() * 100) + 1;
    array.push(newValue);
    updateArrayDisplay();
    addMessage(`Added element: ${newValue}`);
    resetSortingControls();
}

function removeElement() {
    if (array.length > 0) {
        const removedValue = array.pop();
        updateArrayDisplay();
        addMessage(`Removed element: ${removedValue}`);
        resetSortingControls();
    } else {
        addMessage("Cannot remove element from an empty array.");
    }
}

async function startSort() {
    if (!isSorting) {
        isSorting = true;
        messagesContainer.innerHTML = '';
        sortingProcess = mergeSort(0, array.length - 1);
        document.getElementById('stepButton').disabled = false;
        document.getElementById('removeStepButton').disabled = false;
        await runSort();
    }
}

async function runSort() {
    while (isSorting) {
        const result = await sortingProcess.next();
        if (result.done) {
            addMessage("Sorting completed!");
            resetSortingControls();
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

async function stepSort() {
    if (sortingProcess) {
        const result = await sortingProcess.next();
        if (result.done) {
            addMessage("Sorting completed!");
            resetSortingControls();
        }
    }
}

function removeStep() {
    if (isSorting) {
        isSorting = false;
        addMessage("Sorting process stopped.");
        resetSortingControls();
    }
}

function resetSortingControls() {
    isSorting = false;
    sortingProcess = null;
    document.getElementById('stepButton').disabled = true;
    document.getElementById('removeStepButton').disabled = true;
    document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.remove('highlight', 'sorted');
    });
}

async function* mergeSort(left, right) {
    if (left >= right) {
        return;
    }
    const mid = Math.floor((left + right) / 2);
    yield* mergeSort(left, mid);
    yield* mergeSort(mid + 1, right);
    yield* merge(left, mid, right);
}

async function* merge(left, mid, right) {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    
    while (i < leftArray.length && j < rightArray.length) {
        highlightBars([left + i, mid + 1 + j]);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        updateBar(k, array[k]);
        k++;
        yield;
    }
    
    while (i < leftArray.length) {
        array[k] = leftArray[i];
        updateBar(k, array[k]);
        i++;
        k++;
        yield;
    }
    
    while (j < rightArray.length) {
        array[k] = rightArray[j];
        updateBar(k, array[k]);
        j++;
        k++;
        yield;
    }
    
    for (let index = left; index <= right; index++) {
        document.getElementById(`bar-${index}`).classList.add('sorted');
    }
    
    addMessage(`Merged: ${array.slice(left, right + 1).join(', ')}`);
}

function highlightBars(indices) {
    document.querySelectorAll('.bar').forEach(bar => bar.classList.remove('highlight'));
    indices.forEach(index => {
        document.getElementById(`bar-${index}`).classList.add('highlight');
    });
}

function updateBar(index, value) {
    const bar = document.getElementById(`bar-${index}`);
    const maxValue = Math.max(...array);
    bar.style.height = `${(value / maxValue) * 280}px`;
    bar.querySelector('.bar-label').textContent = value;
    bar.classList.add('highlight');
    setTimeout(() => bar.classList.remove('highlight'), 300);
}

generateArray();