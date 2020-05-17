var imglist = document.getElementsByTagName("img");
console.log("imglist", imglist);
var indexImg = 0;
window.onload = function() {
    for (var i = 0; i < imglist.length; i++) {
        console.log("imglist[i]", imglist[i]);
        (function(i) {
            imglist[i].onclick = function() {
                indexImg = i;
                console.log("index", i);
            };
        })(i);
    }
}
export default indexImg