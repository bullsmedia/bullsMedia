var bounds = ""
var currentSection = 0;
document.querySelector("body").onscroll = scrollControl;
window.addEventListener('load', function(){
    bounds = updateBounds();
    for(var i = 0; i < bounds.length - 1; i++){
        document.querySelector("#scrollTransition" + i).style.height = "0";
    }
});

function updateBounds(){
    var top = document.querySelector("#topBox"); // need one div for top and what-we-do
    var services = document.querySelector("#services");
    var content = document.querySelector("#content");
    var getInvolved = document.querySelector("#get-involved");
    var contactUs = document.querySelector("#contact-us");
    return [top, services, content, getInvolved, contactUs];
}
var scrollControl = function(){scrollControl()};
function scrollControl(){
    // look for previous scroll location?
    bounds = updateBounds();
    for(var j = 0; j < bounds.length; j++){
        if(bounds[j].getBoundingClientRect().bottom <= window.innerHeight){
            // scrollTo(0, bounds[j].scrollHeight - window.innerHeight);
        }
    }
}