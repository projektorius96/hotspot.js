<!-- TITLE -->
# hotspot.js (+gas integration provided)
<!-- TITLE -->

<!-- BADGES (IF ANY) -->
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)]()
[![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
<br>
[![GAS](https://img.shields.io/badge/google--apps--script-integrated-orange)]()
<!-- BADGES (IF ANY) -->

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Content <i>[under construction]</i></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li>
      <a href="#acknowledgements">Acknowledgements</a>
    </li>
    <li>
      <a href="#useful-refs">Useful references</a>
    </li>
    <li>
      <a href="#license">License</a>
    </li>
  </ol>
</details>
<!-- TABLE OF CONTENTS -->

---

<!-- ABOUT THE PROJECT -->
## [About The Project](#about-the-project)
**Cited**: Apps Script is a scripting platform developed by Google for light-weight application development in the Google Workspace platform. Google Apps Script was initially developed by Mike Harm as a side project whilst working as a developer on Google Sheets.

It's over the decade to be be open for everyone who is least one hand into Google Services such as Google Docs, Maps or Sheets. Particular to later i.e. Google Sheets (GS) that comes hand in hand with Google Apps Script (GAS) Integrated Development Environment (IDE) can be made use of as for back-end projects i.e. the database on the fly with a few lines of code as presented within boilerplate in [Getting Started](#getting-started) section down below.
<!-- ABOUT THE PROJECT -->

---

<!-- GETTING STARTED -->
## [Getting Started](#getting-started)
For a further do I am sharing a ready to go JavaScript boilerplate for Google Apps Script (GAS) integration. This back-end boilerplate comes hand in hand with **FETCH API** which content declared within the file of **script.js** provided as an integration example with **Hotspot widget** written totally in vanilla JavaScript flavour by me i.e. @projektorius96 . Instead of ready deployed application I am sharing a touch of interation on one's own _account of Google_ which is _the only prerequisite_ needed to meet for you to be fully set. 

**PLEASE READ _STEPS MUST FOLLOW_ CAREFULLY**
```javascript
// STEPS MUST FOLLOW:
/*
* PUBLISH THE SPREADSHEET TO ANYONE ON WEB
** DEPLOY APPS-SCRIPT's CONTENT OF : doGet, doPost TO ANYONE ON WEB
*** USE /EXEC URL (ENDPOINT) OF THE CURRENT_DEPLOYMENT_ID
*/

// BACK-END (*GOOGLE APPS-SCRIPT IDE):
  
  function doGet(e){

  try {
    const db = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // get active **Google Sheets | this is similar to document.getElementsById
    // const data = db.getRange("a1notation").getValues(); /* – this is an alternative accessor (reference) to range */
    const data = db.getRange(db.getLastRow(),1).getValues(); // get range of the last field (row) on **GS
    const jsonData = JSON.stringify(Object.assign({}, data.flat() )); // [[]] –> {} | /* otherwise do sth like that : JSON.stringify({accessHandler: e}); */
    Logger.log(jsonData); // to debug on *GAS IDE side
    return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON); // DO GET DATA to external app (localhost) if successful
  }

  catch(e){
      const error = {"error": e}; // define error object for catch{} statement
      const jsonError = JSON.stringify(error); // stringify error be ready to be passed via Network
      return ContentService.createTextOutput(jsonError).setMimeType(ContentService.MimeType.JSON); // THROW ERROR if not successful
  }
  
}

function doPost(e) {
  const body = e.postData.contents; // IN CHARGE TO ACCEPT DATA TRANSMISSION AS JSON BODY via Network
  const bodyJSON = JSON.parse(body); // Convert JSON to JavaScript object in order to understand "the content"
  const db = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // reference to the data on **GS
  db.getRange("A1:A20").setNumberFormat("@"); // implicitly set type format to TEXT
  db.appendRow([bodyJSON.coords]); // DO POST DATA to the **GS
  // db.appendRow([bodyJSON._sameNameHandler]); /* _sameNameHandler as within external app FETCH API POST request */
}

```
<span style="color:red"><b>CAUTION</b></span> : each way you follow, you will have to update <span style="color:black"><b>request_url</b><span><span style="color:black"> variable with up-to-date <b>/CURRENT_DEPLOYMENT_ID/</b> of one's deployment (version) which can be found in GAS IDE Manage Deployments Dialog<span>

---

In terms of FETCH API request within **script.js** provided : if it appeared too advanced for one's eye, I am providing a more simplified bare minimum boilerplate . <b>This is for Front-end particularly ! </b>
```javascript
// FRONT-END:

  // Push data in Google Sheets from external app :
  const request_url = "https://script.google.com/macros/s/CURRENT_DEPLOYMENT_ID/exec";

  fetch(request_url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify(/* { _sameNameHandler: `${ Your external app dataVariable be processed via doPost(e) */)
  });

  // Pull data out (GET DATA) of Google Sheets to external app :
  fetch(request_url).then(response => response.json()).then(response => console.log(response));
```
<!-- GETTING STARTED -->

---

<!-- PREREQUISITES -->
## [Acknowledgements](#acknowledgements)
- [CCC](http://www.chicagocomputerclasses.com/)
- [Apps Script](https://developers.google.com/apps-script)
- [Image used](https://freevectormaps.com/lithuania/LT-EPS-02-0003?ref=search_result)
<!-- PREREQUISITES -->

---

<!-- REFERENCES -->
## [Useful references](#useful-refs)
- [Google Cheat Sheet](https://codepen.io/projektorius96/pen/qBqXqEq)<br>
- [Google Sheets API for beginners](https://docs.google.com/document/d/1diPskvvA-XfTA2akGeoDBgRLC7DU3150pKrIQThonIU/edit?usp=sharing)
<!-- REFERENCES -->

---

<!-- LICENSE -->
## [License](#license)
### [MIT](https://github.com/projektorius96/hotspot.js/blob/master/LICENSE.txt)
<!-- LICENSE  -->