document.body.querySelector("#jsNotify").remove(); /* Ensure JS is enabled */

/* Module regarding the pubSearch div 
    todo*/
var pubSearch = (function(){
    /* Search Element */
    return {
        searchTerms: {
            "filter": "",
            "search": "",
            "orderBy": "",
            "orderDirection": "",
        },
        orderByList: document.createElement("select"),
        textSearchBox: document.createElement("textarea"),
        createSearchElements: function(){
            var searchBody = document.body.querySelector("#pubSearch");
        
            /* Parent Div */{
            var parent = document.createElement("div");
            parent.id = "sb";
            parent.style.transition = "all ease-in-out";
            parent.style.transitionDuration = ".382s";
            parent.style.fontSize = "1.2vw";
            parent.style.position = "relative";
            parent.style.width = "65vw";
            parent.style.height = "3.9vw";
            parent.style.boxShadow =   "0px \
                                        5px \
                                        20px \
                                        3px \
                                        #888888";
            parent.style.padding = "5px";
            parent.style.backgroundColor = "#fff";
            }
        
            /* Text Box */{
            var textSearch = document.createElement("div");
            textSearch.style.position = "absolute";
            textSearch.style.left = ".9vw";
            textSearch.style.top = ".9vw";

            var textSearchBox = document.createElement("input");
            textSearchBox.setAttribute("type", "text");
            textSearchBox.id = "tsb";
            textSearchBox.style.border = "0";
            textSearchBox.onkeypress = function(){
                var key = window.event.keyCode;
                if (key == 13){
                    event.preventDefault();
                    pubSearch.searchTerms.search = textSearchBox.value;
                    pubSearch.doSearch();
                }
            };
            textSearchBox.style.fontFamily = "verdana";
            textSearchBox.style.fontSize = "1.75vw";
            textSearchBox.style.color = "#888";
            textSearchBox.style.backgroundColor = "#eee";
            textSearchBox.style.height = "2.5vw";
            textSearchBox.style.width = "42vw";
            textSearchBox.style.resize = "none";
            textSearchBox.cols = "42";
            textSearchBox.rows = "1";
            textSearchBox.placeholder = " Search";
            textSearchBox.value = pubSearch.searchTerms.search;
            textSearch.appendChild(textSearchBox);
            }
        
            /* Ordering */{
            var orderBy = document.createElement("div");
            orderBy.style.position = "absolute";
            orderBy.style.right = "4.5vw";
            orderBy.style.top = ".9vw";
            orderBy.style.width = "17vw";
            orderBy.style.height = "2.5vw";
            orderBy.style.backgroundColor ="#eee";

            var orderByText = document.createElement("div");
            orderByText.style.position = "absolute";
            orderByText.style.left = ".5vw";
            orderByText.style.top = ".35vw";
            orderByText.style.fontFamily = "verdana";
            orderByText.style.fontSize = "1.35vw";
            orderByText.innerHTML = "Sort By ";
        
            orderByList = this.orderByList;
            orderByList.id = "ob";
            orderByList.style.border = "0";
            orderByList.style.backgroundColor = "#eee";
            orderByList.style.position = "absolute";
            orderByList.style.left = "5.75vw";
            orderByList.style.top = ".35vw";
            orderByList.style.fontFamily = "verdana";
            orderByList.style.fontSize = "1.35vw";
            if(!orderByList.options[5]){ // createSearchElements is called when publications are closed;
                                            // this prevents the options in this list from being added infinitely
                var orderByNewest = document.createElement("option");
                var orderByOldest = document.createElement("option");
                var orderByMostViewed = document.createElement("option");
                var orderByLeastViewed = document.createElement("option");
                var orderByNameUp = document.createElement("option");
                var orderByNameDown = document.createElement("option");
                orderByNewest.text = "Newest";
                orderByOldest.text = "Oldest";
                orderByMostViewed.text = "Most Viewed";
                orderByLeastViewed.text = "Least Viewed";
                orderByNameUp.text = "Name (Up)";
                orderByNameDown.text = "Name (Down)";
                orderByList.add(orderByNewest);
                orderByList.add(orderByOldest);
                orderByList.add(orderByMostViewed);
                orderByList.add(orderByLeastViewed);
                orderByList.add(orderByNameUp);
                orderByList.add(orderByNameDown);
            }
            
            orderBy.appendChild(orderByText);
            orderBy.appendChild(orderByList);
            }
        
            /* Button */{
            var updateButton = document.createElement("button");
            updateButton.style.backgroundImage = "url(../res/img/update.webp)";
            updateButton.style.backgroundColor = "#eee";
            updateButton.style.backgroundSize = "contain";
            updateButton.style.border = "none";
            updateButton.style.padding = "0";
            updateButton.style.position = "absolute";
            updateButton.style.right = ".9vw";
            updateButton.style.top = ".9vw";
            updateButton.style.width = "2.5vw";
            updateButton.style.height = "2.5vw";
            updateButton.onclick = function(){
                pubSearch.doSearch();
            };
            }
        
            /* Spacer */{
            var spacer = document.createElement("div");
            // spacer.style.height = "0vw";
            }

            parent.appendChild(textSearch);
            parent.appendChild(orderBy);
            parent.appendChild(updateButton);
            searchBody.append(parent);
            searchBody.append(spacer);
        
            /* Filter element. same button to update as search */
        },
        getSearchTerms: function(callback = ""){
            var getOrderBy = document.querySelector("#ob").value.toLowerCase();
            var orderBy;
            var orderDirection;
            switch (getOrderBy){
                case "newest":{
                    orderBy = "date";
                    orderDirection = "down";}
                    break;
                case "oldest":{
                    orderBy = "date";
                    orderDirection = "up";}
                    break;
                case "most viewed":{
                    orderBy = "views";
                    orderDirection = "down";}
                    break;
                case "least viewed":{
                    orderBy = "views";
                    orderDirection = "up";}
                    break;
                case "name (up)":{
                    orderBy = "name";
                    orderDirection = "up";}
                    break;
                case "name (down)":{
                    orderBy = "name";
                    orderDirection = "down";}
                    break;
                default:
                    orderBy = "date";
                    orderDirection = "down";
            }
            pubSearch.searchTerms.search = document.querySelector("#tsb").value.toLowerCase();
            pubSearch.searchTerms.orderBy = orderBy;
            pubSearch.searchTerms.orderDirection = orderDirection;
            if(callback != ""){
                callback();
            } else{
                return pubSearch.searchTerms;
            }
        },
        doSearch: function(){
            var getOrderBy = pubSearch.orderByList.value.toLowerCase();
            var textBoxValue = document.querySelector("#tsb").value.toLowerCase();
            var orderBy;
            var orderDirection;
            switch (getOrderBy){
                case "newest":{
                    orderBy = "date";
                    orderDirection = "down";}
                    break;
                case "oldest":{
                    orderBy = "date";
                    orderDirection = "up";}
                    break;
                case "most viewed":{
                    orderBy = "views";
                    orderDirection = "down";}
                    break;
                case "least viewed":{
                    orderBy = "views";
                    orderDirection = "up";}
                    break;
                case "name (up)":{
                    orderBy = "name";
                    orderDirection = "up";}
                    break;
                case "name (down)":{
                    orderBy = "name";
                    orderDirection = "down";}
                    break;
                default:
                    orderBy = "date";
                    orderDirection = "down";
            }
            pubPage.goToPage(0);
            pubList.getMeta(0, "", textBoxValue, orderBy, orderDirection);
        }
    };
})();

