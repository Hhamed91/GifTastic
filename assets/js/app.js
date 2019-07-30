//Array of topics
var topics = ["deal with it", "like a boss", "fail", "forever alone", "donald trump"];

//For loop based on the length of the array 
function renderButtons() {
    $('#buttons').empty();
    for (i = 0; i < topics.length; i++) {
        createButtons(topics[i]);
    }
}
renderButtons();

//Function to create new buttons, give them a class , and append them to the div,
function createButtons(btnName) {
    var btn = $('<button>');
    btn.attr('class', 'btnCatagories')
    btn.text(btnName);
    $("#buttons").append(btn);
};

//on click function to create the image (with its moving and static link), title, rating
$(document).on("click", ".btnCatagories", function () {
    // $("#gif-Div").empty();
    // $("#container :reset").empty();
    var query = $(this).text();
    var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=VHJDVtFuD5EPwCfSorUoGJmO81lqGB0u&limit=10&offset=0&lang=en";


    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 11; i++) {
            // console.log(response);

            var rating = $('<p>').text("Rating: " + response.data[i].rating);
            var title = $("<p>").text("Title: " + response.data[i].title);

            // var downloadB =$("<button class='downloadButton'>").text("download")

            var img = $("<img>");
            img.attr('src', response.data[i].images.downsized_still.url);
            img.attr('data-moving', response.data[i].images.downsized_medium.url);
            img.attr('data-still', response.data[i].images.downsized_still.url);

            // img.attr('href', response.data[x].url);

            var divImg = $('<div class="giphyImg">').append(rating, title, img);
            $("#gif-Div").prepend(divImg);
        }


    });

});

//On click event to switch between the still and moving src

$(document).on("click", "img", function () {
    var directSrc = $(this).attr("src");
    var movingSrc = $(this).attr("data-moving");
    var stillSrc = $(this).attr("data-still");

    if (stillSrc == directSrc) {
        $(this).attr('src', movingSrc);
    } else {
        $(this).attr('src', stillSrc)
    }
});


//Function to add a new btn when submitted

$("#sub").on("click", function(event) {
    var newTopic = $("#search").val();
    createButtons(newTopic);
    topics.push(newTopic);
    event.preventDefault();
    $("#search").val("");
    });