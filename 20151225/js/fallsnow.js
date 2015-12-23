(function($) {
	$.fn.fallsnow = function(imgs, amount) {
		if(imgs==null){
            imgs=["images/0.gif","images/1.gif","images/2.gif","images/3.gif","images/4.gif","images/5.gif"];
        }
		if(amount==null){
            amount=20;
        }
		return this.each(function() {
			$.snow(this, imgs, amount);
		});
	}

	$.snow = function(self, imgs, amount) {
		self = $(self);
		self.css('overflow', 'hidden');

        var iniSize=12;
        var imgTemp="images/6.gif";

        var posY = new Array();
		var posX = new Array();
		var speed = new Array();
		var step = new Array();
		var cstep = new Array();
		var xysize = new Array();
        var sizeAjust= new Array();

		for (i = 0; i < amount; i++) {
			var P = Math.floor(Math.random() * imgs.length);
			rndimg = imgs[P];
			self.append('<img id="si" src="' + rndimg
					+ '" style="display:none">');
		}

		var height = self.height();
		var width = self.width();
		for (i = 0; i < amount; i++) {
			posY[i] = Math.round(Math.random() * height)-height;
			posX[i] = Math.round(Math.random() * width);
			speed[i] = Math.random() * 3 + 2;
			cstep[i] = 0;
			step[i] = Math.random() * 0.1 + 0.05;
			xysize[i] = Math.random() * (iniSize-1) + 1;
		}
        
        self.resize(function(e){
		  var height = self.height();
		  var width = self.width();
        });

		window.setInterval(function() {
			for (i = 0; i < amount; i++) {
				sy = speed[i] * Math.sin(90 * Math.PI / 180);
				sx = speed[i] * Math.cos(cstep[i]);
				posY[i] += sy;
				posX[i] += sx;
				if (posY[i] > height) {
					posY[i] = -60;
					posX[i] = Math.round(Math.random() * width);
					speed[i] = Math.random() * 5 + 2;
                    if(i>2){
                        $(si[i]).attr('src',imgTemp);
                    }
				}
				if (posY[i] < 0) {
					xysize[i] = Math.random() * (iniSize-1) + 1;
					$(si[i]).css('display', 'none');
				} else if (posY[i] > 1) {
					$(si[i]).css('display', 'block');
                    sizeAjust[i]=iniSize*posY[i]/height;
				}

				$(si[i]).css('margin-left', posX[i]);
				$(si[i]).css('margin-top', posY[i]);
				$(si[i]).css('width', xysize[i]+sizeAjust[i]);
				$(si[i]).css('height', xysize[i]+sizeAjust[i]);
				$(si[i]).css('position', 'absolute');
				$(si[i]).css('z-index', 100);
				cstep[i] += step[i];
			}
		}, 100);
	}

})(jQuery);
