var answer;

function genCos(minNum, maxNum) {

    var sqrted;
    var sqrted2;

    if (minNum < 0) {
        sqrted = -Math.sqrt(-minNum);
    } else {
        sqrted = Math.sqrt(minNum);
    }

    if (maxNum < 0) {
        sqrted2 = -Math.sqrt(-maxNum);
    } else {
        sqrted2 = Math.sqrt(maxNum);
    }

    console.log(sqrted, sqrted2);

    var co1 = chance.integer({
        min: sqrted,
        max: sqrted2
    });
    var co2 = chance.integer({
        min: sqrted,
        max: sqrted2
    });

    return [co1, co2];

}

$('#const1').focus();

var op1plus = true;
var op2plus = true;

function swOp(num, isPlus) {
    if (num === 1) {
        op1plus = isPlus;
        if (op1plus) {
            $('#op1').text('+');
        } else {
            $('#op1').text('-');
        }
    } else {
        op2plus = isPlus;
        if (op2plus) {
            $('#op2').text('+');
        } else {
            $('#op2').text('-');
        }
    }
}

$('#const1').keydown(function (event) {
    if (event.keyCode === 17) {
        swOp(1, !op1plus);
    }
});

$('#const2').keydown(function (event) {
    if (event.keyCode === 17) {
        swOp(2, !op2plus);
    }
});

$('#answerForm-factor').submit(function(event) {

    if (type === 'factor') {

        event.preventDefault();

        var squareCo1 = $('#squareco1').val() || 1;
        var squareCo2 = $('#squareco2').val() || 1;
        var const1 = $('#const1').val() || 0;
        var const2 = $('#const2').val() || 0;
        const1 = parseInt(const1);
        const2 = parseInt(const2);

        if (!op1plus) const1 = -const1;
        if (!op2plus) const2 = -const2;

        var middleTerm1 = squareCo1 * const2;
        var middleTerm2 = squareCo2 * const1;

        var theirAnswer = {
            squareCo: squareCo1 * squareCo2,
            middleTerm: middleTerm1 + middleTerm2,
            constTerm: const1 * const2
        };
        isCorrect(theirAnswer, answer);

        $('#const1, #const2, #squareco1, #squareco2').val('');

        $('#const1').focus();

        swOp(1, true);
        swOp(2, true);

    }

});

function isCorrect(theirAnswer, correctAnswer) {
    if (theirAnswer.squareCo === correctAnswer.squareCo && theirAnswer.constTerm === correctAnswer.constTerm && theirAnswer.middleTerm === correctAnswer.middleTerm) {
        alert('Correct!');
        displayProblem();
    } else {
        alert('Incorrect!');
    }

}

$('#op1').click(function() {
    swOp(1, !op1plus);
});

$('#op2').click(function() {
    swOp(2, !op2plus);
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

/* $('#expand').click(function() {
    type = 'expand';
    displayProblem();
}); For now */

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

        coefficients = genCos(minNum, maxNum);

        if (coefficients[0] === 0 || coefficients[1] === 0) coefficients = genCos(minNum, maxNum);

        console.log(coefficients);

    } else {
        var coefficients = [1, 1];
    }

    var squareCoefficient = coefficients[0] * coefficients[1];
    var firstMiddleTerm = coefficients[0] * num2;
    var secondMiddleTerm = coefficients[1] * num1;
    var middleTerm = firstMiddleTerm + secondMiddleTerm;
    var constant = num1 * num2;

    if (type === 'factor') {

        var problem = squareCoefficient + 'x^2+' + middleTerm + 'x+' + constant;

        problem = problem.replace(/\+-/g, '-');
        problem = problem.replace(/\+1x/g, '+x');
        problem = problem.replace(/-1x/g, '-x');
        problem = problem.replace(/\+0x/g, '');
        problem = problem.replace(/-0x/g, '');
        problem = problem.replace('1x^2', 'x^2');


        return {
            problem: problem,
            answer: {
                squareCo: squareCoefficient,
                middleTerm: middleTerm,
                constTerm: constant
            }
        };

    } else {

        var co1 = coefficients[0];
        var co2 = coefficients[1];
        var const1 = num1;
        var const2 = num2;
        var problem = '(' + co1 + 'x+' + const1 + ')(' + co2 + 'x+' + const2 + ')';

    }

}

function displayProblem() {
    var probswer = generateProblem();
    var problem = probswer.problem;
    var newAnswer = probswer.answer;

    answer = newAnswer;


    var probElem = $('#problem');
    probElem.text('Factor: ' + problem);

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