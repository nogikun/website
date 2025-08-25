$(function(){
	$(".otherIMGlist a").click(function(){
		$("#pick img").attr("src",$(this).children().attr("src"));
		$("#fullsize").attr("href",$(this).children().attr("src"));
		$("#title").text($(this).attr("alt"));

		$("#twitter-URL").attr("href",$(this).attr("href"));
		$("#pixiv-URL").attr("href",$(this).children().attr("alt"));


		return false;
	});
});