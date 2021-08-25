var eventsList = (function(){
    return {
        /* Fetch event data from the table and display it on the DOM */
        getEvents: function(){
            requestEvents = new XMLHttpRequest();
            requestEvents.open("GET", "events.php", true);
            requestEvents.send();
            requestEvents.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    var resultSet = JSON.parse(this.responseText);
                    eventsList.populateEvents(resultSet);
                }
            };
        },
        populateEvents: function(eventArray){
            // Remove everything inside eventParent div
            while (document.querySelector("#eventParent").firstChild) {
                document.querySelector("#eventParent").removeChild(
                    document.querySelector("#eventParent").lastChild);
            } // removing last child is faster than removing first

            eventArray.forEach(array => {
                var name = array[0];
                var location = array[1];
                var description = array[2];
                var start = new Date(array[3]);
                // var end = new Date(array[4]);
                var img = array[5]; // local to index.html
                var id = array[6];
                
                /* Parent Div */ {
                var parent = document.createElement("div");
                parent.id = "id" + id;
                parent.style.backgroundColor = "var(--bmGreen)";
                parent.style.borderRadius = "50px";
                parent.style.overflow = "visible";
                parent.style.maxHeight = "75vh";
                parent.classList.add("w-75"); // Width 75%
                parent.classList.add("m-auto"); // Center on page
                parent.classList.add("my-5"); // Vertical spacing
                parent.classList.add("row"); // formatting inside grid
                }

                /* Child Divs */{
                var childName = document.createElement("div");
                childName.classList.add("fontEvent");
                childName.classList.add("noselect");
                childName.classList.add("pt-3");
                childName.style.color = "#fff";
                childName.style.fontSize = "clamp(18px, 2.7vw, 69px)";
                childName.style.fontWeight = "900";
                childName.innerHTML = name;

                var childDescription = document.createElement("div");
                childDescription.classList.add("fontEvent");
                childDescription.classList.add("noselect");
                childDescription.classList.add("my-3");
                childDescription.classList.add("d-none");
                childDescription.classList.add("d-lg-block");
                childDescription.style.overflow = "hidden";
                childDescription.style.color = "#fff";
                childDescription.style.position = "relative";
                childDescription.style.left = "2vw";
                childDescription.style.fontSize = "clamp(14px, 1.2vw, 42px)";
                childDescription.style.fontWeight = "300";
                childDescription.innerHTML = description;

                var childLocation = document.createElement("em");
                childLocation.classList.add("fontEvent");
                childLocation.classList.add("noselect");
                childLocation.classList.add("my-5");
                childLocation.style.maxHeight = "11vh";
                childLocation.style.maxWidth = "50vw";
                childLocation.style.overflow = "hidden";
                childLocation.style.color = "#fff";
                childLocation.style.fontSize = "clamp(14px, 1.8vw, 42px)";
                childLocation.style.fontWeight = "700";
                childLocation.innerHTML = location;

                var childStart = document.createElement("b");
                childStart.classList.add("noselect");
                childStart.classList.add("fontEvent");
                childStart.classList.add("col-lg-2");
                childStart.classList.add("col-10");
                childStart.classList.add("noselect");
                childStart.classList.add("align-self-center");
                childStart.style.color = "#fff";
                childStart.style.textAlign = "center";
                childStart.style.fontWeight = "300";
                childStart.style.fontSize = "clamp(12px, 1.5vw, 36px)";
                var dateTimeFormat = new Intl.DateTimeFormat('en-US', {
                    month: 'short', day: 'numeric',
                    hour: 'numeric', minute: 'numeric',
                    timeZone: 'America/New_York'
                });
                childStart.innerHTML = dateTimeFormat.format(start)
                .replaceAll(/ /g, "<br/>")
                .replace(/,/,""); // line break at all space chars; no comma
                /*
                var childEnd = document.createElement("div");
                childEnd.classList.add("noselect");
                childEnd.style.color = "#fff";
                var dateTimeFormat = new Intl.DateTimeFormat('en-US', {
                    month: 'short', day: 'numeric',
                    hour: 'numeric', minute: 'numeric',
                    timeZone: 'America/New_York'
                });
                childEnd.innerHTML = dateTimeFormat.format(end)
                .replaceAll(/ /g, "<br/>")
                .replace(/,/,""); // line break at all space chars; no comma
                */
                var childImg = document.createElement("img");
                childImg.id = "img" + id;
                childImg.classList.add("noselect");
                childImg.classList.add("col-10");
                childImg.classList.add("d-none");
                childImg.classList.add("d-lg-block");
                childImg.style.position = "relative";
                childImg.style.top = "50px";
                /* offset-x | offset-y | blur-radius | spread-radius | color */
                childImg.src = img === null ? "res/img/bmLogo.webp" : img;
                childImg.style.borderRadius = "50px";
                }

                /* Append them all to the DOM */{
                document.querySelector("#eventParent").append(parent);

                var childLeft = document.createElement("div");
                childLeft.classList.add("col-5");
                childLeft.classList.add("row");
                childLeft.appendChild(childStart);
                // Is img still displayed once window size is solved? 
                // If not, don't append img
                let isImgDisp = window.getComputedStyle(childImg).getPropertyValue("display");
                if (isImgDisp != "none"){
                    childLeft.appendChild(childImg); 
                }

                var childRight = document.createElement("div");
                childRight.classList.add("col-7");
                childRight.classList.add("pb-1");
                childRight.appendChild(childName);
                childRight.appendChild(childLocation);
                childRight.appendChild(childDescription);

                document.querySelector("#id" + id).append(childLeft);
                document.querySelector("#id" + id).append(childRight);
                }
            });
        }
    };
})();

eventsList.getEvents();