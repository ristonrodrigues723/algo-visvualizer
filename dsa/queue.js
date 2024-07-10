

const queue = [];

        function pushToQueue() {
            const inputNumber = document.getElementById('inputNumber').value;
            if (inputNumber) {
                queue.push(inputNumber);
                updateQueueDisplay();
            }
        }

        function popFromQueue() {
            if (queue.length > 0) {
                queue.shift();
                updateQueueDisplay();
            }
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
        }