$(document).ready(function () {

    class Difficulty {
        constructor(ms, numOfSquares, diffName) {
            this.msSquaresVisible = ms;
            this.numOfSquares = numOfSquares;
            this.name = diffName;
        }
    }

    const easy = new Difficulty(600, 4, 'easy');
    const medium = new Difficulty(500, 6, 'medium');
    const hard = new Difficulty(400, 8, 'hard');

    const config = {
        difficulty: easy,
        chosenNumbers: []
    };

    const $currDiff = $("#" + config.difficulty.name);
    $currDiff.css("color", "#212529");
    $currDiff.css("background-color", $currDiff.css("border-color"));

    const scores = {
        wins: 0,
        losses: 0
    };

    function scoreIncrementer(key, isReset) {

        if (isReset) {
            scores[key] = 0;
        }
        else {
            scores[key]++;
        }
        $("#" + [key]).html(scores[key]);
    };


    const displayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const $btnStartGame = $("#game-start");

    toggleBtnVisibility(true);

    function startGame() {
        gifDisplay('start');
        config.chosenNumbers = populateSquares(selectSquaresAtRandom(config.difficulty.numOfSquares));
        toggleBtnVisibility(false);

    }

    $(".btn-diff, #game-start").on("click", function (e) {

        const tar = e.target;

        if (tar.classList.contains("btn-diff")) {

            // remove coloring on previous difficulity
            const $currentDiff = $("#" + config.difficulty.name);
            $currentDiff.css("color", $currentDiff.css("border-color"));
            $currentDiff.css("background-color", "transparent");

            // add color to new difficulty
            const $tar = $(tar);
            $tar.css("color", "#212529");
            $tar.css("background-color", $tar.css("border-color"));
        }

        switch (tar.id) {

            case "easy":
                config.difficulty = easy;
                break;
            case "medium":
                config.difficulty = medium;
                break;
            case "hard":
                config.difficulty = hard;
                break;
            case "game-start":
                hideSquares();
                startGame();
                toggleBtnVisibility(false);
            default:
                break;
        }
    });

    function hideSquares() {
        $(".square").removeClass("bg-white").html('');
    }

    $(".grid").on("click", function (e) {

        const $tar = $(e.target);


        if ($tar.hasClass("bg-white")) {
            const selectedNum = $tar.html();
            $tar.html("");
            $tar.removeClass("bg-white");
            const comparisonNum = config.chosenNumbers.splice(0, 1)[0];

            if (parseInt(selectedNum) !== comparisonNum) {
                gameOver();
            }

            // game won
            else if (config.chosenNumbers.length === 0) {
                toggleBtnVisibility(true);
                scoreIncrementer('wins');
                gifDisplay('win');
            }
        }
    });

    function selectSquaresAtRandom(numOfSquares) {

        // select all squares: return type = array with jquery methods available
        const $squares = $(".square");

        const selectedSquares = [];

        for (let i = 0; i < numOfSquares; i++) {

            const randomNum = randomIntFromRange(0, $squares.length);
            selectedSquare = $squares.splice(randomNum, 1)[0];
            selectedSquares.push(selectedSquare);
        }
        return selectedSquares;
    }

    function populateSquares(selectedSquares) {

        const chosenNumbers = [];
        const displayNumbersCopy = [...displayNumbers];

        for (let square of selectedSquares) {

            const randomNum = randomIntFromRange(0, displayNumbersCopy.length);
            const displayNum = displayNumbersCopy.splice(randomNum, 1)[0];
            chosenNumbers.push(displayNum);
            $(square).html(displayNum);
        }

        setTimeout(function () {

            $(selectedSquares).addClass("bg-white");
        }, config.difficulty.msSquaresVisible);

        chosenNumbers.sort(function (a, b) {
            return a - b;
        });

        return chosenNumbers;
    }

    function toggleBtnVisibility(show) {

        if (show) {
            $btnStartGame.show();
            $btnStartGame.focus();
            $("#difficulty-btns").removeClass("invisible")

        }
        else {
            $btnStartGame.hide();
            $("#difficulty-btns").addClass("invisible")
        }
    }

    function gifDisplay(action) {

        switch (action) {
            case "win":
                $(".hide-wrap").hide();
                $("#win-gif").removeClass('d-none');
                break;
            case "lose":
                $(".hide-wrap").hide();
                $("#lose-gif").removeClass('d-none');
                break;
            case "start":
                $("#win-gif").addClass('d-none');
                $("#lose-gif").addClass('d-none');
                $(".hide-wrap").show();
                break;
            default:
                break;
        }
    }

    function gameOver() {
        hideSquares();
        toggleBtnVisibility(true);
        scoreIncrementer('losses');
        gifDisplay('lose')
    }
});
