'use strict';

(function(){/* Encapsulation starts here : */
    let liveImageMirror = document.getElementById("img-instance");
    let areaX = Number;
    let areaY = Number;
    let pair_of_coords = [];
    
    function callback(e, inputTag, content, outputTag) {
    let NODE_Element = document.createElement(inputTag);
    let NODE_Content = document.createTextNode(content);
    NODE_Element.appendChild(NODE_Content);
    document.querySelector(outputTag).appendChild(NODE_Element);
    NODE_Element.setAttribute("class", "fas fa-map-marker-alt fa-lg");
    document.querySelector(outputTag).lastElementChild.style.left = `${e.clientX}px`; // left = x 
    document.querySelector(outputTag).lastElementChild.style.top = `${e.clientY}px`; // top = y
    }

    // [ISSUE #1] 
    // Currently, remover is not synced with Google Sheets...
    // ... i.e. whenever sync will be implemented, it will work as method PUT (UPDATE) ;
    document.getElementById("btn-rm").addEventListener("click", function () {
    alert("Double click on the marker to remove one. To continue press Enter");
    document.getElementById("outer-container").children;
    for (let i of document.getElementById("outer-container").children) {
        i.addEventListener("dblclick", (e)=> {
        document.getElementById("outer-container").removeChild(e.target);
        }, false);
    }
    }); 
    
    liveImageMirror.addEventListener("click", function(e){ eHandler(e) }, false);
    function eHandler(e) {
    areaX = e.clientX; /* console.log("mouse event coords at X is: ", areaX); */
    areaY = e.clientY; /* console.log("mouse event coords at Y is: ", areaY); */
    pair_of_coords.push(areaX, areaY, 0, 0); // make sure it set to the pair of zeros at the very end of very .push() to prevent data type refactoring "culprit" within Google Sheets;
    liveImageMirror.setAttribute("coords", pair_of_coords); // e.target = liveImageMirror;

    callback(e, 'i', '', 'div#outer-container'); // [CRUCIAL LINE] : DO NOT REMOVE IT!
        
        const request_url = "https://script.google.com/macros/s/CURRENT_DEPLOYMENT_ID/exec"; // CURRENT_DEPLOYMENT_ID (URL)

        // Push data in Google Sheets via doPost() :
        fetch(request_url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({ coords: `${pair_of_coords/* .slice(-4) *//* use .slice(-4) for non-incremental version of coords in JSON */}` })
        });

        // Pull data out of Google Sheets via doGet() :
        fetch(request_url).then(response => response.json()).then(response => {
            let local_doGet_coords = Object.values(response);
            let reString = local_doGet_coords.toString().replace(/,0,0,/g,","/*(A)*/).replace(/,0,0/g,""/*(B)*/); // (A) zeros in between & (B) the very last coords 
            console.log(reString);
        })
    } /* eHandler function body closing bracket */

    /* Encapsulation ends up here ; */})();  
    
    // Final doGet :
    document.getElementById("btn-update").addEventListener("click", function () {
        const request_url = "https://script.google.com/macros/s/CURRENT_DEPLOYMENT_ID/exec"; // CURRENT_DEPLOYMENT_ID (URL)
        // BE NOTICED – it will return FINAL doGet of the very last browser session :
        fetch(request_url).then(response => response.json()).then(response => { let local_doGet_coords = Object.values(response);
                let reString = local_doGet_coords.toString().replace(/,0,0,/g,",").replace(/,0,0/g,"");
                console.log(reString);
        })
    });