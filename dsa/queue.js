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

function updateFrontOfQueue() {
    const frontBox = document.querySelector('.sec1 .box');
    if (queue.length > 0) {
        frontBox.textContent = queue[0];
    } else {
        frontBox.textContent = ''; // Clear if queue is empty
    }
}

function updateLastPushedItem() {
    const lastPushedBox = document.querySelector('.sec2 .box');
    if (queue.length > 0) {
        lastPushedBox.textContent = queue[queue.length - 1];
    } else {
        lastPushedBox.textContent = ''; // Clear if queue is empty
    }
}

function updateLastPoppedItem() {
    const lastPoppedBox = document.querySelector('.sec3 .box');
    if (queue.length > 1) {
        lastPoppedBox.textContent = queue[1];
    } else {
        lastPoppedBox.textContent = ''; // Clear if queue has only one or no items
    }
}
