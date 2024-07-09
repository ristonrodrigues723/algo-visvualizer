const inputValue = document.getElementById("input-value");
const pushBtn = document.getElementById("push-btn");
const popBtn = document.getElementById("pop-btn");
const resetBtn = document.getElementById("reset-btn");
const message = document.getElementById("message");
const stackList = document.getElementById("stack-list");
const topItem = document.getElementById("top-item");

let stack = [];
let stackSize = 0; // Initialize stack size

function disableButtons() {
  pushBtn.disabled = true;
  popBtn.disabled = true;
  resetBtn.disabled = true;
  inputValue.disabled = true;
}

function enableButtons() {
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
    topItem.innerText = value;
    const newElement = document.createElement("p");
    newElement.innerText = value;
    newElement.classList.add("pushed"); // Add "pushed" class for styling
    stackList.appendChild(newElement);
    message.innerText = "Item Pushed";
    stackSize++; // Update stack size after push
    updateStackSize();
    enableButtons();
    newElement.classList.remove("pushed"); // Remove "pushed" class after animation (optional)
  } else {
    message.classList.add("error"); // Add error class for styling
    message.innerText = "Please enter a value";
    message.classList.remove("error"); // Remove error class after a short delay (optional)
  }
});

popBtn.addEventListener("click", () => {
  if (stack.length > 0) {
    disableButtons();
    const poppedValue = stack.pop();
    const poppedElement = stackList.lastChild;
    poppedElement.classList.add("popped"); // Add "popped" class for styling
    stackList.removeChild(poppedElement);
    topItem.innerText = stack.length > 0 ? stack[stack.length - 1] : "";
    message.innerText = `Item ${poppedValue} Popped`;
    stackSize--; // Update stack size after pop
    updateStackSize();
    enableButtons();
    poppedElement.classList.remove("popped"); // Remove "popped" class after animation (optional)
  } else {
    message.classList.add("error");
    message.innerText = "Stack Underflow";
    message.classList.remove("error"); // Remove error class after a short delay (optional)
  }
});

resetBtn.addEventListener("click", () => {
  disableButtons();
  stack = [];
  stackList.innerHTML = "";
  topItem.innerText = "";
  message.innerText = "Stack Reset";
  stackSize = 0; // Update stack size after reset
  updateStackSize();
  enableButtons();
});

function updateStackSize() {
  document.getElementById("stack-size").textContent = `Stack Size: ${stackSize}`;
}
