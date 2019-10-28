function showup(e) {
  chrome.tabs.executeScript(null, {
    code: `
    var bodyText = document.querySelector("body").innerText;
    alert(bodyText);
    `
  });
}

document.addEventListener("DOMContentLoaded", function() {
  var btn01 = document.querySelector("#btn");
  btn01.addEventListener("click", showup);
});
