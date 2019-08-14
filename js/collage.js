var numPics=50;
var numPolaroids = 10;
function generateCollage()
{ 
    var pics = "";
    var order = [];
    var cardWidth = $('figure').width();
    var cardHeight = $('figure').outerHeight(false);

    var pageWidth = $(window).width();
    var pageHeight = $(window).height();

    var numCol = Math.floor(pageWidth / cardWidth) + 1;
    var numRow = Math.floor(pageHeight / cardHeight) + 1;

    var x = (pageWidth - numCol*cardWidth)/2 - 20;
    var y = (pageHeight - numRow*cardHeight)/2 - 50;

    for (var a = 1; a < numPics+1; a++) {
        order.push(a);
    }

    for (var a = 0; a < numRow; a++) {
        for (var b = 0; b < numCol; b++) {
            var index = Math.floor((Math.random() * order.length));
            var pic = order.splice(index, 1);
            pics += genPic(b*cardWidth + x, a*cardHeight + y, cardWidth, cardHeight, pic);
        }
    }

    $('#collage-container').html(pics);
}

function genPic(x, y, width, height, index) 
{
    var rot = Math.floor((Math.random() * 20) - 10)+'deg';
    var pic = '<figure '
               +'style="'
                    + 'left: '+x+'px;'
                    + 'top: '+y+'px;'
                    + 'width: '+width+'px;'
                    + 'padding-bottom: '+height+'px;'
                    + '-webkit-transform: rotate('+rot+');'
                    + '-moz-transform: rotate('+rot+');'
                    + '-o-transform: rotate('+rot+');'
                    + '-ms-transform: rotate('+rot+');'
                    + 'transform: rotate('+rot+');'
               +'" >'
               + '<div class="img" style="background-image: url(\'img/myLife/1 ('+index+').jpg\');"></div>'
               + '<figcaption></figcaption>'
               + '</figure>';
    return pic
}