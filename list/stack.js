// Variable Declaration
const push = document.querySelector(".push");
const pop = document.querySelector(".pop");
const reset = document.querySelector(".reset");
const bucket = document.querySelector(".main-stack-bucket");
const input = document.querySelector(".text");
const massage = document.querySelector(".massage");
const massageBox = document.querySelector(".massage-box");
const box = document.querySelectorAll(".box");
const stack = [];

// Disable all buttons
const buttonDisable = () => {
    push.disabled = true;
    push.classList.add("disable-button");
    pop.disabled = true;
    pop.classList.add("disable-button");
    reset.disabled = true;
    reset.classList.add("disable-button");
    input.disabled = true;
};

// Enable all buttons
const buttonEnable = () => {
    push.disabled = false;
    push.classList.remove("disable-button");
    pop.disabled = false;
    pop.classList.remove("disable-button");
    reset.disabled = false;
    reset.classList.remove("disable-button");
    input.disabled = false;
};

// When the push button will be clicked
push.addEventListener("click", () => {

    // If input box is empty
    if (input.value == "") {
        massage.innerHTML = "Please Enter a value.";
        massageBox.classList.add("error-massage");
        setTimeout(() => {
            massageBox.classList.remove("error-massage");
        }, 1200);
        return;
    }

    // If the stack is full
    if (stack.length == 5) {
        input.value = "";
        massage.innerHTML = "Stack Overflow";
        massageBox.classList.add("error-massage");
        setTimeout(() => {
            massageBox.classList.remove("error-massage");
        }, 1200);
        return;
    }
    const itemValue = input.value; // Store the input value
    stack.push(itemValue); // Push the value into the stack

    // Creating a new element
    const element = document.createElement("div");
    element.classList.add("ele");
    element.innerText = stack[stack.length - 1];
    bucket.appendChild(element);

    box[0].innerHTML = stack[stack.length - 1];

    input.value = "";
    element.classList.add("ele-add");

    buttonDisable();


    setTimeout(() => {
        element.classList.remove("ele-add");
        box[1].innerHTML = itemValue;
        massage.innerHTML = `Item ${stack[stack.length - 1]} is Pushed.`;

        buttonEnable();
    }, 1500);
});

// When the pop button will be clicked
pop.addEventListener("click", () => {

    // if Stack is Empty
    if (stack.length == 0) {
        massageBox.classList.add("error-massage");
        massage.innerHTML = "Stack Underflow";
        setTimeout(() => {
            massageBox.classList.remove("error-massage");
        }, 1200);
        return;
    }
    bucket.lastElementChild.classList.add("ele-remove");
    buttonDisable();


    setTimeout(() => {

        // Delete the element from the bucket
        bucket.removeChild(bucket.lastElementChild);
        const itemValue = stack.pop();
        box[2].innerHTML = itemValue;

        // Updating the Top
        if (stack.length == 0) {
            box[0].innerHTML = "";
        } else {
            box[0].innerHTML = stack[stack.length - 1];
        }
        massage.innerHTML = `Item ${itemValue} is Popped.`;
        buttonEnable();
    }, 1500);
});

// When the reset button will be clicked
reset.addEventListener("click", () => {

    // Clear the full array
    while (stack.length > 0) {
        stack.pop();
    }

    // Clear all fields
    box[0].innerHTML = "";
    box[1].innerHTML = "";
    box[2].innerHTML = "";
    massage.innerHTML = "";

    // Clear all elements from the bucket
    while (bucket.firstChild) {
        bucket.removeChild(bucket.firstChild);
    }
});
