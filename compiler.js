
// Live preview listener guard
var liveListenersActive = false;

// ===== Run code =====
function run(){
  var htmlCode = document.getElementById("htmlcode").value;
  var cssCode  = "<style>" + document.getElementById("cssCode").value + "</style>";
  var jsCode   = "<scri" + "pt>" + document.getElementById("jsCode").value + "</scri" + "pt>";
  var frame    = document.getElementById("result").contentWindow.document;
  frame.open();
  frame.write(htmlCode + cssCode + jsCode);
  frame.close();
}

// ===== Live preview toggle =====
function result() {
  var checkBox = document.getElementById("live");
  if (checkBox.checked && !liveListenersActive) {
    document.getElementById("htmlcode").addEventListener("input", run);
    document.getElementById("cssCode").addEventListener("input", run);
    document.getElementById("jsCode").addEventListener("input", run);
    liveListenersActive = true;
    run();
  }
}

function running() {
  var checkBox = document.getElementById("live");
  if (!checkBox.checked) {
    document.getElementById("htmlcode").removeEventListener("input", run);
    document.getElementById("cssCode").removeEventListener("input", run);
    document.getElementById("jsCode").removeEventListener("input", run);
    liveListenersActive = false;
  }
}

// ===== Theme =====
function theme(){
  var check = document.getElementById("theme");
  if (check.checked) {
    lightmode();
  } else {
    darkmode();
  }
}

function lightmode(){
  document.getElementById("body").classList.add("light-mode");
  var el = document.getElementById("statusTheme");
  if (el) el.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Light';
}

function darkmode(){
  document.getElementById("body").classList.remove("light-mode");
  var el = document.getElementById("statusTheme");
  if (el) el.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg> Dark';
}

// ===== Orientation =====
function orientation(){
  var checko = document.getElementById("orientation");
  if (checko.checked) {
    Landscape();
  } else {
    portrait();
  }
}

// ===== Split editor =====
function split(){
  var check1   = document.getElementById("orientation");
  var check2   = document.getElementById("split");
  var htmlPanel = document.getElementById("htmlPanel");
  var cssPanel  = document.getElementById("cssPanel");
  var jsPanel   = document.getElementById("jsPanel");
  var editor    = document.getElementById("editor");

  if (!check1.checked && !check2.checked) {
    cssPanel.style.display  = "none";
    jsPanel.style.display   = "none";
    htmlPanel.style.cssText = "display:flex;flex-direction:column;width:100%;height:100%";
    editor.style.width = "48%";
    editor.style.flexDirection = "column";

  } else if (!check1.checked && check2.checked) {
    htmlPanel.style.cssText = "display:flex;flex-direction:column;width:100%;height:33%";
    cssPanel.style.cssText  = "display:flex;flex-direction:column;width:100%;height:33%";
    jsPanel.style.cssText   = "display:flex;flex-direction:column;width:100%;height:33%";
    editor.style.flexDirection = "column";
    editor.style.width = "48%";

  } else if (check1.checked && check2.checked) {
    htmlPanel.style.cssText = "display:flex;flex-direction:column;width:33%;height:100%";
    cssPanel.style.cssText  = "display:flex;flex-direction:column;width:33%;height:100%";
    jsPanel.style.cssText   = "display:flex;flex-direction:column;width:33%;height:100%";
    editor.style.flexDirection = "row";
    editor.style.width = "99%";

  } else {
    cssPanel.style.display  = "none";
    jsPanel.style.display   = "none";
    htmlPanel.style.cssText = "display:flex;flex-direction:column;width:100%;height:100%";
    editor.style.width = "99%";
    editor.style.flexDirection = "column";
  }
}

