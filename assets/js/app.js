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
            var dBtn = $(`<button>`).text("Download");
            dBtn.attr('class', 'dBtn');
            // dBtn.click(window.open(img));

            // var download= $(`<button class="btn"><i class="fa fa-download"></i> Download</button>>"`).text("download ->");


            var img = $(`<img>`);
            img.attr('src', response.data[i].images.downsized_still.url);
            img.attr('data-moving', response.data[i].images.downsized_medium.url);
            img.attr('data-still', response.data[i].images.downsized_still.url);
            img.attr('href', response.data[i].url);

            var divImg = $('<div class="giphyImg">').append(rating, title, img, dBtn);
            $("#gif-Div").prepend(divImg);

            
        }


    });

});

//Function to download the image
$(document).on("click", ".dBtn", function(response){

            var img =img.attr('src', response.data[i].images.downsized_still.url);

    window.open(img);
   
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
    event.preventDefault();

});

