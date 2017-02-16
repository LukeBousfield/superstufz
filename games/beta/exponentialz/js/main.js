// Luke Bousfield - Exponentialz, 2017
// Dedicated to Chris Erwin, Algebra I teacher at Treasure Valley Math and Science Center

// Constants

var TERMS_NUM = 3;
var COEFFICIENT_MAX = 5
var COEFFICIENT_MIN = -5
var EXPONENT_MAX = 5
var EXPONENT_MIN = -5;

// TODO: Make default coefficient/exponent 1

var variables = ['x', 'y', 'z'];

var correctAnswer;

console.log('main.js reporting in, launch sequence initiated');

generateProbswer();

// Generate probswer

function generateProbswer() {

    console.log('Generating probswer');

    $('#co').val('');
    $('#exp1').val('');
    $('#exp2').val('');
    $('#exp3').val('');
    $('#co').focus();

    var problem = generateProblem();
    var answer = generateAnswer(problem);

    correctAnswer = answer;

    // Display problem
    console.log(problem);
    console.log(answer);

    var problemStr = 'Problem: ';
    for (var i = 0; i < 3; i++) {

        var coefficients = problem.coefficients;
        var exponents = problem.exponents;

        problemStr += '(';
        problemStr += coefficients.x[i];
        problemStr += variables[0].toString();
        problemStr += exponents.x[i].toString().sup();
        problemStr += variables[1];
        problemStr += exponents.y[i].toString().sup();
        problemStr += variables[2];
        problemStr += exponents.z[i].toString().sup();
        problemStr += ')';

        console.log(problemStr);

    }

    $('#problem').html(problemStr);

}

// Generate problem

function generateProblem() {
    var coefficients = {
        x: [],
        y: [],
        z: []
    };
    var exponents = {
        x: [],
        y: [],
        z: []
    };
    for (var i = 0; i < TERMS_NUM; i++) {
        coefficients.x[i] = chance.integer({
            min: COEFFICIENT_MIN,
            max: COEFFICIENT_MAX
        });
        exponents.x[i] = chance.integer({
            min: EXPONENT_MIN,
            max: EXPONENT_MAX
        });
        coefficients.y[i] = chance.integer({
            min: COEFFICIENT_MIN,
            max: COEFFICIENT_MAX
        });
        exponents.y[i] = chance.integer({
            min: EXPONENT_MIN,
            max: EXPONENT_MAX
        });
        coefficients.z[i] = chance.integer({
            min: COEFFICIENT_MIN,
            max: COEFFICIENT_MAX
        });
        exponents.z[i] = chance.integer({
            min: EXPONENT_MIN,
            max: EXPONENT_MAX
        });

        if (coefficients.x[i] === 0 || coefficients.y[i] === 0 || coefficients.z[i] === 0) {
            return generateProblem();
        }
    }

    return {
        coefficients: coefficients,
        exponents: exponents
    };
}

// Generate answer

function generateAnswer(problem) {
    var coefficients = problem.coefficients;
    var exponents = problem.exponents;

    console.log(exponents);

    // Multiply coefficients together

    var masterCoefficient = 1;

    for (var i = 0; i < 3; i++) {

        masterCoefficient = masterCoefficient*coefficients.x[i];

    }

    // Add exponents together

    var masterExponents = {
        x: 0,
        y: 0,
        z: 0
    };

    for (var k = 0; k < 3; k++) {

        masterExponents.x += exponents.x[k];
        masterExponents.y += exponents.y[k];
        masterExponents.z += exponents.z[k];

    }

    // Put it all together
    console.log(masterExponents);

    return {
        coefficient: masterCoefficient,
        exponent: masterExponents
    };

}

function onAnswerSubmit(event) {

    event.preventDefault();

    var theirAnswer = {};

    theirAnswer.co = $('#co').val() || 1;
    theirAnswer.exp1 = $('#exp1').val() || 1;
    theirAnswer.exp2 = $('#exp2').val() || 1;
    theirAnswer.exp3 = $('#exp3').val() || 1;

    var corAns = correctAnswer;

    var corCo = corAns.coefficient;
    var corExps = {
        x: corAns.exponent.x,
        y: corAns.exponent.y,
        z: corAns.exponent.z
    };

    console.log(corCo);
    console.log(corExps);

    theirAnswer.co = parseInt(theirAnswer.co);
    theirAnswer.exp1 = parseInt(theirAnswer.exp1);
    theirAnswer.exp2 = parseInt(theirAnswer.exp2);
    theirAnswer.exp3 = parseInt(theirAnswer.exp3);

    if (theirAnswer.co === corCo && theirAnswer.exp1 === corExps.x && theirAnswer.exp2 === corExps.y && theirAnswer.exp3 === corExps.z) {
        // Tell user it is correct

        setCorrect();

        generateProbswer();
    } else {
        console.log(theirAnswer);
        console.log('Incorrect');

        setIncorrect();

        $('#co').val('');
        $('#exp1').val('');
        $('#exp2').val('');
        $('#exp3').val('');
        $('#co').focus();
    }

}

// When user clicks submit
$('#answer').submit(onAnswerSubmit);

function setCorrect() {
    $('#status').html('<div class="alert alert-success"><strong>Correct!</strong><p style="font-size: 16px">Way to go!</p></div>');
}

function setIncorrect() {
    $('#status').html('<div class="alert alert-danger"><strong>Incorrect!</strong><p style="font-size: 16px">Better luck next time!<p></p></div>');
}