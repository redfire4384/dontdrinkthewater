// script.js

// Selected number
let selectedNum = null;

// Listen for clicks on number cells
document.querySelectorAll('.numbers .cell').forEach(cell => {
    cell.addEventListener('click', function() {
        // If a number is already selected, deselect it
        if (selectedNum) {
            selectedNum.style.backgroundColor = '';
        }

        // Mark this number as selected
        selectedNum = this;
        this.style.backgroundColor = '#01FF70';
    });
});

// Listen for clicks on grid cells
document.querySelectorAll('.grid .cell').forEach(cell => {
    cell.addEventListener('click', function() {
        // If a number is selected and this cell is empty, fill it
        if (selectedNum && !this.dataset.value) {
            this.dataset.value = selectedNum.dataset.value;
            this.innerText = selectedNum.dataset.value;
            selectedNum.remove();
            selectedNum = null;

            // Check if all cells are filled, and if so, check the solution
            if (Array.from(document.querySelectorAll('.grid .cell')).every(cell => cell.dataset.value)) {
                checkSolution();
            }
        }
    });
});

function checkSolution() {
    const cells = document.querySelectorAll('.grid .cell');
    let matrix = [
        [cells[0].dataset.value, cells[1].dataset.value, cells[2].dataset.value],
        [cells[3].dataset.value, cells[4].dataset.value, cells[5].dataset.value],
        [cells[6].dataset.value, cells[7].dataset.value, cells[8].dataset.value]
    ];

    if (matrix.toString() === '2,7,6,9,5,1,4,3,8') {
        alert('Correct! The message is unlocked!');
    } else {
        alert('Incorrect. Try again.');
        document.querySelector('.grid').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.grid').classList.remove('shake');
        }, 500);
    }
}
