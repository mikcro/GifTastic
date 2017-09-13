$( document ).ready(function() {

//array
var topic = ["Finding Nemo", "Monsters Inc.", "Despicable Me", "Toy Story", "The Incredibles", "Brave", "Wall E","A Bugs Life"];
var pixar = ["toy story","A Bug's Life","Toy Story 2","Monsters, Inc.","Finding Nemo","The Incredibles","Cars","Ratatouille","WALL-E","Up","Toy Story 3","Cars 2","Brave","Monsters University","Inside Out","The Good Dinosaur","Finding Dory","Cars 3"];
//function for gif button display

function displayGifButtons() {
	$("#gifButtonsView").empty();
	for (var i = 0; i < topic.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("movie");
		gifButton.addClass("btn btn-primary")
		gifButton.attr("data-name", topic[i]);
		gifButton.text(topic[i]);
		$("#gifButtonsView").append(gifButton);
	}
}

//function to create a new button

function addNewButton() {
	$("#addGif").on("click", function() {
		var movie = $("#topicInput").val().trim();
		if (movie == ""){
			return false;//no blank buttons
		}
		topic.push(movie);

		displayGifButtons();
		return false;
		});
}

//function to remove last button
function removeLastButton() {
	$("removeGif").on("click", function() {
		topic.pop(movie);
		displayGifButtons();
		return false;
	});

}

// function that displays the gifs

function displayGifs() {
	var movie = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
	
	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response) {
		$("#gifsView").empty();
		//show results of gifs
		var results = response.data;
		if (results == ""){
			alert("Are you sure this was a Pixar Movie");
				
		}
		for (var i = 0; i<results.length; i++){
			//put gifs in a div
			var gifDiv = $("<div1>");
			//pull rating of gif
			var gifRating = $("<p>").text("Rating " + results[i].rating);
			gifDiv.append(gifRating);

			//pull gif
			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
			//paused images
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			//animated images
			gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
			//how images come in, already paused
			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
			gifDiv.append(gifImage);
			//add new div to existing divs
			$("#gifsView").prepend(gifDiv);
		}
	});
}


//list of already created Pixar Movie Gifs
displayGifButtons();
addNewButton();
removeLastButton();



//event listeners
$(document).on("click", ".movie", displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}

	});

});
