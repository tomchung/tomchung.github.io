function reveal() {
	window.scrollTo(0, 0);

	$(".gallery").imagesLoaded().progress(function(t, n) {
        $(n.img).css({ 'opacity' : 1 })
    });

	setTimeout(function() {
		document.getElementById("content").style.opacity = 1;
	}, 50);

	rotateImages(500);
}

function showVideo(e) {
	e = e || window.event;
    var target = e.target || e.srcElement;
    target.style.opacity = 1;
}

function hide() {
	document.getElementById("content").style.opacity = 0;
}

function pin() {
	var stickyColumn   = document.getElementById("sticky-column");

	if (stickyColumn) {
		var contentHeight  = stickyColumn.clientHeight,
			windowHeight   = document.documentElement.clientHeight,
			windowWidth    = document.documentElement.clientWidth,
			scrollPosition = document.body.scrollTop;

		if ((contentHeight > windowHeight) && (windowWidth > 1020)) {
			stickyColumn.style.top = -(contentHeight - windowHeight) + "px";
		} else {
			stickyColumn.style.top = "";
		}

		if (scrollPosition > (contentHeight - windowHeight)) {
			stickyColumn.classList.add('pinned');
		} else {
			stickyColumn.classList.remove('pinned');
		}
	}
}

function getPosition(element) {
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
}

function rotateImages(speed) {
	var homepageGallery = document.getElementById("image-rotation");

	if (homepageGallery) {
		var images = homepageGallery.querySelectorAll(".slide"),
			currentIndex = 0;

		setInterval(function() {
			if (currentIndex == images.length - 1) {
				currentIndex = 0;
			} else {
				currentIndex++;
			}

			Object.values(images).forEach(function(element, index) {
				if (index == currentIndex) {
					element.style.opacity = 1;
				} else {
					element.style.opacity = 0;
				}
			});
		}, speed);
	}
}

function scrollToTop(scrollDuration) {
    var cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
    function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
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
		var currentLocation = document.location.pathname + decodeURIComponent(document.location.search);
		if (currentLocation == this.pathname) {
			scrollToTop(800);
		} else {
			History.pushState({}, "", this.pathname);
			hide();
		}
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

	if ('ontouchstart' in document) {
	    $('body').removeClass('no-touch');
	}
});
