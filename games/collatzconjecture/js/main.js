$('#number').focus();

function calculate(number) {
    if (number <= 0) return;
    if (number % 1 !== 0) return;
    if (number == 1) return 0;
    var counter = 0;
    var n = number;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n/2;
        } else {
            n = 3*n + 1;
        }
        counter++;
    }
    return counter;
}

$('#calculate').click(doCalculations);
$('#number').keydown(function (e) {
    if (e.keyCode === 13) {
        doCalculations();
    }
});

function doCalculations() {
    var number = $('#number').val();
    var steps = calculate(number);
    if (steps === undefined) {
        alert('Please enter a positive integer.');
        return;
    }
    $('#feedback').text('It took ' + steps + ' steps!');
    $('#number').val('');
}
