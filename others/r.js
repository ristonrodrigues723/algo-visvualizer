let array = [170, 45, 75, 90, 802, 24, 2, 66];
let sortingSpeed = 50;
let sortingSteps = [];
let currentStep = -1;
const container = document.getElementById('array-container');
const messageBox = document.getElementById('message-box');

function addElement() {
    const input = document.getElementById('number-input');
    const num = parseInt(input.value.trim());
    if (!isNaN(num)) {
        array.push(num);
        input.value = '';
        reset();
        updateMessageBox(`Added element: ${num}`);
    }
}

function removeElement() {
    if (array.length > 0) {
        const removed = array.pop();
        reset();
        updateMessageBox(`Removed element: ${removed}`);
    }
}

function generateRandomArray() {
    const size = Math.floor(Math.random() * 10) + 5; // 5 to 14 elements
    array = Array.from({length: size}, () => Math.floor(Math.random() * 900) + 100); // 100 to 999
    reset();
    updateMessageBox(`Generated random array: [${array.join(', ')}]`);
}

function clearArray() {
    array = [];
    reset();
    updateMessageBox('Array cleared');
}

function createBars() {
    container.innerHTML = '';
    const maxNum = Math.max(...array, 1);
    array.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(num / maxNum) * 280}px`;
        bar.textContent = num;
        bar.style.order = index;
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function radixSort() {
    updateMessageBox('Starting Radix Sort...');
    sortingSteps = [array.slice()];
    const max = Math.max(...array);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        await countingSort(exp);
        exp *= 10;
        await sleep(2000 - sortingSpeed * 19);
    }
    updateMessageBox('Sorting completed!');
}

async function countingSort(exp) {
    const output = new Array(array.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[Math.floor(array[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
        count[Math.floor(array[i] / exp) % 10]--;
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
        sortingSteps.push(array.slice());
        await sleep(2000 - sortingSpeed * 19);
        updateBars();
    }

    updateMessageBox(`Sorted by ${exp}'s place`);
}

function updateBars() {
    const bars = document.querySelectorAll('.bar');
    const maxNum = Math.max(...array);
    bars.forEach((bar, index) => {
        bar.style.height = `${(array[index] / maxNum) * 280}px`;
        bar.textContent = array[index];
        bar.style.order = index;
        bar.classList.add('highlight');
        setTimeout(() => bar.classList.remove('highlight'), 300);
    });
}

function startSort() {
    radixSort();
    document.getElementById('step-forward').disabled = false;
    document.getElementById('step-back').disabled = true;
}

function reset() {
    createBars();
    sortingSteps = [];
    currentStep = -1;
    document.getElementById('step-forward').disabled = false;
    document.getElementById('step-back').disabled = true;
    updateMessageBox('Array reset');
}

function stepForward() {
    if (currentStep < sortingSteps.length - 1) {
        currentStep++;
        array = sortingSteps[currentStep].slice();
        updateBars();
        document.getElementById('step-back').disabled = false;
        if (currentStep === sortingSteps.length - 1) {
            document.getElementById('step-forward').disabled = true;
        }
        updateMessageBox(`Step ${currentStep + 1} of ${sortingSteps.length}`);
    }
}

function stepBackward() {
    if (currentStep > 0) {
        currentStep--;
        array = sortingSteps[currentStep].slice();
        updateBars();
        document.getElementById('step-forward').disabled = false;
        if (currentStep === 0) {
            document.getElementById('step-back').disabled = true;
        }
        updateMessageBox(`Step ${currentStep + 1} of ${sortingSteps.length}`);
    }
}

function updateMessageBox(message) {
    messageBox.textContent = message;
}

document.getElementById('speed-slider').addEventListener('input', function() {
    sortingSpeed = this.value;
});

reset();