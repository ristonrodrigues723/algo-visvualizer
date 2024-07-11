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
  queue.length = 0; // Clear the entire queue
  updateQueueDisplay();
}

function displayMessage(message) {
  const messageBox = document.querySelector('.message-box');
  const messageElement = messageBox.querySelector('.message');
  messageElement.textContent = message; // Update the message content
}

function updateQueueDisplay() {
  const queueDisplay = document.getElementById("queueDisplay");
  queueDisplay.innerHTML = ""; // Clear previous queue contents

  // Display each element in the queue
 
}


function updateQueueDisplay() {
  const queueDisplay = document.getElementById("queueDisplay");
  if (queueDisplay) { // Check if element exists
    queueDisplay.innerHTML = ""; // Clear previous queue contents

    for (const item of queue) {
      const queueItem = document.createElement('div');
      queueItem.classList.add('queue-item');
      queueItem.textContent = item;
      queueDisplay.appendChild(queueItem);
    }
  
    // Update "Front of Queue" and "Last Pushed Item" displays
    const frontOfQueue = document.querySelector(".sec1 button");
    frontOfQueue.textContent = queue.length > 0 ? queue[0] : "Empty";
  
    const lastPushedItem = document.querySelector(".sec2 button");
    lastPushedItem.textContent = queue.length > 0 ? queue[queue.length - 1] : "Empty";
  
    // Update "Last Popped Item" display
    const lastPoppedItemButton = document.querySelector(".sec3 button");
    lastPoppedItemButton.textContent = lastPoppedItem !== undefined ? lastPoppedItem : "Not Available";
  
    // Update "Size of the Queue" display
    const queueSize = document.querySelector(".sec4 button"); // Assuming the button has class "sec4"
    queueSize.textContent = queue.length;
  } else {
    console.error("queueDisplay element not found!");
  }
}
