var storage = window.localStorage;   
var lang = "en";  
var readStringData = "";


function kodKopyala() {
    var kodAlani = document.getElementById("html-kodum");
    kodAlani.select();
    document.execCommand("copy");
  }

  

  function kopyalaKodu() {
    var kod = document.querySelector('code.python');
    var range = document.createRange();
    range.selectNode(kod);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert('Kod kopyalandı!');
  }

  window.addEventListener("DOMContentLoaded", function() {
    var codes = document.getElementsByTagName("code");
    for (var i = 0; i < codes.length; i++) {
      var code = codes[i];
      var lines = code.innerHTML.split("\n").length;
      code.setAttribute("data-line-count", lines);
    }
  });