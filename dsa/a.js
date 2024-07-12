// Initialize an empty array
let myArray = [];

// Function to update the array visualization
function updateArrayVisualization() {
    const arrayContainer = document.getElementById('arrayContainer');
    arrayContainer.innerHTML = '';

    myArray.forEach((element, index) => {
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('array-element');
        elementDiv.textContent = element;
        elementDiv.style.backgroundColor = getRandomColor();
        arrayContainer.appendChild(elementDiv);
    });

    // Update display messages
    updateDisplayMessages();
}

// Function to add an element to the array
function addElement() {
    const input = document.getElementById('elementInput');
    const element = input.value.trim();

    if (element !== '') {
        myArray.push(element);
        updateArrayVisualization();
        input.value = '';
    }
}

// Function to remove an element from the array
function removeElement() {
    if (myArray.length > 0) {
        const removedElement = myArray.pop();
        updateArrayVisualization();
        // Update the "Last Popped Item" message
        document.getElementById('lastPoppedItem').textContent = removedElement;
    }
}

// Function to clear the entire array
function clearArray() {
    myArray = []; // Clear the array
    updateArrayVisualization();
    // Reset other messages
    document.getElementById('frontOfQueue').textContent = 'Empty';
    document.getElementById('lastPushedItem').textContent = 'Empty';
    document.getElementById('lastPoppedItem').textContent = 'Not Available';
    document.getElementById('queueSize').textContent = '0';
}

// Function to update display messages
function updateDisplayMessages() {
    document.getElementById('frontOfQueue').textContent = myArray.length > 0 ? myArray[0] : 'Empty';
    document.getElementById('lastPushedItem').textContent = myArray.length > 0 ? myArray[myArray.length - 1] : 'Empty';
    document.getElementById('queueSize').textContent = myArray.length;
}

// Generate a random color for array elements
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initial visualization
updateArrayVisualization();
