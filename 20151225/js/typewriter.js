(function($) {
	$.fn.typewriter = function(timeout,callback) {
		this.each(function() {
			var d = $(this), c = d.html(), b = 0;
			d.html("");
            d.toggle('slow',function(){
            setTimeout(function(){
			var e = setInterval(function() {
				var f = c.substr(b, 1);
				if (f == "<") {
					b = c.indexOf(">", b) + 1;
				} else {
					b++;
				}
				d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
				if (b >= c.length) {
					clearInterval(e);
                    setTimeout(function(){
                        d.fadeToggle('slow',function(){
                            setTimeout(function(){
                                callback();
                            },2000);
                        });
                    },2000);
				}
			}, 75);},timeout);
            });
		});
		return this;
	}
})(jQuery);

(function($) {
	$.fn.centershow = function() {
		this.each(function() {
		});
		return this;
	}
})(jQuery);
