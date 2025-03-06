document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const computerChoiceBox = document.getElementById("computer-choice-box");
    const computerChoiceImg = document.getElementById("computer-choice");
    const resultText = document.getElementById("result-text");
    const playAgainButton = document.getElementById("play-again");
    const resetScoreButton = document.getElementById("reset-score");

    const winsDisplay = document.getElementById("wins");
    const lossesDisplay = document.getElementById("losses");
    const tiesDisplay = document.getElementById("ties");

    // Load scores from localStorage
    let wins = localStorage.getItem("wins") ? parseInt(localStorage.getItem("wins")) : 0;
    let losses = localStorage.getItem("losses") ? parseInt(localStorage.getItem("losses")) : 0;
    let ties = localStorage.getItem("ties") ? parseInt(localStorage.getItem("ties")) : 0;

    // Update score display on page load
    updateScoreDisplay();

    /**
     * Handles player selection when they click on a choice (rock, paper, scissors).
     * Highlights the selected choice and starts the game logic.
     */
    choices.forEach(choice => {
        choice.addEventListener("click", function() {
            // Remove previous selection
            choices.forEach(c => c.classList.remove("selected"));
            this.classList.add("selected");

            // Get player choice
            const playerChoice = this.id;

            // Simulate computer thinking
            let images = ["images/rock.PNG", "images/paper.PNG", "images/scissors.PNG"];
            let index = 0;
            let interval = setInterval(() => {
                computerChoiceImg.src = images[index];
                index = (index + 1) % images.length;
            }, 500);

            setTimeout(() => {
                clearInterval(interval);

                // Computer random choice
                const computerMove = images[Math.floor(Math.random() * images.length)];
                computerChoiceImg.src = computerMove;

                // Add blue border to computer's choice box
                computerChoiceBox.style.border = "3px solid blue";

                // Determine winner
                let result = getWinner(playerChoice, computerMove);
                resultText.textContent = result;

                // Update score tracking
                if (result === "You win!") {
                    wins++;
                } else if (result === "You lose!") {
                    losses++;
                } else {
                    ties++;
                }

                // Save new scores to localStorage
                localStorage.setItem("wins", wins);
                localStorage.setItem("losses", losses);
                localStorage.setItem("ties", ties);

                // Update score display
                updateScoreDisplay();
            }, 3000);
        });
    });

    /**
     * Determines the winner based on the player's and computer's choices.
     * @param {string} player - The player's choice (rock, paper, or scissors)
     * @param {string} computer - The computer's choice image path
     * @returns {string} - The result message ("You win!", "You lose!", or "It's a tie!")
     */
    function getWinner(player, computer) {
        const computerMove = computer.split("/").pop().split(".")[0]; 

        if (player === computerMove) return "It's a tie!";
        if ((player === "rock" && computerMove === "scissors") ||
            (player === "paper" && computerMove === "rock") ||
            (player === "scissors" && computerMove === "paper")) {
            return "You win!";
        }
        return "You lose!";
    }

    /**
     * Updates the score display on the webpage.
     */
    function updateScoreDisplay() {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        tiesDisplay.textContent = ties;
    }

    /**
     * Resets the game state when "Play Again" is clicked.
     * Clears highlights, resets the computer's choice, and updates the result text.
     */
    playAgainButton.addEventListener("click", () => {
        // Remove selection highlight from player choices
        choices.forEach(choice => choice.classList.remove("selected"));

        // Reset computer choice to question mark
        computerChoiceImg.src = "images/question-mark.PNG";

        // Remove blue border from computer choice
        computerChoiceBox.style.border = "3px solid #ccc";

        // Reset result text
        resultText.textContent = " Make your move!";
    });
    
    /**
     * Resets the scores when "Reset Score" is clicked.
     * Clears localStorage and updates the score display.
     */
    resetScoreButton.addEventListener("click", () => {
        // Reset scores
        wins = 0;
        losses = 0;
        ties = 0;

        // Update localStorage
        localStorage.setItem("wins", wins);
        localStorage.setItem("losses", losses);
        localStorage.setItem("ties", ties);

        // Update score display
        updateScoreDisplay();
    });
});
