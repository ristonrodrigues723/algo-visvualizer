let array = [];

function updateArrayVisualization() {
    const arrayContainer = document.getElementById('arrayContainer');
    arrayContainer.innerHTML = '';
    
    array.forEach((element, index) => {
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('array-element');
        elementDiv.textContent = element;
        elementDiv.style.backgroundColor = getRandomColor();
        arrayContainer.appendChild(elementDiv);
    });
}

function addElement() {
    const input = document.getElementById('elementInput');
    const element = input.value.trim();
    
    if (element !== '') {
        array.push(element);
        updateArrayVisualization();
        input.value = '';
    }
}
