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

function applyShake(element) {
    let count = 10; 
    let shakeAmount = 5; 
    let originalOffset = element.offsetLeft;

    function shakeOnce() {
        if (count <= 0) {
            element.style.transform = '';
            return;
        }
        element.style.transform = 'translateX(' + ((count % 2 === 0 ? 1 : -1) * shakeAmount) + 'px)';
        count--;
        setTimeout(shakeOnce, 50);
    }
    shakeOnce();
}

function checkSolution() {
    const cells = document.querySelectorAll('.grid .cell');
    let matrix = [
        [cells[0].dataset.value, cells[1].dataset.value, cells[2].dataset.value],
        [cells[3].dataset.value, cells[4].dataset.value, cells[5].dataset.value],
        [cells[6].dataset.value, cells[7].dataset.value, cells[8].dataset.value]
    ];

    const gridElement = document.querySelector('.grid');
    
    if (matrix.toString() === '2,7,6,9,5,1,4,3,8') {
        gridElement.style.backgroundColor = '#01FF70'; // Green background for correctness
        let successMessage = document.createElement('div');
        successMessage.innerHTML = "Correct! The message is unlocked!";
        successMessage.style.color = 'red';
        successMessage.style.fontSize = '2rem';
        document.body.appendChild(successMessage);
    } else {
        applyShake(gridElement);
    }
}

function revealTruth() {
    const messageInput = document.getElementById('decodedMessage');
    const truthLinkDiv = document.getElementById('truthLink');
    
    // Using the provided decoded message
    if (messageInput.value.trim().toUpperCase() === "DONT DRINK THE WATER SECRETS LIES BENEATH MILLWATER") {
        truthLinkDiv.style.display = 'block';
    } else {
        alert('Incorrect message. Try again.');
    }
}