// ===== Download / Save =====
function download(){
  var checks = document.getElementById("split");
  var blob, text;
  if (checks.checked) {
    var text1 = document.getElementById("htmlcode").value.replace(/<\/html>/gi, "");
    var text2 = "<style>"  + document.getElementById("cssCode").value + "</style>";
    var text3 = "<scri" + "pt>" + document.getElementById("jsCode").value + "</scri" + "pt>" + "</html>";
    text1 = text1.replace(/\n/g, "\r\n");
    text2 = text2.replace(/\n/g, "\r\n");
    text3 = text3.replace(/\n/g, "\r\n");
    blob = new Blob([text1, text2, text3], { type: "text/html" });
  } else {
    text = document.getElementById("htmlcode").value.replace(/\n/g, "\r\n");
    blob = new Blob([text], { type: "text/html" });
  }
  var anchor = document.createElement("a");
  anchor.download = "index.html";
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target = "_blank";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  showToast("File saved as index.html", "success");
}

// ===== Landscape orientation =====
function Landscape(){
  document.getElementById("result").style.width       = '200%';
  document.getElementById("compiler").style.flexDirection = "column";
  document.getElementById("result").style.marginLeft  = "0.4%";
  document.getElementById("result").style.height      = "98%";
}

// ===== Portrait orientation =====
function portrait(){
  document.getElementById("result").style.width       = '100%';
  document.getElementById("compiler").style.flexDirection = "row";
  document.getElementById("result").style.marginLeft  = "0.1%";
  document.getElementById("result").style.height      = "100%";
}

// ===== Fullscreen preview =====
function full(){
  var checkf = document.getElementById("orientation");
  if (!checkf.checked) {
    document.getElementsByTagName("iframe")[0].classList.add("fullScreen1");
    document.getElementById("close").style.display = "flex";
    document.getElementById("result").style.marginLeft = "0%";
    document.getElementById("result").style.height     = "100%";
  } else {
    document.getElementsByTagName("iframe")[0].classList.add("fullScreen2");
    document.getElementById("close").style.display = "flex";
    document.getElementById("result").style.width      = "100%";
    document.getElementById("result").style.marginLeft = "0%";
    document.getElementById("result").style.height     = "100%";
  }
}

function closefull(){
  var checkf = document.getElementById("orientation");
  document.getElementsByTagName("iframe")[0].classList.remove("fullScreen1");
  document.getElementsByTagName("iframe")[0].classList.remove("fullScreen2");
  document.getElementById("close").style.display = "none";
  if (checkf.checked) {
    document.getElementById("result").style.width      = "200%";
    document.getElementById("result").style.marginLeft = "0.8%";
  } else {
    document.getElementById("result").style.width      = "100%";
    document.getElementById("result").style.marginLeft = "0.1%";
  }
}

// ===== Toast notification system =====
function showToast(message, type) {
  type = type || "info";
  var container = document.getElementById("toast-container");
  if (!container) return;

  var icons = {
    success: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    error:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    info:    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>'
  };

  var toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerHTML = (icons[type] || "") + message;
  container.appendChild(toast);

  setTimeout(function() {
    toast.classList.add("hide");
    toast.addEventListener("animationend", function() { toast.remove(); });
  }, 2200);
}

// ===== Copy panel code to clipboard =====
function copyPanel(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var text = el.value;
  if (!text.trim()) { showToast("Nothing to copy", "info"); return; }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(function() {
      showToast("Code copied to clipboard", "success");
    }).catch(function() {
      _fallbackCopy(text);
    });
  } else {
    _fallbackCopy(text);
  }
}

function _fallbackCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
    showToast("Code copied to clipboard", "success");
  } catch(e) {
    showToast("Copy failed — please use Ctrl+A, Ctrl+C", "error");
  }
  document.body.removeChild(ta);
}

// ===== Clear panel code =====
function clearPanel(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.value = "";
  updateStatusBar(el);
  run();
  showToast("Editor cleared", "info");
}

