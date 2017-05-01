var MIN_BASE_DEFAULT = 0;
var MAX_BASE_DEFAULT = 15;
var MIN_EXP_DEFAULT = -3;
var MAX_EXP_DEFAULT = 3;
var globalProbswer;
var minBase = MIN_BASE_DEFAULT;
var maxBase = MAX_BASE_DEFAULT;
var minExp = MIN_EXP_DEFAULT;
var maxExp = MAX_EXP_DEFAULT;

$('#answer').focus();

// Generate problem/answer
function generateProbswer() {

    // Generate random base
    var base = parseInt(randomInt(parseInt(minBase), parseInt(maxBase)));
    // Generate random exponent (answer)
    var exp = parseInt(randomInt(parseInt(minExp), parseInt(maxExp)));

    console.log(parseInt(minBase), parseInt(maxBase));

    console.log(base, exp);

    // Calculate other number
    if (exp >= 0) {
        var otherNumber = Math.pow(base, exp);
    } else {
        console.log(exp);
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

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
