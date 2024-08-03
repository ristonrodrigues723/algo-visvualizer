const listContainer = document.getElementById('listContainer');
const valueInput = document.getElementById('valueInput');
const positionInput = document.getElementById('positionInput');
const messageBox = document.getElementById('messageBox');
let nodes = [];

function showMessage(message, isError = false) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${isError ? 'error' : 'success'}`;
    messageBox.appendChild(messageElement);
    messageBox.scrollTop = messageBox.scrollHeight;
}

function createNodeElement(value) {
    const nodeContainer = document.createElement('div');
    nodeContainer.className = 'node-container add-animation';

    const node = document.createElement('div');
    node.className = 'node';
    node.innerHTML = `
        <div class="node-prev">Prev</div>
        <div class="node-data">${value}</div>
        <div class="node-next">Next</div>
    `;
    node.onclick = () => displayNodeInfo(node);

    const arrowContainer = document.createElement('div');
    arrowContainer.className = 'arrow-container';
    
    const forwardArrow = document.createElement('div');
    forwardArrow.className = 'arrow-forward';
    
    const backwardArrow = document.createElement('div');
    backwardArrow.className = 'arrow-backward';

    arrowContainer.appendChild(forwardArrow);
    arrowContainer.appendChild(backwardArrow);

    nodeContainer.appendChild(node);
    nodeContainer.appendChild(arrowContainer);

    setTimeout(() => nodeContainer.classList.remove('add-animation'), 300);
    return nodeContainer;
}


function updateNodePositions() {
    // Remove existing arrows and lines
    const existingElements = document.querySelectorAll('.last-node-arrow, .down-arrow, .up-arrow, .bottom-line, .top-line, .top-down-arrow, .top-up-arrow');
    existingElements.forEach(element => element.remove());

    listContainer.innerHTML = '';

    nodes.forEach(node => listContainer.appendChild(node));

    if (nodes.length > 1) {
        const firstNodeRect = nodes[0].getBoundingClientRect();
        const lastNodeRect = nodes[nodes.length - 1].getBoundingClientRect();
        const containerRect = listContainer.getBoundingClientRect();

        // Add bottom line
        const bottomLine = document.createElement('div');
        bottomLine.className = 'bottom-line';
        listContainer.appendChild(bottomLine);
        bottomLine.style.width = `${lastNodeRect.right - firstNodeRect.left}px`;
        bottomLine.style.left = `${firstNodeRect.left - containerRect.left}px`;
        bottomLine.style.top = `${lastNodeRect.bottom - containerRect.top + 35}px`;

        // Add down arrow
        const downArrow = document.createElement('div');
        downArrow.className = 'down-arrow';
        listContainer.appendChild(downArrow);
        downArrow.style.left = `${lastNodeRect.right - containerRect.left - 10}px`;
        downArrow.style.top = `${lastNodeRect.bottom - containerRect.top + 5}px`;

        // Add up arrow
        const upArrow = document.createElement('div');
        upArrow.className = 'up-arrow';
        listContainer.appendChild(upArrow);
        upArrow.style.left = `${firstNodeRect.left - containerRect.left}px`;
        upArrow.style.top = `${lastNodeRect.bottom - containerRect.top + 15}px`;


        const topLine = document.createElement('div');
        topLine.className = 'top-line';
        listContainer.appendChild(topLine);
        topLine.style.width = `${lastNodeRect.right - firstNodeRect.left}px`;
        topLine.style.left = `${firstNodeRect.left - containerRect.left}px`;
        topLine.style.top = `${firstNodeRect.top - containerRect.top - 35}px`;

   
        const topUpArrow = document.createElement('div');
        topUpArrow.className = 'top-up-arrow';
        listContainer.appendChild(topUpArrow);
        topUpArrow.style.left = `${firstNodeRect.left - containerRect.left}px`;
        topUpArrow.style.top = `${firstNodeRect.top - containerRect.top - 35}px`;
        topUpArrow.style.height = '30px';

        const topDownArrow = document.createElement('div');
        topDownArrow.className = 'top-down-arrow';
        listContainer.appendChild(topDownArrow);
        topDownArrow.style.left = `${lastNodeRect.right - containerRect.left - 10}px`;
        topDownArrow.style.top = `${firstNodeRect.top - containerRect.top - 35}px`;
        topDownArrow.style.height = '31px';
    }

    nodes.forEach((container, index) => {
        const arrowContainer = container.querySelector('.arrow-container');
        
        if (index < nodes.length - 1) {
            arrowContainer.style.display = 'flex';
        } else {
            arrowContainer.style.display = 'none';
        }
        
        const nodePrev = container.querySelector('.node-prev');
        const nodeNext = container.querySelector('.node-next');
        
        nodePrev.textContent = index > 0 ? 'Prev' : 'Last';
        nodeNext.textContent = index < nodes.length - 1 ? 'Next' : 'First';
    });
}

function displayNodeInfo(node) {
    const index = nodes.findIndex(n => n.querySelector('.node') === node);
    let prevIndex = index > 0 ? index - 1 : nodes.length - 1;
    let nextIndex = index < nodes.length - 1 ? index + 1 : 0;
    
    const prevValue = nodes[prevIndex].querySelector('.node-data').textContent;
    const nextValue = nodes[nextIndex].querySelector('.node-data').textContent;
    const currentValue = node.querySelector('.node-data').textContent;
    
    document.getElementById('prevNodeValue').textContent = `Value: ${prevValue}`;
    document.getElementById('currentNodeValue').textContent = `Value: ${currentValue}`;
    document.getElementById('nextNodeValue').textContent = `Value: ${nextValue}`;
    
    showMessage(`Node ${index + 1}: Data = ${currentValue}, Prev = ${prevValue}, Next = ${nextValue}`);
}

function addNode() {
    const value = valueInput.value || nodes.length + 1;
    if (nodes.length < 6) {
        const node = createNodeElement(value);
        listContainer.appendChild(node);
        nodes.push(node);
        valueInput.value = '';
        updateNodePositions();
        showMessage(`Node with value ${value} added successfully.`);
    } else {
        showMessage("Maximum number of nodes reached (15).", true);
    }
}

function insertNode() {
    const value = valueInput.value || nodes.length + 1;
    let position = parseInt(positionInput.value) - 1;
    if (isNaN(position) || position < 0) position = 0;
    if (position > nodes.length) position = nodes.length;

    if (nodes.length < 6) {
        const nodeElement = createNodeElement(value);
        
     
        if (position === nodes.length) {
            listContainer.appendChild(nodeElement);
        } else {
            listContainer.insertBefore(nodeElement, nodes[position]);
        }
        
      
        nodes.splice(position, 0, nodeElement);

      
        valueInput.value = '';
        positionInput.value = '';

        // Update positions and show message
        updateNodePositions();
        showMessage(`Node with value ${value} inserted at position ${position + 1}.`);
    } else {
        showMessage("Maximum number of nodes reached (6).", true);
    }
}


function removeNode() {
    if (nodes.length > 0) {
        const lastNode = nodes.pop();
        lastNode.classList.add('remove-animation');
        setTimeout(() => {
            listContainer.removeChild(lastNode);
            updateNodePositions(); // Move this inside the setTimeout
        }, 300);
        showMessage("Last node removed successfully.");
    } else {
        showMessage("The list is already empty.", true);
    }
}


function deleteNode() {
    const value = valueInput.value;
    const index = nodes.findIndex(node => node.querySelector('.node-data').textContent === value);
    if (index !== -1) {
        const node = nodes[index];
        node.classList.add('remove-animation');
        setTimeout(() => {
            listContainer.removeChild(node);
            nodes.splice(index, 1);
            updateNodePositions();
        }, 300);
        valueInput.value = '';
        showMessage(`Node with value ${value} deleted successfully.`);
    } else {
        showMessage(`Value ${value} not found in the list.`, true);
    }
}

function searchNode() {
    const value = valueInput.value;
    nodes.forEach(node => node.querySelector('.node').classList.remove('highlight'));
    const found = nodes.filter(node => node.querySelector('.node-data').textContent === value);
    if (found.length > 0) {
        found.forEach(node => node.querySelector('.node').classList.add('highlight'));
        setTimeout(() => found.forEach(node => node.querySelector('.node').classList.remove('highlight')), 2000);
        showMessage(`Value ${value} found in the list.`);
    } else {
        showMessage(`Value ${value} not found in the list.`, true);
    }
    valueInput.value = '';
}

function reverseList() {
    nodes.reverse();
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    nodes.forEach(node => listContainer.appendChild(node));
    updateNodePositions();
    showMessage("List reversed successfully.");
}

function clearList() {
    nodes.forEach(node => {
        node.classList.add('remove-animation');
    });
    setTimeout(() => {
        listContainer.innerHTML = '';
        nodes = [];
        updateNodePositions();
        showMessage("List cleared successfully.");
    }, 300);
}

// Initialize with 5 nodes
for (let i = 0; i < 5; i++) {
    addNode();
}