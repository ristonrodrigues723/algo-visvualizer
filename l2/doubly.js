const linkedList = document.getElementById('linkedList');
const valueInput = document.getElementById('valueInput');
const randomSizeInput = document.getElementById('randomSizeInput');
const messageBox = document.getElementById('messageBox');
let nodes = [];

function showMessage(message, type = 'info') {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageBox.appendChild(messageElement);
    messageBox.scrollTop = messageBox.scrollHeight;
}

function createNodeElement(value, prev, next) {
    const nodeWrapper = document.createElement('div');
    nodeWrapper.className = 'node-wrapper';
    
    const node = document.createElement('div');
    node.className = 'node';
    node.innerHTML = `
        <div class="node-content">
            <div class="node-prev">${prev}</div>
            <div class="node-value">${value}</div>
            <div class="node-next">${next}</div>
        </div>
    `;
    node.onclick = () => displayNodeInfo(node);
    
    nodeWrapper.appendChild(node);
    return nodeWrapper;
}

function updateNodeConnections() {
    nodes.forEach((nodeWrapper, index) => {
        const node = nodeWrapper.querySelector('.node');
        const prevValue = index > 0 ? nodes[index - 1].querySelector('.node-value').textContent : 'null';
        const nextValue = index < nodes.length - 1 ? nodes[index + 1].querySelector('.node-value').textContent : 'null';
        node.querySelector('.node-prev').textContent = prevValue;
        node.querySelector('.node-next').textContent = nextValue;

        // Remove existing arrows
        while (nodeWrapper.firstChild !== node) {
            nodeWrapper.removeChild(nodeWrapper.firstChild);
        }
        while (nodeWrapper.lastChild !== node) {
            nodeWrapper.removeChild(nodeWrapper.lastChild);
        }

        // Add arrows
        if (index > 0) {
            const leftArrow = document.createElement('div');
            leftArrow.className = 'arrow';
            leftArrow.textContent = '⬅';
            nodeWrapper.insertBefore(leftArrow, node);
        }
        if (index < nodes.length - 1) {
            const rightArrow = document.createElement('div');
            rightArrow.className = 'arrow';
            rightArrow.textContent = '➡';
            nodeWrapper.appendChild(rightArrow);
        }
    });
}

function addNode() {
    const value = valueInput.value || nodes.length + 1;
    if (nodes.length < 8) {
        const node = createNodeElement(value, 'null', 'null');
        linkedList.appendChild(node);
        nodes.push(node);
        node.classList.add('add-animation');
        updateNodeConnections();
        valueInput.value = '';
        showMessage(`Node with value ${value} added.`, 'success');
    } else {
        showMessage("Maximum number of nodes reached (8).", 'error');
    }
}

function removeNode() {
    if (nodes.length > 0) {
        const lastNode = nodes.pop();
        lastNode.classList.add('remove-animation');
        setTimeout(() => {
            linkedList.removeChild(lastNode);
        }, 300);
        updateNodeConnections();
        showMessage("Last node removed.", 'success');
    } else {
        showMessage("The list is empty.", 'error');
    }
}

function displayNodeInfo(node) {
    const index = nodes.findIndex(wrapper => wrapper.querySelector('.node') === node);
    const currentValue = node.querySelector('.node-value').textContent;
    const prevValue = node.querySelector('.node-prev').textContent;
    const nextValue = node.querySelector('.node-next').textContent;
    
    showMessage(`The current node is ${currentValue}, previous is ${prevValue}, next is ${nextValue}`);
}

function generateRandomList() {
    const size = parseInt(randomSizeInput.value) || 5;
    if (size < 1 || size > 8) {
        showMessage("Please enter a size between 1 and 8.", 'error');
        return;
    }

    clearList();

    for (let i = 0; i < size; i++) {
        const randomValue = Math.floor(Math.random() * 100) + 1;
        const node = createNodeElement(randomValue, 'null', 'null');
        linkedList.appendChild(node);
        nodes.push(node);
        node.classList.add('add-animation');
    }

    updateNodeConnections();
    showMessage(`Random list of ${size} nodes generated.`, 'success');
}

function clearList() {
    linkedList.innerHTML = '';
    nodes = [];
    showMessage("List cleared.", 'success');
}

// Initialize with 3 nodes
for (let i = 0; i < 3; i++) {
    addNode();
}