let array = [];
let comparisons = 0;
let swaps = 0;
let sortingSteps = [];
let isSorting = false;

function addNumber() {
    const input = document.getElementById('numberInput');
    const number = parseInt(input.value);
    if (!isNaN(number)) {
        array.push(number);
        input.value = '';
        updateArray(array.length - 1, 'new');
        addMessage(`Added number: ${number}`);
    }
}

function removeNumber() {
    if (array.length > 0) {
        const removed = array.pop();
        updateArray(array.length, 'remove');
        addMessage(`Removed number: ${removed}`);
    } else {
        addMessage("Array is empty. Cannot remove element.");
    }
}

function generateRandomArray() {
    const size = Math.floor(Math.random() * 10) + 5; // Random size between 5 and 14
    array = Array.from({length: size}, () => Math.floor(Math.random() * 100));
    updateArray();
    addMessage(`Generated random array: [${array.join(', ')}]`);
}

function clearArray() {
    array = [];
    updateArray();
    addMessage("Array cleared");
}

function updateArray(animateIndex = -1, animationType = '') {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach((num, index) => {
        const box = document.createElement('div');
        box.className = 'box';
        if (index === animateIndex) {
            box.classList.add(animationType);
        }
        box.textContent = num;
        container.appendChild(box);
    });
    document.getElementById('arraySize').textContent = array.length;
    resetStats();
}

function resetStats() {
    comparisons = 0;
    swaps = 0;
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
}

function runQuickSort() {
    if (array.length === 0) {
        addMessage("Array is empty. Please add numbers first.");
        return;
    }
    if (isSorting) {
        addMessage("Sorting is already in progress.");
        return;
    }
    
    addMessage(`Array before sorting: [${array.join(', ')}]`);
    comparisons = 0;
    swaps = 0;
    sortingSteps = [];
    isSorting = true;
    quickSort([...array], 0, array.length - 1);
    animateSorting();
}

function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    sortingSteps.push({type: 'pivot', index: high});

    for (let j = low; j <= high - 1; j++) {
        comparisons++;
        sortingSteps.push({type: 'compare', indices: [j, high]});
        
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            swaps++;
            sortingSteps.push({type: 'swap', indices: [i, j]});
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    sortingSteps.push({type: 'swap', indices: [i + 1, high]});
    
    return i + 1;
}

function animateSorting() {
    let step = 0;
    function animate() {
        if (step < sortingSteps.length) {
            const {type, index, indices} = sortingSteps[step];
            const boxes = document.querySelectorAll('.box');
            
            boxes.forEach(box => box.className = 'box');
            
            if (type === 'pivot') {
                boxes[index].classList.add('pivot');
            } else if (type === 'compare') {
                indices.forEach(i => boxes[i].classList.add('comparing'));
            } else if (type === 'swap') {
                indices.forEach(i => boxes[i].classList.add('swapping'));
                const [i, j] = indices;
                [array[i], array[j]] = [array[j], array[i]];
                updateArray();
            }
            
            document.getElementById('comparisons').textContent = comparisons;
            document.getElementById('swaps').textContent = swaps;
            
            step++;
            setTimeout(animate, 200);
        } else {
            isSorting = false;
            addMessage(`Array after sorting: [${array.join(', ')}]`);
            addMessage(`Sorting completed. Comparisons: ${comparisons}, Swaps: ${swaps}`);
        }
    }
    animate();
}

function addMessage(message) {
    const messageBox = document.getElementById('messageBox');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageBox.appendChild(messageElement);
    messageBox.scrollTop = messageBox.scrollHeight;
}

// Initialize
updateArray();