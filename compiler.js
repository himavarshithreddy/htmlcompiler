
// Live preview listener guard
var liveListenersActive = false;

// Run code
function run(){
  var htmlCode = document.getElementById("htmlcode").value;
  var cssCode = "<style>"+document.getElementById("cssCode").value+"</style>";
  var jsCode = "<scri"+"pt>"+document.getElementById("jsCode").value+"</scri"+"pt>";
  var frame = document.getElementById("result").contentWindow.document;
  frame.open();
  frame.write(htmlCode+cssCode+jsCode);
  frame.close();
}

// Live preview toggle
function result() {
  var checkBox = document.getElementById("live");
  if (checkBox.checked == true && !liveListenersActive){
    document.getElementById("htmlcode").addEventListener("input", run);
    document.getElementById("cssCode").addEventListener("input", run);
    document.getElementById("jsCode").addEventListener("input", run);
    liveListenersActive = true;
    run();
  } else if (checkBox.checked == false) {
    document.getElementById("run").addEventListener("click", run);
  }
}

// Change theme
function theme(){
  var check = document.getElementById("theme");
  if (check.checked == true){
    lightmode();
  } else {
    darkmode();
  }
}

// Change orientation
function orientation(){
  var checko = document.getElementById("orientation");
  if (checko.checked == true){
    Landscape();
  } else {
    portrait();
  }
}

// Split editor — controls which panels are visible and how they are sized
function split(){
  var check1 = document.getElementById("orientation");
  var check2 = document.getElementById("split");
  var htmlPanel = document.getElementById("htmlPanel");
  var cssPanel  = document.getElementById("cssPanel");
  var jsPanel   = document.getElementById("jsPanel");
  var editor    = document.getElementById("editor");

  if (check1.checked == false && check2.checked == false) {
    // Portrait, no split — only HTML panel
    cssPanel.style.display = "none";
    jsPanel.style.display  = "none";
    htmlPanel.style.cssText = "display:flex;flex-direction:column;width:100%;height:100%";
    editor.style.width = "49%";
    editor.style.flexDirection = "column";

  } else if (check1.checked == false && check2.checked == true) {
    // Portrait, split — three panels stacked vertically
    htmlPanel.style.cssText = "display:flex;flex-direction:column;width:100%;height:33%";
    cssPanel.style.cssText  = "display:flex;flex-direction:column;width:100%;height:33%";
    jsPanel.style.cssText   = "display:flex;flex-direction:column;width:100%;height:33%";
    editor.style.flexDirection = "column";
    editor.style.width = "49%";

  } else if (check1.checked == true && check2.checked == true) {
    // Landscape, split — three panels side by side
    htmlPanel.style.cssText = "display:flex;flex-direction:column;width:33.1%;height:100%";
    cssPanel.style.cssText  = "display:flex;flex-direction:column;width:33.1%;height:100%";
    jsPanel.style.cssText   = "display:flex;flex-direction:column;width:33.1%;height:100%";
    editor.style.flexDirection = "row";
    editor.style.width = "99%";

  } else {
    // Landscape, no split — only HTML panel (full width)
    cssPanel.style.display = "none";
    jsPanel.style.display  = "none";
    htmlPanel.style.cssText = "display:flex;flex-direction:column;width:100%;height:98%";
    editor.style.width = "98.5%";
    editor.style.flexDirection = "column";
  }
}

// Stop live preview listeners
function running() {
  var checkBox = document.getElementById("live");
  if (checkBox.checked == false){
    document.getElementById("htmlcode").removeEventListener("input", run);
    document.getElementById("cssCode").removeEventListener("input", run);
    document.getElementById("jsCode").removeEventListener("input", run);
    liveListenersActive = false;
  }
}

// Download / save
function download(){
  var checks = document.getElementById("split");
  if (checks.checked == true){
    var text1 = document.getElementById("htmlcode").value.replace(/<\/html>/gi, "");
    var text2 = "<style>"+document.getElementById("cssCode").value+"</style>";
    var text3 = "<scri"+"pt>"+document.getElementById("jsCode").value+"</scri"+"pt>"+"</html>";
    text1 = text1.replace(/\n/g, "\r\n");
    text2 = text2.replace(/\n/g, "\r\n");
    text3 = text3.replace(/\n/g, "\r\n");
    var blob = new Blob([text1, text2, text3], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "file.html";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } else {
    var text = document.getElementById("htmlcode").value;
    text = text.replace(/\n/g, "\r\n");
    var blob = new Blob([text], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "file.html";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}

// Landscape orientation
function Landscape(){
  document.getElementById('result').style.width = '201%';
  document.getElementById("compiler").style.flexDirection = "column";
  document.getElementById("result").style.marginLeft = "0.4%";
  document.getElementById("result").style.height = "98%";
}

// Portrait orientation
function portrait(){
  document.getElementById('result').style.width = '100%';
  document.getElementById("compiler").style.flexDirection = "row";
  document.getElementById("result").style.marginLeft = "0.1%";
  document.getElementById("result").style.height = "100%";
}

// Fullscreen preview
function full(){
  var checkf = document.getElementById("orientation");
  if(checkf.checked == false){
    document.getElementsByTagName("iframe")[0].classList.add("fullScreen1");
    document.getElementById("close").style.display = "block";
    document.getElementById("result").style.marginLeft = "0%";
    document.getElementById("result").style.height = "100%";
  } else {
    document.getElementsByTagName("iframe")[0].classList.add("fullScreen2");
    document.getElementById("close").style.display = "block";
    document.getElementById("result").style.width = "100%";
    document.getElementById("result").style.marginLeft = "0%";
    document.getElementById("result").style.height = "100%";
  }
}

// Close fullscreen
function closefull(){
  var checkf = document.getElementById("orientation");
  if(checkf.checked == true){
    document.getElementsByTagName("iframe")[0].classList.remove("fullScreen1");
    document.getElementsByTagName("iframe")[0].classList.remove("fullScreen2");
    document.getElementById("close").style.display = "none";
    document.getElementById("result").style.width = "200%";
    document.getElementById("result").style.marginLeft = "0.8%";
  } else {
    document.getElementsByTagName("iframe")[0].classList.remove("fullScreen1");
    document.getElementsByTagName("iframe")[0].classList.remove("fullScreen2");
    document.getElementById("close").style.display = "none";
    document.getElementById("result").style.width = "100%";
    document.getElementById("result").style.marginLeft = "0.1%";
  }
}

// Light mode — adds body class; CSS custom properties handle all colour changes
function lightmode(){
  document.getElementById("body").classList.add("light-mode");
}

// Dark mode — removes body class
function darkmode(){
  document.getElementById("body").classList.remove("light-mode");
}
