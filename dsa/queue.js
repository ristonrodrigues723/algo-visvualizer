const queue = [];
let lastPoppedItem;

function pushToQueue() {
    const inputNumber = document.getElementById('inputNumber').value;
    if (inputNumber && !isNaN(inputNumber)) {
        queue.push(inputNumber);
        updateQueueDisplay();
    } else {
        displayMessage('Please enter a valid number.');
    }
}

function popFromQueue() {
    if (queue.length > 0) {
        lastPoppedItem = queue.shift();
        updateQueueDisplay();
    } else {
        displayMessage("Queue is empty. Nothing to pop.");
    }
}

function clearQueue() {
    queue.length = 0;
    lastPoppedItem = undefined;
    updateQueueDisplay();
}

function displayMessage(message) {
    const messageBox = document.querySelector('.massage-box');
    const messageElement = messageBox.querySelector('.massage');
    messageElement.textContent = message;
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

        const frontOfQueue = document.querySelector(".sec1 button");
        frontOfQueue.textContent = queue.length > 0 ? queue[0] : "Empty";

        const lastPushedItem = document.querySelector(".sec2 button");
        lastPushedItem.textContent = queue.length > 0 ? queue[queue.length - 1] : "Empty";

        const lastPoppedItemButton = document.querySelector(".sec3 button");
        lastPoppedItemButton.textContent = lastPoppedItem !== undefined ? lastPoppedItem : "Not Available";

        const queueSizeButton = document.querySelector(".sec3:last-of-type button");
        queueSizeButton.textContent = queue.length.toString();
    } else {
        console.error("queueDisplay element not found!");
    }
}

// Call updateQueueDisplay when the page loads
document.addEventListener('DOMContentLoaded', updateQueueDisplay);