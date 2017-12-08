$(function () {
    let obj=JSON.parse(sessionStorage.media);
    $("h1").html(obj.title);
    $("#from").html(obj.src);
    $("#time").html(obj.time);
    $("article").html(obj.content);
    $(".back").click(function (e) {
        e.preventDefault();
        history.back();
    })

});