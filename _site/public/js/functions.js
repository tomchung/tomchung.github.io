function randomize() {
	items = [
	    { image : 'umbra-shift/tom-chung-umbra-shift-11.jpg', link : 'umbra-shift' },
	    { image : 'spun-lights/tom-chung-spun-lights-01.jpg', link : 'spun-lights' },
	    { image : 'working-title/tom-chung-working-title-10.jpg', link : 'working-title' }
	]
	var item = items[Math.floor(Math.random()*items.length)];
	$('.cover-image').css({ 'background-image' : 'url("public/images/' + item.image + '")'});
	$('.hero-link').attr({'href' : '/projects/' + item.link });
}

function reveal() {	
	window.scrollTo(0, 0);
	
	randomize();
	
	$('.cover-image').imagesLoaded( { background: true }, function() {
		$('.cover-image').css({ 'opacity' : 1 });
	});
	
	setTimeout(function() {
		$('#content').css({ 'opacity' : 1 });
	}, 50);
}

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
	$('.gallery img').each(function(i) {
		var img = $(this);
		getImageSize(img, function(width, height) {
		    var ratio = (height / width) * 100;
		    img.parent().css({ 'padding-bottom' : ratio + '%' });
		});
	}).promise().done(function() {
		setTimeout(function() {
			$('.image-wrap').css({ 'background-color' : '#222' });
		}, 100);
		setTimeout(function() {
			$('.gallery').imagesLoaded().progress(function(instance, image) {
				$(image.img).css({ 'opacity' : 1 });
			});
		}, 800);
	});
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

$(document).ready(function() {
	reveal();
	size();
	
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
