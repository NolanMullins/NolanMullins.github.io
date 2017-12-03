$(".scroll-menu li a[href^='#']").on('click', function(e) {

    // This sets the hash
    var target;
    target = this.hash;

    // Prevent default anchor click behavior
    e.preventDefault();

    // The grabs the height of my header
    var navOffset;
    navOffset = $('#header').height();
    console.log("nav " + navOffset);
    // Animate The Scroll
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top - navOffset
    }, 800, function(){

    // Adds hash to end of URL
    return window.history.pushState(null, null, target);

    });

});