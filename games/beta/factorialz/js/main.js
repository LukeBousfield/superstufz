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
var op1plusexp = true;
var op2plusexp = true;

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

function swOpExp(num, isPlus) {
    if (num === 1) {
        op1plusexp = isPlus;
        if (op1plusexp) {
            $('#op1exp').text('+');
        } else {
            $('#op1exp').text('-');
        }
    } else {
        op2plusexp = isPlus;
        if (op2plusexp) {
            $('#op2exp').text('+');
        } else {
            $('#op2exp').text('-');
        }
    }
}

$('#const1').keydown(function(event) {
    if (event.keyCode === 17) {
        swOp(1, !op1plus);
    }
});

$('#const2').keydown(function(event) {
    if (event.keyCode === 17) {
        swOp(2, !op2plus);
    }
});

$('#mid').keydown(function(event) {
    if (event.keyCode === 17) {
        console.log('switching');
        swOpExp(1, !op1plusexp);
    }
})

$('#const').keydown(function(event) {
    if (event.keyCode === 17) {
        swOpExp(2, !op2plusexp);
    }
});

$('#answerForm-factor, #answerForm-expand').submit(function(event) {

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

    } else {

        event.preventDefault();

        var squareCo = $('#squareco').val() || 1;
        var middleTerm = $('#mid').val() || 0;
        var constTerm = $('#const').val() || 0;

        console.log(squareCo);

        squareCo = parseInt(squareCo);
        middleTerm = parseInt(middleTerm);
        constTerm = parseInt(constTerm);

        if (!op1plusexp) {
            console.log('switching middle term');
            middleTerm = -middleTerm;
        }
        if (!op2plusexp) {
            console.log('switching constant term');
            constTerm = -constTerm;
        }

        var theirAnswer = {
            squareCo: squareCo,
            middleTerm: middleTerm,
            constTerm: constTerm
        };

        isCorrect(theirAnswer, answer);

        $('#squareco').val('');
        $('#mid').val('');
        $('#const').val('');

        var isCoAllowed = $('#allowCos').prop('checked');

        if (isCoAllowed) return $('#squareco').focus();

        $('#mid').focus();

        swOpExp(1, true);
        swOpExp(2, true);

    }

});

function isCorrect(theirAnswer, correctAnswer) {
    if (type === 'expand') console.log(theirAnswer, correctAnswer);
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


    } else {

        var co1 = coefficients[0];
        var co2 = coefficients[1];
        var const1 = num1;
        var const2 = num2;
        var problem = '(' + co1 + 'x+' + const1 + ')(' + co2 + 'x+' + const2 + ')';
        var answer = {
            squareCo: squareCoefficient,
            middleTerm: middleTerm,
            constTerm: constant
        };

        problem = problem.replace(/\(1x/g, '(x');
        problem = problem.replace(/\+0/g, '');
        problem = problem.replace(/-0/g, '');
    }

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

}

function displayProblem() {
    var probswer = generateProblem();
    var problem = probswer.problem;
    var newAnswer = probswer.answer;

    answer = newAnswer;


    var probElem = $('#problem');
    if (type === 'factor') {
        var isCoAllowed = $('#allowCos').prop('checked');

        if (!isCoAllowed) {
            $('#squareco1').hide();
            $('#squareco2').hide();
        } else {
            $('#squareco1').show();
            $('#squareco2').show();
        }
        probElem.text('Factor: ' + problem);
        $('#answerForm-factor').show();
        $('#answerForm-expand').hide();
    } else {
        var isCoAllowed = $('#allowCos').prop('checked');

        if (!isCoAllowed) {
            $('#squareco').hide();
        } else {
            $('#squareco').show();
        }
        probElem.text('Expand:' + problem);
        $('#answerForm-expand').show();
        $('#answerForm-factor').hide();
    }

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