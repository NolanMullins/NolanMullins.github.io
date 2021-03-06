var pageTransition = {
    
    currentPageIndex: 0,
    
    pages: [],
    
    transitions: {
        'fromTop': {
            'reverse': 'toTop',
            'oppositeOut': 'toBottom',
            'oppositeIn': 'fromBottom',
        },
        'fromRight': {
            'reverse': 'toRight', 
            'oppositeOut': 'toLeft',
            'oppositeIn': 'fromLeft',
        },
        'fromBottom': {
            'reverse': 'toBottom', 
            'oppositeOut': 'toTop',
            'oppositeIn': 'fromTop',
        },
        'fromLeft': {
            'reverse': 'toLeft', 
            'oppositeOut': 'toRight',
            'oppositeIn': 'fromRight',
        },
    },
    
    transitionEndEventName: {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    },
    
    addPage: function(pageSelector, transitionName) {
        var page = {
            'selector': pageSelector,
            'transitionName': transitionName
        };
        this.pages.push(page);
    },

    getPage: function(index) {
        return this.pages[index] ? this.pages[index] : false;
    },
    
    getCurrentPage: function() {
        return this.pages[this.currentPageIndex] ? this.pages[this.currentPageIndex] : false;
    },
    
    getPreviousPage: function() {
        return this.pages[this.currentPageIndex - 1] ? this.pages[this.currentPageIndex - 1] : false;
    },
    
    getNextPage: function() {
        return this.pages[this.currentPageIndex + 1] ? this.pages[this.currentPageIndex + 1] : false;
    },
    
    first: function() {
        this.transitionEvent = this.transitionEndEventName[Modernizr.prefixed('animation')];
        
        if(!this.getCurrentPage())
            return false;
        
        this.transitionPageIn(this.getCurrentPage(), this.getCurrentPage().transitionName);
    },
    
    next: function() {      
        if(!this.getNextPage()) {
            return false;
        }
        
        if(this.getCurrentPage()) {
            this.transitionPageOut(this.getCurrentPage(), this.transitions[this.getNextPage().transitionName].oppositeOut);
        }
        
        this.transitionPageIn(this.getNextPage(), this.getNextPage().transitionName);
        this.currentPageIndex++;
    },
    
    previous: function() {
        if(!this.getPreviousPage())
            return false;
        
        this.transitionPageOut(this.getCurrentPage(), this.transitions[this.getCurrentPage().transitionName].reverse);
        this.transitionPageIn(this.getPreviousPage(), this.transitions[this.getCurrentPage().transitionName].oppositeIn);
        this.currentPageIndex--;
    },

    gotoPage: function(index) {
        if (!this.pages[index] || this.currentPageIndex === index) {
            return false;
        }
        var prevPage = this.currentPageIndex;
        this.currentPageIndex = index;
        this.transitionPageOut(this.pages[prevPage], this.transitions[this.pages[prevPage].transitionName].oppositeOut);
        this.transitionPageIn(this.pages[index], this.pages[index].transitionName);
    },

    goBackPage: function(index) {
        if (!this.pages[index] || this.currentPageIndex === index) {
            return false;
        }
        var prevPage = this.currentPageIndex;
        this.currentPageIndex = index;
        this.transitionPageOut(this.pages[prevPage], this.transitions[this.pages[prevPage].transitionName].reverse);
        this.transitionPageIn(this.pages[index], this.transitions[this.pages[index].transitionName].oppositeIn);
    },
    
    transitionPageIn: function(page, pageTransitionName) {
         $(page.selector)
            .removeClass (function (index, css) {
                return (css.match (/(^|\s)page--animation-\S+/g) || []).join(' ');
            })
            .addClass('page--animation-' + pageTransitionName)
            .addClass('page--animation-' + pageTransitionName + '--animate')
            .addClass('page--current');
    },
    
    transitionPageOut: function(page, pageTransitionName) {        
        var context = this;
         $(document).on(this.transitionEvent, page.selector, function() {
            $(document).off(context.transitionEvent);
            $(page.selector)
                .removeClass (function (index, css) {
                    return (css.match (/(^|\s)page--animation-\S+/g) || []).join(' ');
                })
                .removeClass('page--current');
        });

         $(page.selector)
            .removeClass (function (index, css) {
                return (css.match (/(^|\s)page--animation-\S+/g) || []).join(' ');
            })
            .addClass('page--animation-' + pageTransitionName)
            .addClass('page--animation-' + pageTransitionName + '--animate')
            .addClass('page--current');
    }
    
};

$(document).ready(function() {
    // First, add all pages to pageTransition
    $('.page').each(function(index) {
        var className = 'number-' + index;
        $(this).addClass(className);
        pageTransition.addPage('.' + className, $(this).data('transition'));
    });

    pageTransition.first();

    var $grid = $('.grid').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.grid-item',
        // use element for option
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
    });

    $('.arrow--left').on('click', function() {
        pageTransition.previous();
    });

    $('.arrow--right').on('click', function() {
        pageTransition.next();
    });
});

function gotoPage(index)
{
    pageTransition.gotoPage(index);
}

function goHome() 
{
    pageTransition.goBackPage(0);
}
