$('#applyChanges').click(applyChanges);
$('#minBase, #maxBase, #minExp, #maxExp').keydown(function (e) {
  if (e.keyCode === 13) applyChanges();
});

function applyChanges() {
  var minBaseLocal = $('#minBase').val();
  var maxBaseLocal = $('#maxBase').val();
  var minExpLocal = $('#minExp').val();
  var maxExpLocal = $('#maxExp').val();

  if (minBaseLocal < 0 || maxBaseLocal < 0) return alert('Please do not enter a minimum or maximum base less than 0');
  if (Math.ceil(minBaseLocal) >= Math.floor(maxBaseLocal)) return alert('Please make your maximum base greater than your minimum base');
  if (minExpLocal >= maxExpLocal) return alert('Please make your maximum exponent greater than your minimum exponent');

  minBase = minBaseLocal;
  maxBase = maxBaseLocal;
  minExp = minExpLocal;
  maxExp = maxExpLocal;

  displayProblem();

  play();

}
