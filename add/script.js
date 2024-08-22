const board = document.getElementById('sudoku-board');
const solveBtn = document.getElementById('solve-btn');
const clearBtn = document.getElementById('clear-btn');
const stepBtn = document.getElementById('step-btn');
const speedSlider = document.getElementById('speed');
const statusDiv = document.getElementById('status');

let sudokuArray = Array(9).fill().map(() => Array(9).fill(0));
let solving = false;
let stepMode = false;

function createBoard() {
    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            const block = document.createElement('div');
            block.classList.add('block');
            
            for (let cellRow = 0; cellRow < 3; cellRow++) {
                for (let cellCol = 0; cellCol < 3; cellCol++) {
                    const i = blockRow * 3 + cellRow;
                    const j = blockCol * 3 + cellCol;
                    
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.min = 1;
                    input.max = 9;
                    input.addEventListener('input', (e) => {
                        const value = e.target.value ? parseInt(e.target.value) : 0;
                        sudokuArray[i][j] = value;
                        highlightConflicts(i, j, value);
                    });
                    cell.appendChild(input);
                    block.appendChild(cell);
                }
            }
            
            board.appendChild(block);
        }
    }
}

// The rest of the JavaScript code remains the same as in the previous version

createBoard();

function createBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.addEventListener('input', (e) => {
                const value = e.target.value ? parseInt(e.target.value) : 0;
                sudokuArray[i][j] = value;
                highlightConflicts(i, j, value);
            });
            cell.appendChild(input);
            board.appendChild(cell);
        }
    }
}

function updateBoard() {
    const cells = board.querySelectorAll('.cell input');
    cells.forEach((cell, index) => {
        const i = Math.floor(index / 9);
        const j = index % 9;
        cell.value = sudokuArray[i][j] || '';
    });
}

function highlightConflicts(row, col, value) {
    const cells = board.querySelectorAll('.cell');
    cells.forEach((cell) => cell.classList.remove('invalid'));

    if (value === 0) return;

    for (let i = 0; i < 9; i++) {
        if (i !== col && sudokuArray[row][i] === value) {
            cells[row * 9 + i].classList.add('invalid');
        }
        if (i !== row && sudokuArray[i][col] === value) {
            cells[i * 9 + col].classList.add('invalid');
        }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (i !== row && j !== col && sudokuArray[i][j] === value) {
                cells[i * 9 + j].classList.add('invalid');
            }
        }
    }
}

function isValid(num, row, col) {
    for (let i = 0; i < 9; i++) {
        if (sudokuArray[row][i] === num || sudokuArray[i][col] === num) {
            return false;
        }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (sudokuArray[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

async function solveSudoku() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudokuArray[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(num, row, col)) {
                        sudokuArray[row][col] = num;
                        updateBoard();
                        highlightCell(row, col, 'current');
                        
                        if (stepMode) {
                            statusDiv.textContent = `Trying ${num} at (${row + 1}, ${col + 1})`;
                            await waitForStep();
                        } else {
                            await sleep(101 - speedSlider.value);
                        }

                        if (await solveSudoku()) {
                            return true;
                        }

                        sudokuArray[row][col] = 0;
                        updateBoard();
                        highlightCell(row, col, 'current');
                        
                        if (stepMode) {
                            statusDiv.textContent = `Backtracking from (${row + 1}, ${col + 1})`;
                            await waitForStep();
                        } else {
                            await sleep(101 - speedSlider.value);
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function highlightCell(row, col, className) {
    const cells = board.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('current', 'valid', 'invalid'));
    cells[row * 9 + col].classList.add(className);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForStep() {
    return new Promise(resolve => {
        stepBtn.onclick = () => {
            resolve();
        };
    });
}

function clearBoard() {
    sudokuArray = Array(9).fill().map(() => Array(9).fill(0));
    updateBoard();
    const cells = board.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('current', 'valid', 'invalid'));
    statusDiv.textContent = '';
}

solveBtn.addEventListener('click', async () => {
    if (!solving) {
        solving = true;
        stepMode = false;
        solveBtn.textContent = 'Stop';
        const solved = await solveSudoku();
        solving = false;
        solveBtn.textContent = 'Solve';
        statusDiv.textContent = solved ? 'Sudoku solved!' : 'No solution exists.';
    } else {
        solving = false;
        solveBtn.textContent = 'Solve';
        statusDiv.textContent = 'Solving stopped.';
    }
});

clearBtn.addEventListener('click', clearBoard);

stepBtn.addEventListener('click', () => {
    if (!solving) {
        solving = true;
        stepMode = true;
        solveSudoku();
    }
});

createBoard();