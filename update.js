import {eventsList} from "./events.js";
window.onload = function(){
    eventsList.getEvents();
    var eventParentModal = document.querySelector('#eventParentModal');
    var deleteModalButton = document.querySelector("#deleteModalButton");
    deleteModalButton.addEventListener(onclick, eventsList.getEventsCallback(eventParentModal));
}

// call getevents whenever add/delete modal is closed

// for all "parent" elements inside eventparentmodal
//      add click listeners
        // confirm delete
        // refresh list