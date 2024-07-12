const queue = [];
let lastPoppedItem;

function pushToQueue() {
    const inputNumber = document.getElementById('inputNumber').value;
    if (inputNumber && !isNaN(inputNumber)) {
        queue.push(inputNumber);
        updateQueueDisplay();
        displayMessage(`Number ${inputNumber} was pushed to the queue.`);
    } else {
        displayMessage('Please enter a valid number.');
    }
    document.getElementById('inputNumber').value = ''; // Clear input after push
}

function popFromQueue() {
    if (queue.length > 0) {
        lastPoppedItem = queue.shift();
        updateQueueDisplay();
        displayMessage(`Number ${lastPoppedItem} was popped from the queue.`);
    } else {
        displayMessage("Queue is empty. Nothing to pop.");
    }
}

function clearQueue() {
    queue.length = 0;
    lastPoppedItem = undefined;
    updateQueueDisplay();
    displayMessage("Queue has been cleared.");
}

function displayMessage(message) {
    const messageBox = document.querySelector('.massage-box');
    if (messageBox) {
        const messageElement = messageBox.querySelector('.massage');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
}

function updateQueueDisplay() {
    const queueDisplay = document.getElementById("queueDisplay");
    if (queueDisplay) {
        queueDisplay.innerHTML = "";
        for (const item of queue) {
            const queueItem = document.createElement('div');
            queueItem.classList.add('queue-item');
            queueItem.textContent = item;
            queueDisplay.appendChild(queueItem);
        }
    }

    updateButtonText(".sec1 button", queue.length > 0 ? queue[0] : "Empty");
    updateButtonText(".sec2 button", queue.length > 0 ? queue[queue.length - 1] : "Empty");
    updateButtonText(".sec3 button", lastPoppedItem !== undefined ? lastPoppedItem : "Not Available");
    updateButtonText(".sec4 button", queue.length.toString()); // Changed to .sec4
}

function updateButtonText(selector, text) {
    const button = document.querySelector(selector);
    if (button) {
        button.textContent = text;
    } else {
        console.error(`Button not found for selector: ${selector}`);
    }
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Call updateQueueDisplay when the page loads
document.addEventListener('DOMContentLoaded', updateQueueDisplay);