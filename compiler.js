// run code
function run(){
  
  var htmlCode = document.getElementById("htmlcode").value;
  var cssCode = "<style>"+document.getElementById("cssCode").value+"</style>";
  var jsCode = "<scri"+"pt>"+document.getElementById("jsCode").value+"</scri"+"pt>";
  var frame = document.getElementById("result").contentWindow.document;
  frame.open();
  frame.write(htmlCode+cssCode+jsCode);
  frame.close();
}
  
  
//   live preview
      function result() {
  var checkBox = document.getElementById("live");
  if (checkBox.checked == true){
    document.getElementById("htmlcode").addEventListener("input", run),
    document.getElementById("cssCode").addEventListener("input", run),
    document.getElementById("jsCode").addEventListener("input", run),
    run();
    }
      else{
        document.getElementById("run").addEventListener("click", run)
      }
      
  }
//   change theme
  function theme(){
    var check = document.getElementById("theme");
    if (check.checked == true){
      lightmode();
    }
    else{
      darkmode();
    }
  } 
//   change orientation
  function orientation(){
    var checko = document.getElementById("orientation");
    if (checko.checked == true){
      Landscape();
    }
    else{
      portrait();
    }
  } 
//   split Oreintaion
  function split(){
    var check1 = document.getElementById("orientation");
    var check2 = document.getElementById("split");

    if (check1.checked == false && check2.checked == false ) {
 document.getElementById("cssCode").style.width="0px",
 document.getElementById("cssCode").style.height="0px",
 document.getElementById("cssCode").style.padding="0px",
 document.getElementById("jsCode").style.width="0px";
 document.getElementById("jsCode").style.height="0px";
 document.getElementById("jsCode").style.padding="0px";
 document.getElementById("htmlcode").style.width="100%";
 document.getElementById("htmlcode").style.height="100%";
 document.getElementById("editor").style.width="49%";
 


    }
    else if(check1.checked == false && check2.checked == true){
      document.getElementById("htmlcode").style.height="33%";
      document.getElementById("cssCode").style.height="33%",
      document.getElementById("jsCode").style.height="33%";
      document.getElementById("cssCode").style.width="100%",
      document.getElementById("htmlcode").style.width="100%",
      document.getElementById("jsCode").style.width="100%",
      document.getElementById("cssCode").style.padding="5px 5px 5px 10px",
      document.getElementById("jsCode").style.padding="5px 5px 5px 10px";
      document.getElementById("editor").style.flexDirection="column";
      document.getElementById("editor").style.width="49%";
    }
else if(check1.checked == true && check2.checked == true){
  document.getElementById("htmlcode").style.height="98%";
  document.getElementById("cssCode").style.height="98%",
  document.getElementById("jsCode").style.height="98%";
  document.getElementById("cssCode").style.width="33.1%",
  document.getElementById("jsCode").style.width="33.1%",
  document.getElementById("htmlcode").style.width="33.1%",
  document.getElementById("cssCode").style.padding="5px 5px 5px 10px",
  document.getElementById("jsCode").style.padding="5px 5px 5px 10px";
  document.getElementById("editor").style.width="99%";
  document.getElementById("editor").style.flexDirection="row";
  document.getElementById("htmlcode").style.marginLeft="0%";
}
else{
  document.getElementById("htmlcode").style.height="98%";
  document.getElementById("cssCode").style.height="0px",
  document.getElementById("jsCode").style.height="0px";
  document.getElementById("cssCode").style.width="0px",
  document.getElementById("jsCode").style.width="0px",
  document.getElementById("htmlcode").style.width="100%"
  document.getElementById("cssCode").style.padding="0",
  document.getElementById("jsCode").style.padding="0";
  document.getElementById("editor").style.width="98.5%";
  document.getElementById("htmlcode").style.marginLeft="0.2%";
}

}
  // stop live preview
  function running() {
  var checkBox = document.getElementById("live");
  if (checkBox.checked == false){
    document.getElementById("htmlcode").removeEventListener("input", run);
    document.getElementById("cssCode").removeEventListener("input", run);
    document.getElementById("jsCode").removeEventListener("input", run);
    }
  }
