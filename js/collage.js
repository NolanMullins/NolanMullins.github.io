var numPics=50;
var numPolaroids = 20;
function generateCollage()
{ 
    var pics = "";
    var order = [];
    for (var a = 1; a < numPics+1; a++) {
        order.push(a);
    }
    for (var a = 0; a < numPolaroids; a++) {
        var index = Math.floor((Math.random() * order.length));
        var pic = order.splice(index, 1);
        pics += genPic($(window).width()-270, $(window).height()-336, -50, pic);
    } 
    $('.pics').html(pics);
}

function genPic(maxX, maxY, padding, index) 
{
    var rot = Math.floor((Math.random() * 20) - 10)+'deg';
    var left = Math.floor((Math.random() * maxX) +0)+'px';
    var top = Math.floor((Math.random() * maxY) -50)+'px';
    var pic = '<figure '
               +'style="'
                    + 'left: '+left+';'
                    + 'top: '+top+';'
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