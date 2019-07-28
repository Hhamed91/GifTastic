$(document).on("click", "button", function () {
    $("#gif-view").empty();
    var query = $(this).val();
    var gifURL = "https://api.giphy.com/v1/gifs/search?api_key=vMiQJ1wPEvgD6ZYqvMveKHAWZhCCUzXx&q="+query+"&limit=10&offset=0&rating=G&lang=en"


    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 11; i++) {
            console.log(response);

            $("#gif-view").append("<div>");
            $("#gif-view").attr("class", "divImg");
            $("#gif-view div:last-child").append("<img>");
            $(".divImg img:last-child").attr("src", response.data[i].images.downsized_still.url);
            $(".divImg img:last-child").attr("data-moving", response.data[i].images.downsized_still.url);
            $(".divImg img:last-child").attr("data-still", response.data[i].images.downsized_still.url);
            $(".divImg:last-child").append("<span>");
            $(".divImg span:last-child").text("Rating " + response.data[i].rating);
        }
    });

});

$("input[type=submit]").on("click", function () {
    var newGiphy = $("input[type=text]").val();
    $("#buttons").append("<button>");
    $("#buttons button:last-child").attr("value", newGiphy);
    $("#buttons button:last-child").text(newGiphy);
    event.preventDefault();
});

$(document).on("click", "img", function(){
    var stillImg = $(this).attr("data-still");
    var movingImg = $(this).attr("data-moving");
    var imgSRC = $(this).attr("src");

    if(imgSRC == stillImg){
        $(this).attr("src", movingImg);
    }else{
        $(this).attr("src", stillImg);

    }

});


// $("#container :reset").on("click", function(){

//     $("#gif-view").empty();


// });
