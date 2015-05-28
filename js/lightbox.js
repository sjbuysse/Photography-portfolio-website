$(document).ready(function(){
	var imgLocation, title, large_img;
	var CW, CH, imgtag;
	//Flag for preventing multiple image displays
	var lb_loading = false;
	var doc = $(document);
	
	$(".image-gallery a").click(function(event) {
		if(lb_loading){return false;}
		lb_loading = true;
		
		event.preventDefault();
		//Remove active class from previously clicked LI
		$(".image-gallery li.active").removeClass("active");
		$(this).parent("li").addClass("active");
		//Adding additional HTML - only if it hasn't been added before
		if($('.lb_backdrop').length <1){
			var $lb_backdrop = $('<div class="lb_backdrop"></div');
			var $lb_canvas = $('<div class="lb_canvas"></div>');
			var $lb_controls = $('<div class="lb_controls"></div>');
			var $lb_previous = $('<div class="lb_previous"><svg version="1.1" id="Chevron_left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path class="chevron-left" d="M12.452,4.516c0.446,0.436,0.481,1.043,0,1.576L8.705,10l3.747,3.908c0.481,0.533,0.446,1.141,0,1.574 							c-0.445,0.436-1.197,0.408-1.615,0c-0.418-0.406-4.502-4.695-4.502-4.695C6.112,10.57,6,10.285,6,10s0.112-0.57,0.335-0.789							c0,0,4.084-4.287,4.502-4.695C11.255,4.107,12.007,4.08,12.452,4.516z"/></svg></div>');
			var $lb_title = $('<div class="lb_title"></div>');
			var $lb_next = $('<div class="lb_next"><svg version="1.1" id="Chevron_right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">	<path class="chevron-right" d="M9.163,4.516c0.418,0.408,4.502,4.695,4.502,4.695C13.888,9.43,14,9.715,14,10s-0.112,0.57-0.335,0.787 c0,0-4.084,4.289-4.502,4.695c-0.418,0.408-1.17,0.436-1.615,0c-0.446-0.434-0.481-1.041,0-1.574L11.295,10L7.548,6.092 c-0.481-0.533-0.446-1.141,0-1.576C7.993,4.08,8.745,4.107,9.163,4.516z"/></svg></div>');
			$lb_controls.append($lb_previous).append($lb_title).append($lb_next);
			$('.page-wrap').append($lb_backdrop).append($lb_canvas).append($lb_controls);
		}
		//Fade in lightbox elements if they are hidden due to a previous exit
			if($(".lb_backdrop:visible").length == 0)
			{
				$(".lb_backdrop, .lb_canvas, .lb_controls").fadeIn("slow");
			}
		
		
		imgLocation = $(this).attr("href");
		large_img = new Image();
		large_img.src = imgLocation;
		title = $(this).find(".title").html();
		
		//Display preloader till the large image loads and make the previous image translucent so that the loader in the BG is visible
			if(!$(large_img).complete) {
				$(".lb_canvas").addClass("loading").children().css("opacity", "0.5");
			}
			
		//Disabling left/right controls on first/last items
		if($(".image-gallery li.active").prev().length == 0)
			$(".lb_previous").addClass("inactive");
		else
			$(".lb_previous").removeClass("inactive");
		if($(".image-gallery li.active").next().length == 0)
			$(".lb_next").addClass("inactive");
		else
			$(".lb_next").removeClass("inactive");
		
		//Centering .lb_canvas
		$(".lb_canvas").css({top:"50%", left:"50%", transform:"translate(-50%,-50%)"});
		
		//Inserting the large image into .lb_canvas once it's loaded
		$(large_img).load(function(){
			//Recentering .lb_canvas with new dimensions
			CW = large_img.width/3;
			CH = large_img.height/3;
			// console.log(CH);
			// console.log(CW);		
			//Animating .lb_canvas to new dimentions and position
			//You empty the html of .lb_canvas and animate it to the correct dimensions and content.
			$(".lb_canvas").html("").animate({width: CW, height: CH, top:"50%", left:"50%", transform:"translate(-50%,-50%)"}, 500, function(){
				//Inserting the image but keeping it hidden
				imgtag = '<img src="'+ large_img.src+'" style="opacity: 0;" />';
				$(".lb_canvas").html(imgtag);
				$(".lb_canvas img").fadeTo("slow", 1);
				//Displaying the image title
				$(".lb_title").html(title);		
				lb_loading = false;
				$(".lb_canvas").removeClass("loading");
			});
		});	
		
	});

	//Click based navigation
	doc.on("click", ".lb_previous", function(){navigate(-1)});
	doc.on("click", ".lb_next", function(){navigate(1)});
	doc.on("click", ".lb_backdrop", function(){navigate(0)});

	//Keyboard based navigation
	doc.keyup(function(e){
		if($(".lb_backdrop:visible").length == 1){
			//left
			if(e.keyCode == '37') navigate(-1);
			//right
			if(e.keyCode == '39') navigate(1);
			//ESC
			if(e.keyCode == '27') navigate(0);
		}
	});

	//Navigation function
	function navigate(direction){
		if(direction == -1){ //click on the left image
			$(".image-gallery li.active").prev().children("a").trigger("click");			
		}else if(direction == 1){ //click on the right one
			$(".image-gallery li.active").next().children("a").trigger("click");
		}else if(direction == 0){ //exit
			$(".lb_backdrop, .lb_canvas, .lb_controls").fadeOut("slow", function(){
			//remove active class
			$(".lb_canvas").removeClass("loading");
			$(".image-gallery li.active").removeClass("active");
			//empty canvas and title
			$(".lb_canvas, .lb_title").html("");
			lb_loading = false;
			})
		}
	}
});