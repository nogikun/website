var classShareF = document.getElementsByClassName("shareF");
var classShareT = document.getElementsByClassName("shareT");
var classShareL = document.getElementsByClassName("shareL");

var currentLocation = location.href;

var urlF = ("http://www.facebook.com/share.php?u=" + currentLocation);
var urlT = ("https://twitter.com/share?url=" + currentLocation + "&text=限界集落");
var urlL = ("https://social-plugins.line.me/lineit/share?url=" + currentLocation);
// console.log(urlF);
//console.log(urlT);

for (var i = 0; i < classShareF.length; i++) {
    classShareF[i].setAttribute("href", urlF);
}

for (var i = 0; i < classShareF.length; i++) {
    classShareT[i].setAttribute("href", urlT);
}

for (var i = 0; i < classShareL.length; i++) {
    classShareL[i].setAttribute("href", urlL);
}