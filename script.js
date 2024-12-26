const startButton = document.getElementById("start-btn");
const appContainer = document.getElementById("app");
const speedInput = document.getElementById("speed");
const setsInput = document.getElementById("sets");
const shotsInput = document.getElementById("shots");
const speedValue = document.getElementById("speed-value");
const setsValue = document.getElementById("sets-value");
const shotsValue = document.getElementById("shots-value");

// Update range input values dynamically
speedInput.addEventListener("input", () => speedValue.textContent = speedInput.value);
setsInput.addEventListener("input", () => setsValue.textContent = setsInput.value);
shotsInput.addEventListener("input", () => shotsValue.textContent = shotsInput.value);

// Start the countdown
function startCountdown() {
    appContainer.innerHTML = "<h1>Get Ready!</h1><p id='countdown'>5</p>";

    let countdown = 5;
    const countdownInterval = setInterval(() => {
        countdown--;
        document.getElementById("countdown").textContent = countdown;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            showTrainingPage();
        }
    }, 1000);
}

// Show the training page
function showTrainingPage() {
    appContainer.innerHTML = `
        <h1>Training Page</h1>
        <div id="training-area" class="flash">
            <img id="court-image" src="images/position-1.jpg" alt="Squash Court">
        </div>
    `;
    startTraining();
}

// Simulate the training
function startTraining() {
    const trainingArea = document.getElementById("training-area");
    let courtImage = document.getElementById("court-image");
    const numberOfShots = parseInt(shotsInput.value);
    const shotDelay = parseInt(speedInput.value) * 1000;
    const numberOfSets = parseInt(setsInput.value);

    let setCount = 0;

    function runSet() {
        let shotCount = 0;
        courtImage = document.createElement('img');
        courtImage.id = "court-image";
        trainingArea.innerHTML = '';
        trainingArea.appendChild(courtImage);

        const shotInterval = setInterval(() => {
            shotCount++;
            trainingArea.classList.add('flash');
            setTimeout(() => trainingArea.classList.remove('flash'), 500);

            const randomPosition = Math.floor(Math.random() * 6) + 1;
            courtImage.src = `images/position-${randomPosition}.jpg`;

            if (shotCount === numberOfShots) {
                clearInterval(shotInterval);
                setCount++;
                if (setCount < numberOfSets) {
                    startSetCountdown();
                } else {
                    appContainer.innerHTML = "<h1>Training is over. Good job!</h1>";
                    setTimeout(() => location.reload(), 5000);
                }
            }
        }, shotDelay);
    }

    function startSetCountdown() {
        trainingArea.innerHTML = "<h1>Rest</h1><p id='set-countdown'>5</p>";
        let countdown = 5;
        const countdownInterval = setInterval(() => {
            countdown--;
            document.getElementById("set-countdown").textContent = countdown;

            if (countdown === 0) {
                clearInterval(countdownInterval);
                runSet();
            }
        }, 1000);
    }

    runSet();
}

// Attach event listener to the start button
startButton.addEventListener("click", startCountdown);
