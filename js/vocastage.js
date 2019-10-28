//Line 157 => sendingMessages

function bodyprint() {
  var bodyText = document.querySelector("body").innerText;

  alert(bodyText);
}

//shorten creating new element
function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

//shorten the appending feature
function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

function createText(parent, el) {
  let text = docment.createTextNode(`${el}`);
  append(parent, text);
}

let printMeaning = (txt, tooltip) => {
  let bullet = 1;

  //top div
  let block = createNode("div");

  var addDict = createNode("div");
  var plus = createNode("a");
  var toDict = document.createTextNode("+ Add to Your Dictionary");
  var box = createNode("div");

  //assing the class name to create elemen
  addDict.classList.add("Dict");
  box.classList.add("test");

  //anchor to individual dictinoary
  plus.setAttribute("href", "#");
  plus.appendChild(toDict);
  addDict.appendChild(plus);

  block.classList.add("card");

  txt.forEach(function(element) {
    let line = createNode("div");
    var span = createNode("span");
    var defitintion = document.createTextNode(element);
    var number = document.createTextNode(bullet + `. `);

    line.classList.add("meaning-of-word");
    span.classList.add("bullet");

    span.appendChild(number);
    span.appendChild(defitintion);

    line.appendChild(span);

    block.appendChild(line);

    bullet += 1;
  });

  tooltip.appendChild(block);
  tooltip.appendChild(addDict);
  tooltip.appendChild(box);
};

// chrome.runtime.onMessage.addListener(async function(
//   request,
//   sender,
//   sendResponse
// ) {
//   if (request.contentScriptQuery == "voca") {
//     const response = await fetch(
//       `https://twinword-word-graph-dictionary.p.rapidapi.com/definition_kr/?entry="contemplate"`,
//       {
//         mode: "no-cors",
//         method: "GET",
//         headers: {
//           "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
//           "x-rapidapi-key": key
//         }
//       }
//     ).catch(err => {
//       console.log(err);
//     });
//     console.log("it's in");
//     const json = await response.json();
//     console.log(`${typeof json}`);

//     console.log(`${json.meaning.korean}`);

//     return json.meaning.korean;
//   }
// });

async function getDefinition(def, definition) {
  // fetch(
  //   `https://twinword-word-graph-dictionary.p.rapidapi.com/definition_kr/?entry=${def}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
  //       "x-rapidapi-key": key
  //     }
  //   }
  // )
  //   .then(response => response.json())
  //   .then(jsondata => jsondata.meaning.korean)
  //   .catch(err => {
  //     console.log(err);
  //   });

  const response = await fetch(
    `https://twinword-word-graph-dictionary.p.rapidapi.com/definition_kr/?entry=${def}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
        "x-rapidapi-key": key
      }
    }
  ).catch(err => {
    console.log(err);
  });

  const json = await response.json();
  // console.log(`${typeof json}`);
  // console.log(`${json}`);

  return json.meaning.korean;
}

//Removing Tooltip function
let removeTooltip = function(e, obj) {
  var elem = document.querySelector(".div-tooltip");
  elem.remove();
};

//Poping up tooltip upon dblclick event
let displayTooltip = async function(e, obj) {
  //selecting the dblclicked word
  var txt = document.getSelection();
  var txtLeng = txt.toString().length;
  let definition = "";

  // definition1 = Promise.resolve(getDefinition(txt, definition));
  // definition1.then(function(value) {
  //   definition = value;
  // });

  console.log(`${txt}`);

  //background.js 로 보내는 메세지
  /* chrome.runtime.sendMessage({ word: txt }, function(response) {
    console.log(response);
    console.log("Hola2");
  }); */
  const item = await fetchTest(txt);
  console.log("!! item", item);
  console.log("!! item.result", item.result);
  //   definition = await getDefinition(txt, definition);
  //   definition = chrome.runtime.sendMessage({ contentScriptQuery: "voca" });
  console.log("out");
  //   console.log(`${typeof definition}`);
  //   console.log(`${definition}`);

  var listDef = definition.split(",");
  // definition = getDefinition(txt);

  // console.log(`툴팁 의미 : ${definition}`);
  //injecting a new element named 'div-tooltip' onto DOM

  const tooltip = document.createElement("div");
  tooltip.className = "div-tooltip";
  //Invoking the block of the selected area and the following selected position :top right bottom left.
  var range = txt.getRangeAt(0);
  var boundary = range.getBoundingClientRect();

  //Adjusting the position of tooltip
  var tooltipTop = boundary.bottom - 15;
  var tooltipLeft = boundary.left - 35;

  //Inserting the element to body
  document.body.appendChild(tooltip);

  //Assinging the value of the height of block including the contents
  var tooltipHeight = document.querySelector(".div-tooltip");

  //Dummy data in tooltip
  // tooltip.innerHTML = `${definition}`;

  //if text is composed of two letters at least .
  if (txtLeng > 1) {
    //Condition checking if the tooltip is out of boundary following on the width and height of the browser
    if (tooltipLeft + tooltipHeight.offsetWidth > window.innerWidth) {
      tooltipLeft = tooltipLeft - 150;
    }
    if (tooltipTop + tooltipHeight.offsetHeight > window.innerHeight) {
      tooltipTop = tooltipTop - tooltipHeight.offsetHeight - 30;
      tooltip.style.top = tooltipTop + "px";
      tooltip.style.left = tooltipLeft + "px";
    } else {
      tooltip.style.top = tooltipTop + "px";
      tooltip.style.left = tooltipLeft + "px";
    }
    //Switching the value of the opacity to 1 to display the tooltip
    tooltip.style.opacity = 1;
  }

  printMeaning(listDef, tooltip);
};

//Setting up the basement to capture all the elements in the body
let setUpToolTip = function() {
  toolTipElements = Array.from(document.querySelectorAll("body"));

  toolTipElements.forEach(function(elem) {
    //dblclicking event
    elem.addEventListener("dblclick", function(e) {
      displayTooltip(e, this);
    });

    //let tooltip be vanished upon the events : click || scorll
    document.addEventListener("click", function(e) {
      if (document.contains(document.querySelector(".div-tooltip"))) {
        removeTooltip(e, this);
      }
    });
    document.addEventListener("scroll", function(e) {
      if (document.contains(document.querySelector(".div-tooltip"))) {
        removeTooltip(e, this);
      }
    });
  });
};

//Initializing all the functions
function init() {
  setUpToolTip();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
});

async function fetchTest(text) {
  return await sendMessage({
    contentScriptQuery: "queryTest",
    word: text
  });
}
function sendMessage(data) {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendMessage(data, res => {
      console.log("result：", res);

      resolve(res);
    });
  });
}
