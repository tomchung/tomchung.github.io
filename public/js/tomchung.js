$(document).ready(function() {
	size();
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
			size();
			setTimeout(function() {
				$('#content').html($(data).find('#content').children());
				reveal();	
				pin();			
			}, 500);
		});
	});
});

function getImageSize(img, callback) {
    var $img = $(img);

    var wait = setInterval(function() {
        var w = $img[0].naturalWidth,
            h = $img[0].naturalHeight;
        if (w && h) {
            clearInterval(wait);
            callback.apply(this, [w, h]);
        }
    }, 30);
}

function size() {
	$('.gallery img').each(function() {
		var img = $(this);
		getImageSize($(this), function(width, height) {
		    img.attr({'height': height, 'width': width });
		});
	});
}

function reveal() {
	
	window.scrollTo(0, 0);
	
	$('.gallery').imagesLoaded().progress(function(instance, image) {
		$(image.img).css({ 'opacity' : 1 });
	});
	
	$('.cover-image').imagesLoaded( { background: true }, function() {
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
