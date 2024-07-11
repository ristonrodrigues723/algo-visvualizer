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


function updateQueueDisplay() {
    const queueDisplay = document.getElementById("queueDisplay");
    queueDisplay.innerHTML = ""; // Clear previous queue contents
  
    // Display each element in the queue
    for (const item of queue) {
      const queueItem = document.createElement("div");
      queueItem.classList.add("queue-item");
      queueItem.textContent = item;
      queueDisplay.appendChild(queueItem);
    }
  
    // Update "Front of Queue" and "Last Pushed Item" displays
    const frontOfQueue = document.querySelector(".sec1 button");
    frontOfQueue.textContent = queue.length > 0 ? queue[0] : "Empty"; // Display front item or "Empty"
  
    const lastPushedItem = document.querySelector(".sec2 button");
    lastPushedItem.textContent = queue.length > 0 ? queue[queue.length - 1] : "Empty"; // Display last pushed item or "Empty"
  
   // Update "Last Popped Item" display
  const lastPoppedItemButton = document.querySelector(".sec3 button");
  lastPoppedItemButton.textContent = lastPoppedItem !== undefined ? lastPoppedItem : "Not Available";

  // Update "Size of the Queue" display
  const queueSize = document.querySelector(".sec4 button"); // Assuming the button has class "sec4"
  queueSize.textContent = queue.length;
    lastPoppedItem.textContent = poppedItem !== undefined ? poppedItem : "Not Available";
  // Directly display the queue length
  }


let lastPoppedItem; 

function updateQueueDisplay() {
  const queueDisplay = document.getElementById("queueDisplay");
  queueDisplay.innerHTML = ""; // Clear previous queue contents

  // Display each element in the queue
  for (const item of queue) {
    const queueItem = document.createElement("div");
    queueItem.classList.add("queue-item");
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
}

function popFromQueue() {
  if (queue.length > 0) {
    lastPoppedItem = queue.shift(); // Store the popped item and remove it from the queue
    updateQueueDisplay();
  } else {
    displayMessage("Queue is empty. Nothing to pop.");
  }
}



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

function updateQueueDisplay() {
  const queueDisplay = document.getElementById('queueDisplay');
  queueDisplay.innerHTML = ''; // Clear previous queue contents

  // Display each element in the queue
  for (const item of queue) {
    const queueItem = document.createElement('div');
    queueItem.classList.add('queue-item');
    queueItem.textContent = item;
    queueDisplay.appendChild(queueItem);
  }

  // Update "Front of Queue" and "Last Pushed Item" displays
  const frontOfQueue = document.querySelector(".sec1 button");
  frontOfQueue.textContent = queue.length > 0 ? queue[0] : "Empty"; // Display front item or "Empty"

  const lastPushedItem = document.querySelector(".sec2 button");
  lastPushedItem.textContent = queue.length > 0 ? queue[queue.length - 1] : "Empty"; // Display last pushed item or "Empty"

  // Update "Last Popped Item" display
  const lastPoppedItemButton = document.querySelector(".sec3 button");
  lastPoppedItemButton.textContent = lastPoppedItem !== undefined ? lastPoppedItem : "Not Available";

  // Update "Size of the Queue" display
  const queueSize = document.querySelector(".sec4 button"); // Assuming the button has class "sec4"
  queueSize.textContent = queue.length;
}

function popFromQueue() {
  // This function was already defined and corrected above, removing the duplicate definition.
}