/* Module regarding the pubList div 
    todo*/
var pubList = (function(){
    return {
        /* Fetch metadata from the table and pass execution to display it on the DOM */
        getMeta: function(page = 0,filter = "",search = "",orderBy = "date",orderDirection = "down"){
            requestMeta = new XMLHttpRequest();
            requestMeta.open("GET", "publicationFetch.php\
                ?p=" + page + "\
                &f=" + filter + "\
                &s=" + search + "\
                &o=" + orderBy + "\
                &d=" + orderDirection, true);
            requestMeta.send();
            requestMeta.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    var resultSet = JSON.parse(this.responseText);
                    pubList.populatePubList(resultSet);
                }
            };
        },
        /* Featured list of publications */
        getFeatured: function(){
            requestFeatured = new XMLHttpRequest();
            requestFeatured.open("GET", "publicationFeatured.php");
            requestFeatured.send();
            requestFeatured.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    pubList.populateFeatured(JSON.parse(this.responseText));
                }
            };
        },

        populateFeatured: function(featuredData){

            /* Parent */
            var featuredPanel = document.createElement("div");
            featuredPanel.style.position = "relative";
            featuredPanel.style.width = "65.5vw";
            featuredPanel.style.height = "14.5vw";
            featuredPanel.style.display = "flex";
            featuredPanel.style.flexDirection = "row";
            featuredPanel.style.justifyItems = "center";
            featuredPanel.style.alignContent = "center";
            featuredPanel.style.marginBottom = "3vw";
            featuredPanel.style.backgroundColor ="#fff";
            featuredPanel.style.boxShadow = "0px 5px 20px 3px #888888";

            featuredData.forEach(array =>{
                var name = array[0];
                var img = array[1];
                var date = new Date(array[2]);
                var description = array[3];
                var views = array[4];
                var tags = array[5];
                var id = array[6];

                /* parent */
                var featuredCard = document.createElement("div");
                featuredCard.style.width = "30vw";
                featuredCard.style.height = "10vw";
                featuredCard.style.margin = "2.25vw";
                featuredCard.style.backgroundColor = "#888";

                var pubFeatured = document.querySelector("#pubFeatured");
                pubFeatured.appendChild(featuredPanel);
                featuredPanel.appendChild(featuredCard);
            });
        },
        /* Take metadata and slap the DOM until it works */
        populatePubList: function(metaData){
            while (document.querySelector("#pubList").firstChild) {
                document.querySelector("#pubList").removeChild(document.querySelector("#pubList").lastChild);
            }
            metaData.forEach(array => {
                var name = array[0];
                var img = array[1];
                var date = new Date(array[2]);
                var description = array[3];
                var views = array[4];
                var tags = array[5];
                var id = array[6];
                
                /* Parent Div */ {
                var parent = document.createElement("div");
                parent.id = "id" + id;
                parent.style.position = "relative"; // relative inside body
                parent.style.width = "65vw";
                parent.style.height = "27.5vh";
                parent.style.padding = "5px";
                parent.style.marginTop = "3vw";
                parent.style.boxShadow =   "0px \
                                            5px \
                                            20px \
                                            3px \
                                            #888888"; // horizontal offset/ vertical offset/ decay/ attack/ color;
                // card style shadow manipulation on mouseenter and mouseleave
                parent.style.backgroundSize = "100%"; // resize width to fit
                parent.style.backgroundRepeat = "no-repeat"; // ensure image does not tile if it is smaller than the card
                if (img != null){
                    parent.style.backgroundImage = "url(../res/img/" + img + ")";
                    parent.style.backgroundColor = "#FFFFFF";
                } else {
                    parent.style.backgroundColor = "#FFFFFF";
                }
                parent.addEventListener("click", function(){
                    // var scrollPsreserve;
                    if (parent.classList.contains("reading")){
                    } else {
                        // scrollPreserve = window.pageYOffset || document.documentElement.scrollTop;
                        pubList.getPublication(id);
                        views = parseInt(views) + 1;
                        childViews.innerHTML = views + " views"; /* Update view count locally to match back end */
                    }
                });
                parent.classList.add("loaded");
                }
                /* Child Divs */{
                var childName = document.createElement("div");
                childName.id = "name" + id;
                childName.classList.add("fontHeader");
                childName.classList.add("noselect");
                childName.style.position = "absolute";

                childName.style.overflow = "hidden";
                childName.style.textOverflow = "ellipsis";
                childName.style.wordWrap = "break-word";
                childName.style.display = "block";
                childName.style.lineHeight = "1.14em"; /* a */
                childName.style.maxHeight = "1.14em"; /* a * number of lines to show */

                childName.style.left = "1vw";
                childName.style.top = "1vw";
                childName.innerHTML = name;

                var childDate = document.createElement("div");
                childDate.classList.add("fontInfo")
                childDate.classList.add("noselect");
                childDate.style.position = "absolute";
                childDate.style.right = "1vw";
                childDate.style.top = "1.5vh";
                var dateTimeFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
                childDate.innerHTML = dateTimeFormat.format(date);

                var childDescription = document.createElement("div");
                childDescription.id = "desc" + id;
                childDescription.classList.add("fontSubHeader");
                childDescription.classList.add("noselect");
                childDescription.style.position = "absolute";
                childDescription.style.left = "7vw";
                childDescription.style.top = "3.25em";
                childDescription.style.maxHeight = "11vh";
                childDescription.style.maxWidth = "50vw";
                childDescription.style.overflow = "hidden";
                childDescription.innerHTML = description;

                var childViews = document.createElement("div");
                childViews.classList.add("fontInfo")
                childViews.classList.add("noselect");
                childViews.style.position = "absolute";
                childViews.style.left = "1vw";
                childViews.style.bottom = "1vh";
                childViews.innerHTML = views + " views";

                var childTags = document.createElement("div");
                childTags.style.position = "absolute";
                childTags.classList.add("noselect");
                childTags.style.right = "1vw";
                childTags.style.bottom = "1vh";
                if (tags != null){
                    var tagArray = tags.split(','); // Returns empty array if tags string is empty.
                    tagArray.forEach(tag => {
                        var tagElement = document.createElement("div");
                        tagElement.classList.add("fontTag");
                        tagElement.style.position = "relative";
                        tagElement.innerHTML = tag;
                        tagElement.addEventListener("click", function(event){
                            event.stopPropagation(); // Prevent parent card from receiving click event
                            document.querySelector("#tsb").value = tag;
                            pubSearch.doSearch();
                        })
                        childTags.append(tagElement);
                    });
                }

                var childBackButton = document.createElement("button");
                childBackButton.id = "back" + id;
                childBackButton.style.position ="relative";
                childBackButton.style.left = ".7vw";
                childBackButton.style.top = ".7vw";
                childBackButton.style.zIndex = "5";
                childBackButton.style.width = "3vw";
                childBackButton.style.height = "3.75vw";
                childBackButton.style.opacity = "0";
                childBackButton.style.transition = "all ease-in-out";
                childBackButton.style.transitionDuration = ".382s";
                childBackButton.style.border = "0";
                childBackButton.style.borderRadius = "5px";
                childBackButton.style.backgroundColor = "#eee";
                childBackButton.style.backgroundImage = "url(../res/img/back.webp)";
                childBackButton.style.backgroundSize = "contain";
                var searchTerms = pubSearch.getSearchTerms();
                childBackButton.onclick = function(){
                    pubPage.createPageButtons();
                    pubSearch.createSearchElements();
                    pubList.getFeatured();
                    pubList.getMeta(pubPage.currentPage, searchTerms.filter, searchTerms.search, searchTerms.orderBy, searchTerms.orderDirection);
                };}

                /* Append them all to the DOM */{
                document.querySelector("#pubList").append(parent);
                document.querySelector("#id" + id).append(childName);
                document.querySelector("#id" + id).append(childDate);
                document.querySelector("#id" + id).append(childDescription);
                document.querySelector("#id" + id).append(childViews);
                document.querySelector("#id" + id).append(childTags);
                document.querySelector("#id" + id).append(childBackButton);
                }

                // if (scrollPos != 0){ /* Preserve scroll if coming back from reading a document */
                //     window.scrollTo(0, scrollPos);
                // }
            });
        },
        /* Get markdown from file and pass execution to display it */
        getPublication: function(id){ /* TODO: error reporting */
            var getPublication = new XMLHttpRequest();
            getPublication.open("GET", "readPublication.php?id=" + id);
            getPublication.send();
            getPublication.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    pubList.readPublication(JSON.parse(this.responseText), id);
                } else {}
            };
        },
        /* Take markdown and gently caress the DOM into accepting it */
        readPublication: function(publicationRawMD, id){ /* TODO: hijack back button */
            window.addEventListener('beforeunload', function () { // hijack back button
                // this doesnt work
            });

            /* Remove everything but the clicked card */{
            var pubSearch = document.querySelector("#pubSearch");
            while (pubSearch.firstChild) {
                pubSearch.removeChild(pubSearch.lastChild);
            }
            var pubFeatured = document.querySelector("#pubFeatured");
            while (pubFeatured.firstChild) {
                pubFeatured.removeChild(pubFeatured.lastChild);
            }
            var pubPage = document.querySelector("#pubPage");
            while (pubPage.firstChild) {
                pubPage.removeChild(pubPage.lastChild);
            }

            var pubList = document.querySelector("#pubList");
            var parent = document.querySelector("#id" + id);
            while (pubList.firstChild != pubList.lastChild){ /* Remove all publication cards but the one being read */
                if (pubList.firstChild == parent){
                    pubList.removeChild(pubList.lastChild);
                } else {
                    pubList.removeChild(pubList.firstChild);
                }
            }
            /* Remove all but tags, date, views. Make back button visible. */
            parent.removeChild(document.querySelector("#name" + id));
            parent.removeChild(document.querySelector("#desc" + id));
            document.querySelector("#back" + id).style.opacity = "1";

            parent.style.backgroundColor = "#FFF";
            parent.style.backgroundImage = "";
            parent.style.width = "70vw";
            parent.style.left = "12.5vw";
            parent.style.height = "auto";
            }

            /* Fade in markdown text */{
            var child = document.createElement("div");
            child.classList.add("noselect");
            child.classList.add("pubReading");
            child.style.visibility = "hidden";
            child.style.color = "#fff";
            child.style.position = "relative";
            child.style.transition = "all ease-in-out";
            child.style.transitionDuration = ".382s";
            child.style.width = "55vw";
            child.style.left = "7.5vw";
            child.style.height = "auto";
            child.style.overflow = "hidden";
            setTimeout(() => {
                child.style.visibility = "visible";
                child.style.color = "var(--document-text-color)";
            }, 400);
            child.innerHTML = publicationRawMD;
            var separator = document.createElement("div");
            separator.style.height = "15vh";
            parent.appendChild(child);
            parent.appendChild(separator);

            parent.classList.add("reading");
            parent.classList.remove("loaded");
            }
        }        
    };
})();

