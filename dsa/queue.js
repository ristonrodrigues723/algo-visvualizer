// queue.js
const queue = [];

function pushToQueue() {
    const inputNumber = document.getElementById('inputNumber').value;
    if (inputNumber && !isNaN(inputNumber)) {
        queue.push(inputNumber);
        updateQueueDisplay();
    } else {
        alert('Please enter a valid number.');
    }
}

function popFromQueue() {
    if (queue.length > 0) {
        queue.shift();
        updateQueueDisplay();
    }
}

function clearQueue() {
    queue.length = 0; // Clear the entire queue
    updateQueueDisplay();
}

function updateQueueDisplay() {
    const queueDisplay = document.getElementById('queueDisplay');
    queueDisplay.innerHTML = '';

    queue.forEach((item) => {
        const queueItem = document.createElement('div');
        queueItem.classList.add('queue-item');
        queueItem.textContent = item;
        queueDisplay.appendChild(queueItem);
    });

    const queueSize = document.createElement('div');
    queueSize.textContent = `Queue Size: ${queue.length}`;
    queueDisplay.appendChild(queueSize);
}
