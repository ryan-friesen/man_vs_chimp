$(document).ready(function () {

    var config = {
        difficulty: 'easy',
        numberOfSquares: 4,
        timeoutSet: 600,
        chosenNumbers: []
    };

    class Difficulty {
        constructor(ms, numOfSquares) {
            this.msSquaresVisible = ms;
            this.numOfSquares = numOfSquares;
        }
    }

    var scores = {
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


    var displayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var $btnStartGame = $("#game-start");
    toggleBtnVisibility(true);

    function startGame() {
        gifDisplay('start');
        config.chosenNumbers = populateSquares(selectSquaresAtRandom(config.numberOfSquares));
        toggleBtnVisibility(false);

    }

    $(".btn-diff, #game-start").on("click", function (e) {

        var tar = e.target;

        if (tar.classList.contains("btn-diff")) {

            // remove coloring on previous difficulity
            var $currDiff = $("#" + config.difficulty);
            $currDiff.css("color", $currDiff.css("border-color"));
            $currDiff.css("background-color", "transparent");

            // add color to new difficulty
            var $tar = $(tar);
            $tar.css("color", "#212529");
            $tar.css("background-color", $tar.css("border-color"));
        }

        switch (tar.id) {

            case "easy":
                config.difficulty = 'easy';
                config.numberOfSquares = 4;
                config.timeoutSet = 600;
                break;
            case "medium":
                config.difficulty = 'medium';
                config.numberOfSquares = 6;
                config.timeoutSet = 500;
                break;
            case "hard":
                config.difficulty = 'hard';
                config.numberOfSquares = 8;
                config.timeoutSet = 400;
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

        var $tar = $(e.target);


        if ($tar.hasClass("bg-white")) {
            var selectedNum = $tar.html();
            $tar.html("");
            $tar.removeClass("bg-white");
            var comparisonNum = config.chosenNumbers.splice(0, 1)[0];

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

    // e.g., of fn call: selectSquaresAtRandom(config.numberOfSquares);
    function selectSquaresAtRandom(numOfSquares) {

        // select all squares: return type = array with jquery methods available
        var $squares = $(".square");

        var selectedSquares = [];

        for (var i = 0; i < numOfSquares; i++) {

            var randomNum = randomIntFromRange(0, $squares.length);
            selectedSquare = $squares.splice(randomNum, 1)[0];
            selectedSquares.push(selectedSquare);
        }
        return selectedSquares;
    }

    function populateSquares(selectedSquares) {

        var chosenNumbers = [];
        var displayNumbersCopy = [...displayNumbers];

        for (var square of selectedSquares) {

            var randomNum = randomIntFromRange(0, displayNumbersCopy.length);
            var displayNum = displayNumbersCopy.splice(randomNum, 1)[0];
            chosenNumbers.push(displayNum);
            $(square).html(displayNum);
        }

        setTimeout(function () {

            $(selectedSquares).addClass("bg-white");
        }, config.timeoutSet);

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
