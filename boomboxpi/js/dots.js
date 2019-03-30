var kebab = document.querySelector('.kebab'),
    middle = document.querySelector('.middle'),
    cross = document.querySelector('.cross'),
    dropdown = document.querySelector('.m-dropdown');

$('.kebab').click(function() {
  middle.classList.toggle('active');
  cross.classList.toggle('active');
  dropdown.classList.toggle('active');
});

$(document).click(function(){
    middle.classList.remove('active');
    cross.classList.remove('active');
    dropdown.classList.remove('active');
});

$(".kebab").click(function(e){
    e.stopPropagation();
});

