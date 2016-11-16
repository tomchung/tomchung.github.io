function randomize() {
	items = [
	    { image : 'spun-sconce/tom-chung-sc-01.jpg', link : 'spun-sconce' },
	    { image : 'working-title/tom-chung-working-title-10.jpg', link : 'working-title' },
	    { image : '68-claremont/tom-chung-68-claremont-07.jpg', link : '68-claremont' },
	    { image : 'laser-cut-stools/tom-chung-laser-cut-stools-01.jpg', link : 'laser-cut-stools' }
	];
	var item = items[Math.floor(Math.random()*items.length)];
	$('.cover-image').css({ 'background-image' : 'url("public/images/' + item.image + '")'});
	$('.hero-link').attr({'href' : '/projects/' + item.link });
}

function reveal() {	
	window.scrollTo(0, 0);
	
	randomize();
	
	$(".gallery").imagesLoaded().progress(function(t, n) {
        $(n.img).css({ 'opacity' : 1 })
    });
	
	$('.cover-image').imagesLoaded({ background: true }, function() {
		$('.cover-image').css({ 'opacity' : 1 });
	});
	
	setTimeout(function() {
		$('#content').css({ 'opacity' : 1 });
	}, 50);
}

function hide() {
	$('#content').css({ 'opacity' : 0 });
}

function pin() {
	var stickyColumn   = $('.sticky-column');
	var contentHeight  = stickyColumn.outerHeight();
	var windowHeight   = $(window).height();
	var windowWidth    = $(window).width();
	var scrollPosition = $(window).scrollTop();
	
	if ((contentHeight > windowHeight) && (windowWidth > 1020)) {
		stickyColumn.css({ 'top' : -(contentHeight - windowHeight) });
	} else {
		stickyColumn.css({ 'top' : '' });
	}
	
	if (scrollPosition > (contentHeight - windowHeight)) {
		stickyColumn.addClass('pinned');
	} else {
		stickyColumn.removeClass('pinned');
	}
}

$(document).ready(function() {
	reveal();
	
	document.addEventListener('touchstart', function(){}, true);
	
	$(window).bind('load resize scroll', function() {
		pin();
	});
	
	var siteUrl = 'http://'+(document.location.hostname||document.location.host);
	
	$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click tap", function(e) {
		e.preventDefault();
		History.pushState({}, "", this.pathname);
		hide();
	});

	History.Adapter.bind(window, 'statechange', function() {
		var State = History.getState();
		$.get(State.url, function(data){
			document.title = data.match(/<title>(.*?)<\/title>/)[1];
			setTimeout(function() {
				$('#content').html($(data).find('#content').children());
				reveal();
				size();	
				pin();			
			}, 500);
		});
	});
	
	if ('ontouchstart' in document) {
	    $('body').removeClass('no-touch');
	}
});
