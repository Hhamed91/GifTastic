$(document).on("click", "button", function () {
    $("#gif-view").empty();
    var query = $(this).val();
    // console.log($(this).val());

    var gifURL = "https://api.giphy.com/v1/gifs/search?api_key=vMiQJ1wPEvgD6ZYqvMveKHAWZhCCUzXx&q=" + query + "&limit=10&offset=0&rating=G&lang=en"


    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 2; i++) {
            $("#gif-view").append("<div>");
            $("#gif-view").attr("class", "divImg");
            $("#gif-view div").append("<img>");
            $(".divImg img").attr("src", response.data[i].images.downsized_still.url);
            $(".divImg img").attr("data-moving", response.data[i].images.downsized_still.url);
            $(".divImg img").attr("data-still", response.data[i].images.downsized_still.url);
            $(".divWithGif").append("<span>");
            $(".divWithGif span").text("Rating " + response.data[i].rating);
        }
    });

});

$("input[type=submit]").on("click", function () {
    var newGiphy = $("input[type=text]").val();
    $("#buttons").append("<button>");
    $("#buttons button").attr("value", newGiphy);
    $("#buttons button").text(newGiphy);
    event.preventDefault();


});


// $("#container :reset").on("click", function(){

//     $("#gif-view").empty();


// });