/* Module regarding the pubPage div 
    todo*/
var pubPage = (function (){
    return {
        currentPage : 0,
        numArticles: 0,
        /* Create page navigation buttons */
        createPageButtons: function(){
            /* Create the page buttons */{
            var pageParent = document.createElement("div");
            pageParent.classList.add("noselect");
            pageParent.id = "pageParent";
            pageParent.style.marginTop = "2vw";
            pageParent.style.position = "relative";
            pageParent.style.display = "flex";
            pageParent.style.flexDirection = "row";
            pageParent.style.justifyContent = "center";
            pageParent.style.height = "2.5vw";

            var pagePrev = document.createElement("div");
            pagePrev.classList.add("pageButton");
            pagePrev.innerHTML = "<";
            pagePrev.addEventListener('click', function(){
                if (pubPage.currentPage != 0){
                    pubSearch.getSearchTerms(pubPage.goToPage(pubPage.currentPage - 1));
                }
            });
            
            var pageNum = document.createElement("div");
            pageNum.id = "pn";
            pageNum.innerHTML = pubPage.presentablePageNum(pubPage.currentPage);
            pageNum.classList.add("pageButton");
            pageNum.addEventListener('click', function(){
                if (pageNum.classList.contains("open")){
                    document.querySelector("#nb").remove();
                    pageNum.classList.remove("open");
                } else {
                pubPage.getPages(pubPage.createPageNumberButtons);
                }
            });

            var pageNext = document.createElement("div");
            pageNext.classList.add("pageButton");
            pageNext.innerHTML = ">";
            pageNext.addEventListener('click', function(){
                pubPage.getPages();
                var maxPages = Math.ceil(pubPage.numArticles / 10);
                if (pubPage.currentPage < maxPages - 1){
                    pubSearch.getSearchTerms(pubPage.goToPage(pubPage.currentPage + 1));
                }
            });}

            /* Append them to the DOM */{
            document.querySelector("#pubPage").append(pageParent);
            document.querySelector("#pageParent").append(pagePrev);
            document.querySelector("#pageParent").append(pageNum);
            document.querySelector("#pageParent").append(pageNext);
            }
        },
        /* get number of articles for page numbers
        todo: error reporting */
        getPages: function(callback = ""){
            var getPage = new XMLHttpRequest();
            pubSearch.getSearchTerms();
            getPage.open("GET", "publicationPages.php?s=" + pubSearch.searchTerms.search);
            getPage.send();
            getPage.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    pubPage.numArticles = parseInt(JSON.parse(this.response));
                    if (callback != ""){
                        callback();
                    }
                }
            };
        },
        /* create the page selection numbers. */
        createPageNumberButtons: function(){
            var numOfButtons = Math.ceil(pubPage.numArticles / 10);
            var numberButtons = document.createElement("div");
            numberButtons.id = "nb";
            numberButtons.classList.add("noselect");
            numberButtons.style.position = "absolute";
            numberButtons.style.display = "flex";
            numberButtons.style.flexDirection = "row";
            numberButtons.style.marginBottom = "3vw";
            for (var i = 0; i < numOfButtons; i++){
                (function(j){ /* Prevents unintended closure */
                    var childNumberButton = document.createElement("div");
                    childNumberButton.id = "cnb"+j;
                    childNumberButton.classList.add("pageButton");
                    childNumberButton.addEventListener('click', function(){
                        pubSearch.getSearchTerms(pubPage.goToPage(j));
                    });
                    childNumberButton.innerHTML = pubPage.presentablePageNum(j);
                    if(j == pubPage.currentPage){
                        childNumberButton.style.color = "rgb(217, 208, 162)"
                    }
                    numberButtons.appendChild(childNumberButton);
                })(i);
            }
            document.querySelector("#pubPage").append(numberButtons);
            document.querySelector("#pn").classList.add("open");
        },
        /* goes to page in argument */
        goToPage: function(pageNum){
            var oldPage = pubPage.currentPage;
            if (Number.isInteger(pageNum)){
                pubPage.currentPage = pageNum;
                document.querySelector("#pn").innerHTML = pubPage.presentablePageNum(pubPage.currentPage);
                pubSearch.getSearchTerms(pubList.getMeta(pubPage.currentPage, pubSearch.searchTerms.filter, pubSearch.searchTerms.search, pubSearch.searchTerms.orderBy, pubSearch.searchTerms.orderDirection));
                if(document.querySelector("#cnb"+oldPage)){
                    document.querySelector("#cnb"+oldPage).style.color = "#fff";
                }
                if(document.querySelector("#cnb"+pageNum)){
                    document.querySelector("#cnb"+pageNum).style.color = "rgb(217, 208, 162)";
                }
            }
        },
        /* lazy bandaid abstraction so i dont copy/paste lambda functions */
        presentablePageNum: function(num){
            if (num >= 0){
                return num + 1;
            } else {
                return 1;
            }
        }
    };
})();

/* Start after everything loads */
window.addEventListener('load', function (){
    pubPage.createPageButtons();
    pubSearch.createSearchElements(); /* Second in line because of dependency on an element created by createPageButtons */
    pubList.getFeatured();
    pubList.getMeta();
    pubPage.getPages();
})

/* Ramsey Shaban 2020 */