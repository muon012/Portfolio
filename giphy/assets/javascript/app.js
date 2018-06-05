
$(document).ready(function () {

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    toDataURL("https://media2.giphy.com/media/2IgmGEB6yxDwc/giphy.mp4", function (dataUrl) {
        // console.log('RESULT:', dataUrl)
        var a = $("<a>");
        a.attr("href", dataUrl);
        a.attr("download", "img.mp4");
        a.click();
        a.text("LETS GO")
        $("body").prepend(a);
    })
    var topics = ["messi", "ronaldo", "zlatan", "ronaldinho", "robben", "zidane", "roberto carlos"];

    // function for displaying the gifs and their info.
    var display = function () {

        //  ajax call
        var name = $(this).text();
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=qGD6PCU4bUY2ex7AoiWWohjR593PzQ1h&limit=10";

        axios({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {
                console.log(response.data);

                var database = response.data.data;
                for (var i = 0; i < database.length; i++) {

                    // Title
                    var gifTitle = $("<h5>");
                    gifTitle.attr("class", "card-title");
                    gifTitle.text("Title: " + database[i].title);

                    // Rating
                    var gifRating = $("<p>");
                    gifRating.attr("class", "card-text");
                    gifRating.text("Rating: " + database[i].rating);

                    // url
                    var webAddress = $("<a>");
                    webAddress.attr("href", database[i].images.original.url);
                    webAddress.attr("target", "_blank");
                    webAddress.text(database[i].images.original.url);

                    // <p> for the url
                    var newP = $("<p>");
                    newP.append(webAddress);

                    // buttons
                    var downloadLink = $("<a>");
                    downloadLink.attr("class", "btn btn-secondary");
                    downloadLink.attr("role", "button");
                    downloadLink.attr("download", database[i].title + ".mp4");
                    downloadLink.attr("data-download", database[i].images.original_mp4.mp4);
                    downloadLink.text("Download");

                    var favButton = $("<button>");
                    favButton.attr("data-fvrt", "favoriteButton");
                    favButton.attr("id", "favorites");
                    favButton.attr("data-url", database[i].images.original.url);
                    favButton.attr("data-title", database[i].title);
                    favButton.attr("data-rating", database[i].rating);
                    favButton.attr("type", "button");
                    favButton.attr("class", "btn btn-outline-danger");
                    favButton.text("Add to Favorites");

                    // inner div
                    var innerDiv = $("<div>");
                    innerDiv.attr("class", "card-body");
                    innerDiv.append([gifTitle, gifRating, newP, downloadLink, favButton]);

                    // Images
                    var picture = $("<img>");
                    picture.attr("class", "img-fluid");
                    picture.attr("alt", "Responsive image");
                    picture.attr("src", database[i].images.original_still.url);
                    picture.attr("data-still", database[i].images.original_still.url);
                    picture.attr("data-original", database[i].images.original.url);
                    picture.attr("state", "still");

                    // outer div
                    var outerDiv = $("<div>");
                    outerDiv.attr("class", "card");
                    outerDiv.append([picture, innerDiv]);

                    // adding the cards to the empty container 
                    var colDiv = $("<div>");
                    colDiv.attr("class", "col-sm-4");
                    colDiv.append(outerDiv);
                    $("#displayContainer").prepend(colDiv);
                };
            })
            .catch(function (error) {
                console.error(error);
            })
    };

    var displayFavorites = function () {

    };

    // function for creating the first buttons
    var showButtons = function () {

        $("#initialBtnDiv").empty();

        for (var j = 0; j < topics.length; j++) {

            // giving values to the buttons
            var playerButton = $("<button>");
            playerButton.attr("class", "btn btn-primary");
            playerButton.attr("type", "submit");
            playerButton.addClass("data-newGif")
            playerButton.text(topics[j]);

            $("#initialBtnDiv").append(playerButton);
        };
    };

    showButtons();

    // "on click" events for adding more buttons.
    $("#addButton").on("click", function (e) {
        e.preventDefault();
        var newPlayer = $("#addInput").val().trim();
        topics.push(newPlayer);
        showButtons();
    });

    // "on click" events for the buttons with the players' names.
    $(document).on("click", ".data-newGif", display);

    // downloading the gifs
    $(document).on("click", ".btn-secondary", function () {
        function toDataURL(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
            console.log(url);

        }
        toDataURL($(this).attr("data-download"), function (dataUrl) {
            $(this).attr("href", dataUrl);
        })

        console.log($(this).attr("data-download"));
        console.log($(this).attr("download"));
    });

    // "on click" events for animating the gifs.
    $(document).on("click", ".img-fluid", function () {
        console.log($(this).attr("state"));

        if ($(this).attr("state") === "still") {
            $(this).attr("src", $(this).attr("data-original"));
            $(this).attr("state", "animate");
            console.log($(this).attr("state"));
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("state", "still");

        }
    });

    // refreshing the page by clicking the giphy name or logo
    $("#giphy-brand, #giphy-title").on("click", function () {
        console.log("reload");
        location.reload();
    });

    // "clear gifs" button events
    $("#clearBtn").on("click", function () {

        $("#displayContainer").empty();
    })

    // "clear favorites" button events
    $("#clearFavBtn").on("click", function () {

        $("#favoriteBtnDiv").empty();
    })

    var w = 0; // variable used for dynamically creating names for the favorite gifs.

    // adding favorites to the navbar.
    $(document).on("click", "#favorites", function () {

        w++;
        var newFavoriteBtn = $("<button>");
        newFavoriteBtn.attr("class", "btn btn-warning");
        newFavoriteBtn.attr("type", "button");
        newFavoriteBtn.attr("data-gifUrl", $(this).attr("data-url"));
        newFavoriteBtn.attr("data-gifTitle", $(this).attr("data-title"))
        newFavoriteBtn.attr("data-gifRating", $(this).attr("data-rating"))
        newFavoriteBtn.text("Favorite " + w);
        $("#favoriteBtnDiv").append(newFavoriteBtn);
        console.log(newFavoriteBtn.attr("data-gifUrl"));
        console.log("Add to Favorites");
    });

    //  function for displaying favorites
    var displayFav = function () {

        // Title
        var gifTitle = $("<h5>");
        gifTitle.attr("class", "card-title");
        gifTitle.text("Title: " + $(this).attr("data-gifTitle"));

        // Rating
        var gifRating = $("<p>");
        gifRating.attr("class", "card-text");
        gifRating.text("Rating: " + $(this).attr("data-gifRating"));

        // url
        var webAddress = $("<a>");
        webAddress.attr("href", $(this).attr("data-gifUrl"));
        webAddress.attr("target", "_blank");
        webAddress.text($(this).attr("data-gifUrl"));

        // <p> for the url
        var newP = $("<p>");
        newP.append(webAddress);

        // picture
        var picture = $("<img>");
        picture.attr("class", "img-fluid");
        picture.attr("alt", "Responsive image");
        picture.attr("src", $(this).attr("data-gifUrl"));

        // download button
        var downloadLink = $("<a>");
        downloadLink.attr("class", "btn btn-secondary");
        // downloadLink.attr("href", $(this).attr("data-gifUrl"))
        downloadLink.attr("role", "button");
        downloadLink.attr("download", $(this).attr("data-giftitle") + ".gif");
        downloadLink.text("Download");

        // inner div
        var innerDiv = $("<div>");
        innerDiv.attr("class", "card-body");
        innerDiv.append([gifTitle, gifRating, newP, downloadLink]);

        // outer div
        var outerDiv = $("<div>");
        outerDiv.attr("class", "card");
        outerDiv.append([picture, innerDiv]);

        // adding the cards to the empty container 
        var colDiv = $("<div>");
        colDiv.attr("class", "col-sm-4");
        colDiv.append(outerDiv);
        $("#displayContainer").prepend(colDiv);
    };

    // "on click" events for the favorites buttons.
    $(document).on("click", ".btn-warning", displayFav);



});