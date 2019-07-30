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
    var query = $(this).text();
    var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=VHJDVtFuD5EPwCfSorUoGJmO81lqGB0u&limit=10&offset=0&lang=en";


    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 11; i++) {
            // console.log(response);

            var title = $("<p>").text("Title: " + response.data[i].title);
            var rating = $('<p>').text("Rating: " + response.data[i].rating);
            var dBtn = $(`<a target="_blank"><button> Download </button></a>`).text("Download");
                dBtn.attr("href", response.data[i].images.downsized_medium.url);
            dBtn.attr('class', 'dBtn');



            var img = $(`<img>`);
            img.attr('src', response.data[i].images.downsized_still.url);
            img.attr('data-moving', response.data[i].images.downsized_medium.url);
            img.attr('data-still', response.data[i].images.downsized_still.url);
            img.attr('href', response.data[i].url);

            var divImg = $('<div class="giphyImg">').append(title,rating, img, dBtn);
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

//Function to clear the images div when needed

$(document).on("click", ".reset", function(){
    $("#gif-Div").empty();
    $("#gif-Div").html(`<h3>Power by Giphy API</h3>`);
    $("#gif-Div").append(`<img class= "power" src="assets/img/giphy.gif" atl="Giphy">`);

    event.preventDefault();

});

