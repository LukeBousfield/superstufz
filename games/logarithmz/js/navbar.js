$('#play').show();
$('#options').hide();
$('#instructions').hide();

$('#openNav').click(openNav)

$('#closeNav').click(closeNav);

$('#playBtn').click(play);

$('#optionsBtn').click(options);

$('#instructionsBtn').click(instructions);

function openNav() {
  $('#sidenav').css('width', '250px');
}

function closeNav() {
  $('#sidenav').css('width', '0');
}

function play() {
  $('#play').show();
  $('#options').hide();
  $('#instructions').hide();
  closeNav();
}

function options() {
  $('#play').hide();
  $('#options').show();
  $('#instructions').hide();
  closeNav();
}

function instructions() {
  $('#play').hide();
  $('#options').hide();
  $('#instructions').show();
  closeNav();
}
