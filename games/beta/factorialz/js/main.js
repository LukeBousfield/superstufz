// Make calculating percentages easier
jQuery.extend({
    percentage: function(a, b) {
        return Math.round((a / b) * 100);
    }
});

$('#egoal, #fgoal, #tgoal').change(function () {
    var egoal = $('#egoal').val();
    var fgoal = $('#fgoal').val();
    var tgoal = $('#tgoal').val();
    egoal = parseInt(egoal);
    fgoal = parseInt(fgoal);
    tgoal = parseInt(tgoal);
    if (egoal <= 0 || fgoal <= 0 || tgoal <= 0) {
        return alert('Please enter valid a valid goal');
    }
    var scores = getPercentage();
    factorPerc = scores.factor;
    expandPerc = scores.expand;
    totalPerc = scores.total;

    updateScores();
});

var hasCompleted = {
    factor: {
        get: function() {
            var isComplete = localStorage.getItem('fcomp') || false;
            return isComplete;
        },
        set: function(isComplete) {
            localStorage.setItem('fcomp', isComplete);
        }
    },
    expand: {
        get: function() {
            var isComplete = localStorage.getItem('ecomp') || false;
            return isComplete;
        },
        set: function(isComplete) {
            localStorage.setItem('ecomp', isComplete);
        }
    },
    both: {
        get: function() {
            var isComplete = localStorage.getItem('bcomp') || false;
            return isComplete
        },
        set: function(isComplete) {
            localStorage.setItem('bcomp', isComplete);
        }
    }
};

var answer;
var perc = getPercentage()
var factorPerc = perc.factor;
var expandPerc = perc.expand;
var totalPerc = perc.total;
updateScores();

$('#resetProgress').click(function() {
    var sure = confirm('Are you sure?');
    if (sure === true) {
        localStorage.clear();
        var scores = getPercentage();
        factorPerc = scores.factor;
        expandPerc = scores.expand;
        totalPerc = scores.total;

        updateScores();
    }
});

$('#fgoal, #egoal, #tgoal').click(function () {
    var answer;
    var percl = getPercentage()
    factorPerc = percl.factor;
    expandPerc = percl.expand;
    totalPerc = percl.total;
    updateScores();
});

function updateScores() {

    if (factorPerc < 100) {

        $('#factorprogress').css({
            width: factorPerc + '%'
        });
        $('#factorprogress').attr('aria-valuenow', factorPerc);

    } else {
        $('#factorprogress').css({
            width: '100%',
        });
        $('#factorprogress').attr('aria-valuenow', 100);
    }
    $('#factorprogress').text(factorPerc + '%');

    if (expandPerc < 100) {

        $('#expandprogress').css({
            width: expandPerc + '%'
        });
        $('#expandprogress').attr('aria-valuenow', expandPerc);

    } else {
        $('#expandprogress').css({
            width: '100%',
        });
        $('#expandprogress').attr('aria-valuenow', 100);
    }
    $('#expandprogress').text(expandPerc + '%');

    if (totalPerc < 100) {

        $('#totalprogress').css({
            width: totalPerc + '%'
        });
        $('#totalprogress').attr('aria-valuenow', totalPerc);

    } else {
        $('#totalprogress').css({
            width: '100%',
        });
        $('#totalprogress').attr('aria-valuenow', 100);
    }
    $('#totalprogress').text(totalPerc + '%');

}

updateScores();

function getPercentage() {

    var factorGoal = parseInt($('#fgoal').val());
    var expandGoal = parseInt($('#egoal').val());
    var totalGoal = parseInt($('#tgoal').val());
    if (isNaN(factorGoal) || isNaN(expandGoal) || isNaN(totalGoal)) {
        alert('Please enter valid goal numbers (e.g. 20)');
    }
    var currentFactor = getScore('factor');
    var currentExpand = getScore('expand');
    var currentTotal = (currentFactor + currentExpand) / 2;
    var currentFactorPerc = $.percentage(currentFactor, factorGoal);
    var currentExpandPerc = $.percentage(currentExpand, expandGoal);
    var currentTotalPerc = $.percentage(currentTotal, totalGoal);
    return {
        factor: currentFactorPerc,
        expand: currentExpandPerc,
        total: currentTotalPerc
    };

}

function getScore(type) {
    if (type === 'factor') {
        return parseInt(localStorage.getItem('factorScore')) || 0;
    } else if (type === 'expand') {
        return parseInt(localStorage.getItem('expandScore')) || 0;
    }
}

function setScore(type, newScore) {
    if (type === 'factor') {
        localStorage.setItem('factorScore', newScore);
    } else if (type === 'expand') {
        localStorage.setItem('expandScore', newScore);
    }
}

