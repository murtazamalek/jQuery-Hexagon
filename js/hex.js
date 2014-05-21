// Plugin definition.
(function( $ ){
	
	var hexGrid	= function (element, options){
		
		// Extend our default options with those provided.
		var opts = $.extend( {}, $.fn.hexgrid.defaults, options );
		
		var init = function (element){
			
			var $this			= $(element),
				$height			= $(window).height(),
				totalRow		= Math.round( $height / (opts.width/2) ),
				$width			= $(window).width(),
				$elem_per_row	= Math.round($width/(opts.width*2)) + 1,
				$totalElem		= totalRow * $elem_per_row;
			
			for(var e=0;e<$totalElem;e++){
				$this.append('<div data-mode="color" data-color="#EEE"></div>')
			}
			
			var elems 	= $this.children('div');
			
			// hide all elems
			elems.hide();
			
			// add grid container
			var $wrapper = $('<div />').attr('class','hexgrid-container');
			$wrapper.width($width);
			$this.after($wrapper);
			
			var c = 0;
			elems.each(function (i){
				
				if (i%$elem_per_row == 0)
				{
					c = 0;
					$rowWrapper = $("<div class='hexgrid-row'></div>");
					$wrapper.append($rowWrapper);
				}

				var $itemWrapper	= $( "<div class='hexagon'></div>" ),
					$itemOuter		= $( "<div class='hex-outer'></div>" ),
					$itemInner		= $( "<div class='hex-inner'></div>" );
				
				$itemWrapper.css({
					'width'	: opts.width*2,
					'height': opts.width
				});
				
				// check for mode
				if($(this).data('mode') == "image") // image mode 
				{
					var image	= $(this).data('image'),
						clr		= $(this).data('color');
					
					$itemInner.css("background", clr);
					
					$itemInner.hover(function (){
						$itemInner.css("background", "url(" + image + ") no-repeat center");
					},function (){
						$itemInner.css("background", clr);	
					});
				}
				else if($(this).data('mode') == "color") // color mode 
				{
					var clr	= $(this).data('color'),
						hvr	= $(this).data('hover');
					
					$itemInner.css("background-color", clr);
					
					$itemInner.hover(function (){
						$itemInner.css("background-color", hvr);
					},function (){
						$itemInner.css("background-color", clr);	
					});
				}
				
				$itemOuter.append($itemInner);
				$itemWrapper.append($itemOuter);
				$rowWrapper.append($itemWrapper);
				c++;
			});
			
			// set width and height of each row
			$wrapper.children(".hexgrid-row").each(function (){
				$(this).css({
					'width': $(this).children('.hexagon').length * (opts.width*2),
					'height': opts.width
				})
			});
			
			// set top margin for each row
			$wrapper.children('.hexgrid-row').each(function (i){
				if(i==0){
					$(this).css('margin-top' , -((opts.width/2)+5));
				}else{
					$(this).css('margin-top' , -((opts.width/2)-5));
				}
			});
			
			// shilt every even row with minus margin
			$wrapper.children(".hexgrid-row:even").css('margin-left' , -opts.width);
			
			// caculate the container height
			var rowCount= $wrapper.children(".hexgrid-row").length;
				$wrapper.height(((opts.width/2)*(rowCount))+5);
		};
		
		var windowFit = function (element){
			var $this	= $(element);
			$(".hexgrid-container").remove();
			init(element);
		};
		
		// init plugin 
		init(element);
		
		// setup window resize event 
		$(window).bind('resize', function (){
			windowFit(element);
		});
	};
	
	$.fn.hexgrid = function( options ) {
		return this.each(function (key, value){
			var hex = new hexGrid(this, options);
		});
	};
	
	// Plugin defaults
	$.fn.hexgrid.defaults = {
		width	: 100
	};
})(jQuery);