var locked = false;
var prevVol = 50;

$(document).ready(function() {
    document.getElementById('volume').oninput = function(){
        prevVol = this.value;
        setVolume(this.value);
    }
    $('#lock-icon').click(function() {
        if (locked)
        {
            $(this).removeClass('fa-lock');
            $(this).addClass('fa-unlock-alt');
        } 
        else
        {
            $(this).removeClass('fa-unlock-alt');
            $(this).addClass('fa-lock');
        }
        locked = !locked;
        updateLock(locked);
    });
    
    $('.vol-low').click(function() {
        document.getElementById('volume').value = 0;
        setVolume(0);
    });

    $('.vol-high').click(function() {
        document.getElementById('volume').value = prevVol;
        setVolume(prevVol);
    });
});

function updateLock(locked)
{

}

function setVolume(val)
{

}