let lockedBoxes = [false, false, false];

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function shuffle(boxNumber) {
    if (!lockedBoxes[boxNumber - 1]) {
        const display = document.getElementById(`display${boxNumber}`);
        display.classList.add('shuffle-animation');
        
        // Number of iterations for the shuffle animation
        const iterations = 10;

        for (let i = 0; i < iterations; i++) {
            setTimeout(() => {
                display.textContent = getRandomNumber();
            }, i * 50); // Duration between iterations
        }

        setTimeout(() => {
            display.textContent = getRandomNumber();
            display.classList.remove('shuffle-animation');
        }, iterations * 50);
    }
}

function toggleLock(boxNumber) {
    const lockBtn = document.getElementById(`lockBtn${boxNumber}`);
    console.log(lockBtn);
    lockedBoxes[boxNumber - 1] = !lockedBoxes[boxNumber - 1];

    if (lockedBoxes[boxNumber - 1]) {
        lockBtn.innerHTML = '<img class="lockIMG" src="../../img/lock.png" alt="Lock">';
    } else {
        lockBtn.innerHTML = '<img class="lockIMG" src="../../img/unlock.png" alt="Unlock">';
    }
}

function shuffleAll() {
    for (let i = 1; i <= 3; i++) {
        shuffle(i);
    }
}

function submitForm() {
    const digit1 = document.getElementById('display1').textContent;
    const digit2 = document.getElementById('display2').textContent;
    const digit3 = document.getElementById('display3').textContent;
    // alert(`Selected Digits: ${digit1} ${digit2} ${digit3}`);
    const areaCode = digit1 + digit2 + digit3;
    console.log("area code: ", areaCode);
    localStorage.setItem("areaCode", areaCode);
    console.log("local storage content: ", localStorage.getItem("areaCode"));
}


