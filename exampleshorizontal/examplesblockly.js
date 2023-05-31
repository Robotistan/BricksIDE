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

  var blinkCode = 
  '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="event_whenplayclicked" id="N]Xngm:Dt?W{sCznGRWS" x="310" y="190"><next><block type="control_forever" id="q_ZR,:nL(u=ce90hx*g,"><statement name="SUBSTACK"><block type="control_wait" id="B,?%eZp2`$Af95R)Z$h5"><value name="DURATION"><shadow type="math_positive_number" id="PGKQhb|%k]}g,Il0fv$L"><field name="NUM">0.5</field></shadow></value><next><block type="setLedValue" id="(Iu.THZgx2n_8*{@RmSG"><value name="VALUE"><shadow type="ledStates" id="Uw3yWNmjf7YB1=!^=@qW"><field name="VALUE">1</field></shadow></value><next><block type="control_wait" id="t6=DW#$3g+EP%C0JVVoh"><value name="DURATION"><shadow type="math_positive_number" id="PP5+{zI6-,d%Eu#V^2.u"><field name="NUM">0.5</field></shadow></value><next><block type="setLedValue" id="sB25sZ+AVDw3H_M{@NH2"><value name="VALUE"><shadow type="ledStates" id="j*_`7QCzEJ,+|JL=.TPr"><field name="VALUE">0</field></shadow></value></block></next></block></next></block></next></block></statement></block></next></block></xml>'
    
 function LoadWorkspaceCode(code)
 {
    parent.LoadCode(code);
 } 