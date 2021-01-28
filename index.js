var bounds = ""
var currentSection = "";
document.querySelector("body").onscroll = scrollControl;
window.addEventListener('load', function(){
    bounds = updateBounds();
    for(var i = 0; i < bounds.length - 1; i++){
        document.querySelector("#scrollTransition" + i).style.height = "100vh";
    }
});

function updateBounds(){
    var top = document.querySelector("#topBox").getBoundingClientRect(); // need one div for top and what-we-do
    var services = document.querySelector("#services").getBoundingClientRect();
    var content = document.querySelector("#content").getBoundingClientRect();
    var getInvolved = document.querySelector("#get-involved").getBoundingClientRect();
    var contactUs = document.querySelector("#contact-us").getBoundingClientRect();
    return [top, services, content, getInvolved, contactUs];
}
var scrollControl = function(){scrollControl()};
function scrollControl(){
    // look for previous scroll location?
    bounds = updateBounds();
    for(var j = 0; j < bounds.length; j++){
        if(Math.abs(bounds[j].y) > 0 && Math.abs(bounds[j].y) < window.innerHeight){
            currentSection = j;
        }
    }
}