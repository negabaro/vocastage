function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

//cool functions to shorten the appending feature
function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

let printMeaning = (txt, tooltip) => {
  let bullet = 1;

  //top div
  let block = createNode("div");

  var addDict = createNode("div");
  var plus = createNode("a");
  var toDict = document.createTextNode("+ Add to Your Dictionary");
  var box = createNode("div");
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
  // addDict.addEventListener("mouseenter", function(event) {
  //   event.target.style.color = "green";
  // });
};

//Removing Tooltip function
let removeTooltip = function(e, obj) {
  var elem = document.querySelector(".div-tooltip");
  elem.remove();
};

//Poping up tooltip upon dblclick event
let displayTooltip = function(e, obj) {
  //selecting the dblclicked word
  var txt = document.getSelection();
  var txtLeng = txt.toString().length;

  //injecting a new element named 'div-tooltip' onto DOM
  let tooltip = document.createElement("div");
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
  var str = "banana,apple,candy";
  var listDef = str.split(",");
  printMeaning(listDef, tooltip);

  // console.log(listDef);
  // console.log(listDef.length);
  // tooltip.innerHTML = `${listDef[0]} <br>
  // ${listDef[1]} <br>
  // ${listDef[2]}`;

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
