const inputValue = document.getElementById("input-value");
    const pushBtn = document.getElementById("push-btn");
    const popBtn = document.getElementById("pop-btn");
    const message = document.getElementById("message");
    const stackList = document.getElementById("stack-list");

    let stack = [];

    pushBtn.addEventListener("click", () => {
      const value = inputValue.value;
      if (value) {
        stack.push(value);
        stackList.innerHTML += `<p>${value}</p>`;
        message.innerText = "Item Pushed";
        inputValue.value = "";
      } else {
        message.innerText = "Please enter a value";
      }
    });

    popBtn.addEventListener("click", () => {
      if (stack.length > 0) {
        const poppedValue = stack.pop();
        stackList.removeChild(stackList.lastChild);
        message.innerText = `Item ${poppedValue} Popped`;
      } else {
        message.innerText = "Stack Underflow";
      }
    });