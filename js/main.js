var stufz = [];
var age = Lockr.get('age');

if (age === null) {
    // Ask for age
}

$.getJSON('http://superstufz.com/data/games.json', onGet);

function onGet(res) {
    stufz = res;
    console.log(stufz);
    pushStufz();
}

function pushStufz() {
    $.each(stufz, function (i, stuf) {
        var title = stuf.title;
        var desc = stuf.description;
        var img = stuf.img;
        var id = stuf.id;
        showGame({
            title: title,
            desc: desc,
            img: img,
            id: id
        });
    });
}

function showGame(opts) {
    console.log(opts);
    var url = "https://superstufz.com/games/" + opts.id;
    $('#games').append('<div class="panel panel-body" id="' + opts.id + '">');
    var gameElem = $('#' + opts.id);
    console.log(gameElem);
    gameElem.append("<h3 class='text-center'>" + opts.title + "</h3>");
    gameElem.append("<p class='text-center'>" + opts.desc + "</p>");
    gameElem.append('<img class="center-block thumbnail" src="' + opts.img + '" />');
    gameElem.click(function () {
        location.href = url;
    });
    gameElem.append('<div class="divider"></div>');
}
