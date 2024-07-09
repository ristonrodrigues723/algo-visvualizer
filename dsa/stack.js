const inputValue = document.getElementById("input-value");
const pushBtn = document.getElementById("push-btn");
const popBtn = document.getElementById("pop-btn");
const resetBtn = document.getElementById("reset-btn"); // New button for reset
const message = document.getElementById("message");
const stackList = document.getElementById("stack-list");
const topItem = document.getElementById("top-item"); // New element for top item

let stack = [];

function disableButtons() { // Function to disable buttons during operations
  pushBtn.disabled = true;
  popBtn.disabled = true;
  resetBtn.disabled = true;
  inputValue.disabled = true;
}

function enableButtons() { // Function to enable buttons after operations
  pushBtn.disabled = false;
  popBtn.disabled = false;
  resetBtn.disabled = false;
  inputValue.disabled = false;
}

pushBtn.addEventListener("click", () => {
  const value = inputValue.value;
  if (value) {
    disableButtons();
    stack.push(value);
    topItem.innerText = value; // Update top item display
    const newElement = document.createElement("p"); // Create new paragraph element
    newElement.innerText = value;
    stackList.appendChild(newElement); // Add new element to stack list
    message.innerText = "Item Pushed";
    inputValue.value = "";
    enableButtons();
  } else {
    message.innerText = "Please enter a value";
  }
});

popBtn.addEventListener("click", () => {
  if (stack.length > 0) {
    disableButtons();
    const poppedValue = stack.pop();
    stackList.removeChild(stackList.lastChild);
    topItem.innerText = stack.length > 0 ? stack[stack.length - 1] : ""; // Update top item
    message.innerText = `Item ${poppedValue} Popped`;
    enableButtons();
  } else {
    message.innerText = "Stack Underflow";
  }
});

resetBtn.addEventListener("click", () => { // Add event listener for reset button
  disableButtons();
  stack = [];
  stackList.innerHTML = ""; // Clear stack list
  topItem.innerText = ""; // Clear top item display
  message.innerText = "Stack Reset";
  enableButtons();
});
