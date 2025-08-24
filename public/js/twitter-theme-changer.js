// use jquery
$(function() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // console.log("DARK");
        $(".twitter-timeline").attr('data-theme', 'dark');
    };
});