$(document).ready(function() {
	
	reveal();
	
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
				pin();			
			}, 500);
		});
	});
	
});

function reveal() {
	window.scrollTo(0, 0);
	
	$('.gallery').imagesLoaded().progress( function( instance, image ) {
		$(image.img).css({ 'opacity' : 1 });
	});
	
	$('.cover-image').imagesLoaded( { background: true }, function() {
		$('.cover-image').css({ 'opacity' : 1 });
	});
	
	setTimeout(function() {
		$('#content').css({ 'opacity' : 1 });
	}, 50);

/*
	$('.content').imagesLoaded().always( function( instance ) {
		$('#spinner').css({ 'display' : 'none' });  
	});
*/
}

function hide() {
	$('#content').css({ 'opacity' : 0 });
	// $('#spinner').css({ 'display' : 'block' });  
}

function pin() {
	var stickyColumn   = $('.sticky-column');
	var contentHeight  = stickyColumn.outerHeight();
	var windowHeight   = $(window).height();
	var scrollPosition = $(window).scrollTop();
	
	if (contentHeight > windowHeight) {
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
