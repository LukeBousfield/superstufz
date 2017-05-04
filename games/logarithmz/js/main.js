var MIN_BASE_DEFAULT = 0;
var MAX_BASE_DEFAULT = 15;
var MIN_EXP_DEFAULT = -3;
var MAX_EXP_DEFAULT = 3;
var globalProbswer;
var minBase = MIN_BASE_DEFAULT;
var maxBase = MAX_BASE_DEFAULT;
var minExp = MIN_EXP_DEFAULT;
var maxExp = MAX_EXP_DEFAULT;
var streak = 0;
var mode = 'evaluate';

$('#answer').focus();

// Generate problem/answer
function generateProbswer() {

    // Generate random base
    var base = parseInt(randomInt(parseInt(minBase), parseInt(maxBase)));
    // Generate random exponent (answer)
    var exp = parseInt(randomInt(parseInt(minExp), parseInt(maxExp)));

    var otherNumberRaw;

    console.log(parseInt(minBase), parseInt(maxBase));

    console.log(base, exp);

    // Calculate other number
    if (exp >= 0) {
        var otherNumber = Math.pow(base, exp);
        otherNumberRaw = otherNumber;
    } else {
        console.log(exp);
        otherNumberRaw = Math.pow(base, -1*exp)
        var otherNumber = '<table style="display: inline"><tbody><tr><td style="border-bottom:solid 1px">1</td></tr><tr><td>' + otherNumberRaw + '</td></tr></tbody></table>';
    }

    if (mode === 'evaluate') {
      $('#argTable').hide();
      $('#answer').show();
      if (base === 0 || base === 1 || otherNumber === 0) return generateProbswer();
    } else if (mode === 'base') {
      $('#argTable').hide();
      $('#answer').show();
      if (exp === 0) return generateProbswer();
    } else if (mode === 'argument') {
      if (base === 0) return generateProbswer();
      if (exp < 0) {
        console.log('running, sir');
        $('#argTable').css('display', 'inline');
        $('#answer').hide();
      } else {
        $('#argTable').hide();
        $('#answer').show();
        $('#answer').focus();
      }
    }

    var problem = {
        base: base,
        otherNumber: otherNumber,
        otherNumberRaw: otherNumberRaw
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
$('#answer, #argAnswer').keydown(function (e) {
    if (e.keyCode === 13) {
        // Take input
        takeInput();
    }
})

function takeInput() {
    // Check answer
    var theirAnswer = (mode === 'argument' && globalProbswer.answer < 0) ? 1/$('#argAnswer').val() : $('#answer').val();
    var correct;

    if (mode === 'evaluate') {
      correct = (theirAnswer.toString() === globalProbswer.answer.toString());
      $('#answer').focus();
    } else if (mode === 'base') {
      correct = (theirAnswer.toString() === globalProbswer.problem.base.toString());
      $('#argAnswer').focus();
    } else if (mode === 'argument') {
      if (globalProbswer.answer < 0) {
        correct = (theirAnswer.toString() === (1/globalProbswer.problem.otherNumberRaw).toString());
      } else {
        correct = (theirAnswer.toString() === globalProbswer.problem.otherNumberRaw.toString());
      }
      $('#argAnswer').focus();
    }

    // If right
    if (correct) {
        // Display "Correct!"
        console.log('Correct!');
        $('#status').text('Correct!');
        $('#status').css('color', '#7CFC00');
        displayProblem();
        streak++;
        $('#streak').css('color', 'rgb(' + streak*50 + ',0,0)');
        console.log($('#streak').attr('style'));
        $('#streak').text('Streak: ' + streak);
    } else if (globalProbswer.answer.toString() !== answer.toString()) {
        // Display "Incorrect!"
        console.log('Incorrect!');
        $('#status').text('Incorrect!');
        $('#status').css('color', '#ff0000');
        $('#streak').css('color', 'rgb(0,0,0)');
        $('#streak').text('Streak: 0');
        streak = 0;
    }
    // Clear input
    $('#answer').val('');
    $('#argAnswer').val('');
}

function displayProblem() {
    console.log(mode);
    // Display problem
    var probswer = generateProbswer();
    globalProbswer = probswer;
    if (mode === 'evaluate') {
      $('#problem').html('x = log' + probswer.problem.base.toString().sub() + probswer.problem.otherNumber);
      $('#answer').focus();
    } else if (mode === 'base') {
      $('#problem').html(probswer.answer + ' = log' + 'x'.sub() + probswer.problem.otherNumber);
      $('#answer').focus();
    } else if (mode === 'argument') {
      $('#problem').html(probswer.answer + ' = log' + probswer.problem.base.toString().sub() + 'x');
      $('#argAnswer').focus();
    }
    $('#answer, #argAnswer').val('');
}

displayProblem();

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#selectEvaluate').click(function () {
  mode = 'evaluate';
  displayProblem();
});

$('#selectBase').click(function () {

  mode = 'base';
  displayProblem();
});

$('#selectArgument').click(function() {
  mode = 'argument';
  displayProblem();
});
