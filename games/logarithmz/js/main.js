var MIN_BASE = 0;
var MAX_BASE = 15;
var MIN_EXP = -3;
var MAX_EXP = 3;
var globalProbswer;

$('#answer').focus();

// Generate problem/answer
function generateProbswer() {

    // Generate random base
    var base = chance.integer({
        min: MIN_BASE,
        max: MAX_BASE
    });
    // Generate random exponent (answer)
    var exp = chance.integer({
        min: MIN_EXP,
        max: MAX_EXP
    });

    // Calculate other number
    if (exp >= 0) {
        var otherNumber = Math.pow(base, exp);
    } else {
        var otherNumber = '<table style="display: inline"><tbody><tr><td style="border-bottom:solid 1px">1</td></tr><tr><td>' + Math.pow(base, -1*exp) + '</td></tr></tbody></table>';
    }

    if (base === 0 || base === 1 || otherNumber === 0) return generateProbswer();

    var problem = {
        base: base,
        otherNumber: otherNumber
    };
    var answer = exp;

    return {
        problem: problem,
        answer: answer
    }

}

// When "Submit" clicked
$('#submit').click(function () {
    // Take input
    takeInput();
});

// When enter pressed
$('#answer').keydown(function (e) {
    if (e.keyCode === 13) {
        // Take input
        takeInput();
    }
})

function takeInput() {
    // Check answer
    var answer = $('#answer').val();
    console.log(answer.toString(), globalProbswer.answer.toString());
    // If right
    if (globalProbswer.answer.toString() === answer.toString()) {
        // Display "Correct!"
        console.log('Correct!');
        $('#status').text('Correct!');
        $('#status').css('color', '#7CFC00');
        displayProblem();
    } else if (globalProbswer.answer.toString() !== answer.toString()) {
        // Display "Incorrect!"
        console.log('Incorrect!');
        $('#status').text('Incorrect!');
        $('#status').css('color', '#ff0000');
    }
    // Clear input
    $('#answer').val('');
}

function displayProblem() {
    // Display problem
    var probswer = generateProbswer();
    globalProbswer = probswer;
    $('#problem').html('log' + probswer.problem.base.toString().sub() + probswer.problem.otherNumber);
}

displayProblem();