function genCos(minNum, maxNum) {

    var sqrted;
    var sqrted2;

    if (minNum < 0) {
        sqrted = -Math.sqrt(0);
    } else {
        sqrted = Math.sqrt(0);
    }

    if (maxNum < 0) {
        sqrted2 = -Math.sqrt(-maxNum);
    } else {
        sqrted2 = Math.sqrt(maxNum);
    }

    var co1 = chance.integer({
        min: 1,
        max: sqrted2
    });
    var co2 = chance.integer({
        min: 1,
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
    if (event.keyCode === 17 || event.keyCode === 192) {
        swOp(1, !op1plus);
    }
});

$('#const2').keydown(function(event) {
    if (event.keyCode === 17 || event.keyCode === 192) {
        swOp(2, !op2plus);
    }
});

$('#mid').keydown(function(event) {
    if (event.keyCode === 17 || event.keyCode === 192) {
        swOpExp(1, !op1plusexp);
    }
});


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

        squareCo = parseInt(squareCo);
        middleTerm = parseInt(middleTerm);
        constTerm = parseInt(constTerm);

        if (!op1plusexp) {
            middleTerm = -middleTerm;
        }
        if (!op2plusexp) {
            constTerm = -constTerm;
        }

        var theirAnswer = {
            squareCo: squareCo,
            middleTerm: middleTerm,
            constTerm: constTerm
        };

        swOpExp(1, true);
        swOpExp(2, true);

        isCorrect(theirAnswer, answer);

        $('#squareco').val('1');
        $('#mid, #const').val('');

        var isCoAllowed = $('#allowCos').prop('checked');

        if (isCoAllowed) return $('#squareco').focus();

        $('#mid').focus();

    }

});

function isCorrect(theirAnswer, correctAnswer) {
    if (theirAnswer.squareCo === correctAnswer.squareCo && theirAnswer.constTerm === correctAnswer.constTerm && theirAnswer.middleTerm === correctAnswer.middleTerm) {
        alert('Correct!');
        setScore(type, getScore(type) + 5);
        console.log('Congratulations!  Your score in ' + type + 'ing is now ' + getScore(type));
        displayProblem();
    } else {
        alert('Incorrect!');
        if (getScore(type) >= 5) {
            console.log(getScore(type) - 5);
            setScore(type, getScore(type) - 5);
        } else {
            setScore(type, 0);
        }
        console.log('Oops! Try again.  Your score in ' + type + 'ing is now ' + getScore(type));
    }

    var scores = getPercentage();
    factorPerc = scores.factor;
    expandPerc = scores.expand;
    totalPerc = scores.total;

    updateScores();

    if (factorPerc === 100 && hasCompleted.factor.get() === false) {
        alert('Congratulations!  You have mastered factoring!');
        hasCompleted.factor.set(true);
        type = 'expand';
        displayProblem();
        var allowCos = $('#allowCos').prop('checked');
        if (allowCos) {
            $('#squareco').focus();
        } else {
            $('#mid').focus();
        }
    } else if (expandPerc === 100 && hasCompleted.expand.get() === false) {
        alert('Congratulations!  You have mastered expanding!');
        hasCompleted.expand.set(true);
        type = 'factor';
        var allowCos = $('#allowCos').prop('checked');
        if (allowCos) {
            $('#squareco1').focus();
        } else {
            $('#const1').focus();
        }
        displayProblem();
    } else if (totalPerc === 100 && hasCompleted.total.get() === false) {
        alert('Congratulations!  You have mastered both!');
        hasCompleted.total.set(true);
    }

}

$('#op1').click(function() {
    swOp(1, !op1plus);
});

$('#op2').click(function() {
    swOp(2, !op2plus);
});

$('#op1exp').click(function() {
    swOpExp(1, !op1plusexp);
});

$('#op2exp').click(function() {
    swOpExp(2, !op2plusexp);
});

$('#nums').submit(function(event) {
    event.preventDefault();
    updateScores();
    displayProblem();
});

var type = 'factor';

$('#factor').click(function() {
   type = 'factor';
   displayProblem();
   var allowCos = $('#allowCos').prop('checked');
   if (allowCos) {
       $('#squareco1').focus();
   } else {
       $('#const1').focus();
   }
});

$('#expand').click(function() {
    type = 'expand';
    displayProblem();
    var allowCos = $('#allowCos').prop('checked');
    if (allowCos) {
        $('#squareco').focus();
    } else {
        $('#mid').focus();
    }
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

        var coefficients = genCos(minNum, maxNum);

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
        problem = problem.replace(/\(0x/g, '');
        problem = problem.replace(/\(0x/g, '');
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