// ===== Status bar =====
function updateStatusBar(textarea) {
  var cursorEl = document.getElementById("statusCursor");
  var charsEl  = document.getElementById("statusChars");
  var panelEl  = document.getElementById("statusPanel");
  if (!textarea) return;

  // Cursor position
  if (cursorEl) {
    var val  = textarea.value.substring(0, textarea.selectionStart);
    var lines = val.split("\n");
    var ln   = lines.length;
    var col  = lines[lines.length - 1].length + 1;
    cursorEl.textContent = "Ln " + ln + ", Col " + col;
  }

  // Character count
  if (charsEl) {
    var len = textarea.value.length;
    charsEl.textContent = len.toLocaleString() + " chars";
  }

  // Active panel label
  if (panelEl) {
    var idMap = { htmlcode: "HTML", cssCode: "CSS", jsCode: "JS" };
    panelEl.textContent = idMap[textarea.id] || "HTML";
  }
}

function initStatusBar() {
  var textareas = document.querySelectorAll('textarea');
  textareas.forEach(function(ta) {
    ta.addEventListener('click',    function() { updateStatusBar(this); });
    ta.addEventListener('keyup',    function() { updateStatusBar(this); });
    ta.addEventListener('input',    function() { updateStatusBar(this); });
    ta.addEventListener('focus',    function() { updateStatusBar(this); });
    ta.addEventListener('selectionchange', function() { updateStatusBar(this); });
  });
  // Initialise with the HTML editor
  var html = document.getElementById("htmlcode");
  if (html) updateStatusBar(html);
}

// ===== Drag-to-resize panels =====
function initResizer() {
  var resizer  = document.getElementById("resizer");
  var editor   = document.getElementById("editor");
  var compiler = document.getElementById("compiler");
  if (!resizer || !editor || !compiler) return;

  var MIN_PANEL_WIDTH = 180; // px — minimum width for either the editor or the preview
  var RESIZER_WIDTH   = 5;   // px — must match --resizer-w in compiler.css

  var isDown = false;
  var startX, startW;

  resizer.addEventListener("mousedown", function(e) {
    var check1 = document.getElementById("orientation");
    if (check1 && check1.checked) return; // disable in landscape mode
    isDown = true;
    startX = e.clientX;
    startW = editor.getBoundingClientRect().width;
    resizer.classList.add("dragging");
    document.body.style.cursor  = "col-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  });

  document.addEventListener("mousemove", function(e) {
    if (!isDown) return;
    var dx     = e.clientX - startX;
    var total  = compiler.getBoundingClientRect().width;
    var newW   = Math.min(Math.max(startW + dx, MIN_PANEL_WIDTH), total - MIN_PANEL_WIDTH - RESIZER_WIDTH);
    editor.style.width = newW + "px";
    editor.style.flexShrink = "0";
  });

  document.addEventListener("mouseup", function() {
    if (!isDown) return;
    isDown = false;
    resizer.classList.remove("dragging");
    document.body.style.cursor     = "";
    document.body.style.userSelect = "";
  });

  // Touch support
  resizer.addEventListener("touchstart", function(e) {
    var check1 = document.getElementById("orientation");
    if (check1 && check1.checked) return;
    isDown = true;
    startX = e.touches[0].clientX;
    startW = editor.getBoundingClientRect().width;
    resizer.classList.add("dragging");
    e.preventDefault();
  }, { passive: false });

  document.addEventListener("touchmove", function(e) {
    if (!isDown) return;
    var dx    = e.touches[0].clientX - startX;
    var total = compiler.getBoundingClientRect().width;
    var newW  = Math.min(Math.max(startW + dx, MIN_PANEL_WIDTH), total - MIN_PANEL_WIDTH - RESIZER_WIDTH);
    editor.style.width = newW + "px";
    editor.style.flexShrink = "0";
  }, { passive: true });

  document.addEventListener("touchend", function() {
    if (!isDown) return;
    isDown = false;
    resizer.classList.remove("dragging");
  });
}

