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
        // Update the message box
        updateMessageBox(`Added element: ${element}`);
    }
}

// Function to remove an element from the array
function removeElement() {
    if (myArray.length > 0) {
        const removedElement = myArray.pop();
        updateArrayVisualization();
        // Update the message box
        updateMessageBox(`Removed element: ${removedElement}`);
    } else {
        updateMessageBox("Cannot remove: Array is empty");
    }
}

// Function to update display messages
function updateDisplayMessages() {
    const boxes = document.querySelectorAll('.info-container .box');
    boxes[0].textContent = myArray.length > 0 ? myArray[0] : 'Empty';
    boxes[1].textContent = myArray.length > 0 ? myArray[myArray.length - 1] : 'Empty';
    boxes[2].textContent = 'Not Available'; // This will be updated in removeElement function
    boxes[3].textContent = myArray.length;
}

// Function to remove an element from the array
function removeElement() {
    if (myArray.length > 0) {
        const removedElement = myArray.pop();
        updateArrayVisualization();
        // Update the message box
        updateMessageBox(`Removed element: ${removedElement}`);
        // Update the "Last removed Item" display
        document.querySelectorAll('.info-container .box')[2].textContent = removedElement;
    } else {
        updateMessageBox("Cannot remove: Array is empty");
    }
}

// Function to update the message box
function updateMessageBox(message) {
    const messageBox = document.getElementById('messageContent');
    messageBox.textContent = message;
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