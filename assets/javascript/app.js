//Topic Array of Marvel movies and characters. 

var topics = ["Black Panther", "Deadpool", "Doctor Strange", "Thor", "Captain America", "Iron Man", "Hulk", "Avengers", "Gurdians of the Galaxy", "Ant Man", "Shuri", "Okoye", "Loki", "Nick Fury", "Stan Lee", "Groot", "Star Lord", "Thanos",  "Steve Rogers", "Bucky Barnes", "Killmonger"];

	
	$("button").on("click", function (event) {
		event.preventDefault();
		var topic = $("#topic-input").val().toLowerCase().trim();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=ak4kpK1Yujp9CxhmYebwEnNjeqaVPx99";

		// Performing the AJAX request with the queryURL
		$.ajax({
          url: queryURL,
		  method: "GET"
		}).done(function(response) {
			console.log(response);
		  });

	});


//  Creates movie and character array buttons

$("#gif-form").submit(function(event) {
	event.preventDefault();
	var topic = $("#topic-input").val().toLowerCase().trim();
	displayGifs(topic);
	topics.push(topic);
	renderButtons();

	console.log(topics);
});

function renderButtons () {

	//Empties the div before adding more gifs
	$(".buttons-view").empty();

	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("topic btn btn-default");
		newButton.attr("data-name", topics[i]);
		newButton.text(topics[i]);
		$(".buttons-view").append(newButton);
	}
};

	function displayGifs (topic) {
		// var topic = $(this).attr("data-name");
		topicGif = $(this).attr("data-name") ? $(this).attr("data-name") : topic;
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicGif + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);

		  $(".gifs-view").empty();

		  // Looping through each result item
          for (var i = 0; i < response.data.length; i++) {
          	var gifDiv = $("<div>");
          	gifDiv.addClass("gifDiv");
          	gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

          	var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          	gifImage.addClass("gif");

          	var imageDiv = $("<div>");
          	imageDiv.addClass("play");
          	imageDiv.attr("data-state", "still");
          	imageDiv.attr("data-name", topic);
          	imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
          	imageDiv.attr("data-animate",response.data[i].images.fixed_height.url)
          	
          	$(imageDiv).append(gifImage);
          	$(gifDiv).append(imageDiv);
          	$(".gifs-view").append(gifDiv);
          }

        });
	};

	//Function to stop and play the gif that's clicked on. 

	function playGif () {

		if ($(this).attr("data-state") == "still") {
			$(this).html("<img src='" + $(this).attr("data-animate") + "'>");
			$(this).attr("data-state", "animate");
		}
		else {
			$(this).html("<img src='" + $(this).attr("data-still") + "'>");
			$(this).attr("data-state", "still");
		}

	};

	//  .on("click") function associated with playing and stoping the giphy.
	$(document).on("click", ".topic", displayGifs);
	$(document).on("click", ".play", playGif);

//Running Code
renderButtons();