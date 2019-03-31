var locked = false;

$(document).ready(function() {
    document.getElementById('volume').oninput = function(){
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
});

function updateLock(locked)
{

}

function setVolume(val)
{

}