//   download
function download(){
  var checks = document.getElementById("split");
  if (checks.checked == true){
    var text1 = document.getElementById("htmlcode").value.replace("</html>" ,"");
    var text2 = "<style>"+document.getElementById("cssCode").value+"</style>";
    var text3 = "<scri"+"pt>"+document.getElementById("jsCode").value+"</scri"+"pt>"+"</html>";
    text1 = text1.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    text2 = text2.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    text3 = text3.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text1, text2 , text3], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "file.html";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
 }
 else{
  var text = document.getElementById("htmlcode").value;
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    
    var blob = new Blob([text], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "file.html";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
 }
}
  
    // Landscape
      function Landscape(){
        document.getElementById('htmlcode').style.width='200%' , document.getElementById('result').style.width='201%' 
        document.getElementById("compiler").style.flexDirection = "column",
        document.getElementById("htmlcode").style.marginLeft = "0.8%",
        document.getElementById("result").style.marginLeft = "0.4%";
        document.getElementById("htmlcode").style.height = "98%",
        document.getElementById("result").style.height = "98%";
        
        
        
        
      }

  // portrait
      function portrait(){
        document.getElementById('htmlcode').style.width='100%' , document.getElementById('result').style.width='100%' 
        document.getElementById("compiler").style.flexDirection = "row",
        document.getElementById("htmlcode").style.marginLeft = "0.1%",
        document.getElementById("result").style.marginLeft = "0.1%";
        document.getElementById("htmlcode").style.height = "100%",
        document.getElementById("result").style.height = "100%";
        
      }
  
    // Keyboard shortcut Run
     document.onkeyup = function runs(e) {
   if (e.altKey && e.which == 82) {
    var htmlCode = document.getElementById("htmlcode").value;
  var cssCode = "<style>"+document.getElementById("cssCode").value+"</style>";
  var jsCode = "<scri"+"pt>"+document.getElementById("jsCode").value+"</scri"+"pt>";
  var frame = document.getElementById("result").contentWindow.document;
  frame.open();
  frame.write(htmlCode+cssCode+jsCode);
  frame.close();
}
  }
  
    // full iframe
    function full(){
        var checkf = document.getElementById("orientation");
        if(checkf.checked == false){
      document.getElementsByTagName("iframe")[0].classList.add("fullScreen1");
      document.getElementById("close").style.display="block";
      document.getElementById("result").style.marginLeft="0%";
      document.getElementById("result").style.height="100%";
    }
    else{
        document.getElementsByTagName("iframe")[0].classList.add("fullScreen2");
      document.getElementById("close").style.display="block";
      document.getElementById("result").style.width="100%";
      document.getElementById("result").style.marginLeft="0%";
      document.getElementById("result").style.height="100%";
    }
}
    // close iframe
    function closefull(){
        var checkf = document.getElementById("orientation");
        if(checkf.checked == true){
      document.getElementsByTagName("iframe")[0].classList.remove("fullScreen1");
      document.getElementsByTagName("iframe")[0].classList.remove("fullScreen2");
      document.getElementById("close").style.display="none";
      document.getElementById("result").style.width="200%";
      
      document.getElementById("result").style.marginLeft="0.8%";
      
    }
    else{
        document.getElementsByTagName("iframe")[0].classList.remove("fullScreen1");
      document.getElementsByTagName("iframe")[0].classList.remove("fullScreen2");
      document.getElementById("close").style.display="none";
      document.getElementById("result").style.width="100%";
      
      document.getElementById("result").style.marginLeft="0.1%";
    }
}
    // lightmode
    function lightmode(){
      document.getElementById("body").style.backgroundColor="#cccccc",
      document.getElementById("htmlcode").style.backgroundColor="white",
      document.getElementById("htmlcode").style.color="black";
      
      document.getElementById("cssCode").style.backgroundColor="white",
      document.getElementById("cssCode").style.color="black";
      
      document.getElementById("jsCode").style.backgroundColor="white",
      document.getElementById("jsCode").style.color="black";
      document.getElementById("p1").style.color="black";
      document.getElementById("p2").style.color="black";
      document.getElementById("p3").style.color="black";
      document.getElementById("p4").style.color="black";
      

      
    }
    // darkmode
    function darkmode(){
      document.getElementById("body").style.backgroundColor="#333642",
      document.getElementById("htmlcode").style.backgroundColor="#1d1e22",
      document.getElementById("htmlcode").style.color="white";
      document.getElementById("cssCode").style.backgroundColor="#1d1e22",
      document.getElementById("cssCode").style.color="white";
      document.getElementById("jsCode").style.backgroundColor="#1d1e22",
      document.getElementById("jsCode").style.color="white";
      document.getElementById("p1").style.color="white";
      document.getElementById("p2").style.color="white";
      document.getElementById("p3").style.color="white";
      document.getElementById("p4").style.color="white";
      
      

      
    }
    // Scroll bar change
    $("#theme").on("click", function(){
    $(".light,.dark").toggleClass("light").toggleClass("dark");
});

function clear(){
  document.getElementById("htmlcode").value.replace("<html>");
}