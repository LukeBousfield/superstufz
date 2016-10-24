var answer;

$('#answerForm').submit(function(event) {

    event.preventDefault();
    console.log("I'm running!")

    var squareCo1 = $('#squareco1').val() || 1;
    var squareCo2 = $('#squareco2').val() || 1;
    var const1 = $('#const1').val();
    var const2 = $('#const2').val();

    console.log(answer);

    const1 = parseInt(const1);
    const2 = parseInt(const2);

    if (!op1plus) const1 = -const1;
    if (!op2plus) const2 = -const2;

    var middleTerm1 =  squareCo1 * const2;
    var middleTerm2 =  squareCo2 * const1;


    var theirAnswer = {
        squareCo: squareCo1*squareCo2,
        middleTerm: middleTerm1 + middleTerm2,
        constTerm: const1*const2
    };
    console.log(answer);
    isCorrect(theirAnswer, answer);

    $('#const1, #const2, #squareco1, #squareco2').val('');

    $('#const1').focus();

});

function isCorrect(theirAnswer, correctAnswer) {
    console.log(theirAnswer, correctAnswer);
    if (theirAnswer.squareCo === correctAnswer.squareCo && theirAnswer.constTerm === correctAnswer.constTerm && theirAnswer.middleTerm === correctAnswer.middleTerm) {
        alert('Correct!');
        displayProblem();
    } else {
        alert('Incorrect!');
    }

}

var op1plus = true;
var op2plus = true;

$('#op1').click(function() {
    op1plus = !op1plus;
    if (op1plus) {
        $('#op1').text('+');
    } else {
        $('#op1').text('-');
    }
});

$('#op2').click(function() {
    op2plus = !op2plus;
    if (op2plus) {
        $('#op2').text('+');
    } else {
        $('#op2').text('-');
    }
});

$('#nums').submit(function(event) {
    event.preventDefault();
    displayProblem();
});

var type = 'factor';

$('#factor').click(function() {
   type = 'factor';
   displayProblem();
});

$('#expand').click(function() {
    type = 'expand';
    displayProblem();
});

$('#allowCos').click(function () {
    displayProblem();
});



function generateProblem() {
    var minNum = $('#minNum').val();
    var maxNum = $('#maxNum').val();

    minNum = parseInt(minNum);
    maxNum = parseInt(maxNum);

    var num1 = chance.integer({
        min: minNum,
        max: maxNum
    });
    var num2 = chance.integer({
        min: minNum,
        max: maxNum
    });


    var isCosAllowed = $('#allowCos').prop('checked');

    if (isCosAllowed) {
        var co1 = chance.integer({
            min: minNum,
            max: maxNum
        });
        var co2 = chance.integer({
            min: minNum,
            max: maxNum
        });

        if (co1 === 0 || co2 === 0) console.log('error');

        var coefficients = [co1, co2];
    } else {
        var coefficients = [1, 1];
    }

    var squareCoefficient = coefficients[0] * coefficients[1];
    var firstMiddleTerm = coefficients[0] * num2;
    var secondMiddleTerm = coefficients[1] * num1;
    var middleTerm = firstMiddleTerm + secondMiddleTerm;
    var constant = num1 * num2;

    var problem = squareCoefficient + 'x^2+' + middleTerm + 'x+' + constant;

    problem = problem.replace(/\+-/g, '-');
    problem = problem.replace(/\+1x/g, '+x');
    problem = problem.replace(/-1x/g, '-x');
    problem = problem.replace(/\+0x/g, '');
    problem = problem.replace(/-0x/g, '');
    problem = problem.replace('1x^2', 'x^2');

    console.log(squareCoefficient, middleTerm, constant);



    return {
        problem: problem,
        answer: {
            squareCo: squareCoefficient,
            middleTerm: middleTerm,
            constTerm: constant
        }
    };

}

function displayProblem() {
    var probswer = generateProblem();
    var problem = probswer.problem;
    var newAnswer = probswer.answer;

    answer = newAnswer;


    var probElem = $('#problem');
    probElem.text('Problem: ' + problem);

    var isCoAllowed = $('#allowCos').prop('checked');

    if (!isCoAllowed) {
        $('#squareco1').hide();
        $('#squareco2').hide();
    } else {
        $('#squareco1').show();
        $('#squareco2').show();
    }

}

displayProblem();