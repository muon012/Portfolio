$(document).ready(function () {

    $("#submitBtn").on("click", function (e) {
        e.preventDefault();
        console.log("submit clicked");
    });

    $(".navbar-brand").on("click", function (e) {
        e.preventDefault();
        console.log($(this).attr("data-name"));
        
        // selecting only one image, which is inside an <a>, from the <div> with id="containerFighters"
        $(this).parentsUntil("#containerFighters").find(".navbar-brand").removeClass("active");
        $(this).addClass("active");
    });
})