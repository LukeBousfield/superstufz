var stufz = [];

$.getJSON('http://superstufz.com/data/games.json', onGet);

function onGet(res) {
    stufz = res;
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
    var url = "https://superstufz.com/games/" + opts.id;
    $('#games').append('<div id="' + opts.id + '">');
    var gameElem = $(opts.id);
    gameElem.append("<h3>" + opts.title + "</h3>");
    gameElem.append("<p>" + opts.desc + "</p>");
    gameElem.append('<img src="' + opts.img + '" />');
    gameElem.click(function () {
    location.href = 'https://superstufz.com/' + opts.id;
    });
}
