var vars = new Set();
var setup = '';
var _setup = new Set();
var include = new Set();
var loop = '';
var _loop = new Set();
var def = '';
var UDFs = {};
var UDFsUnderGeneration = [];
var define = new Set();

var inUDF = false;
var inLoop = false;
var inIfElse = false;
var inIff = false;
var setup = '';
var loop = '';
var quonUDFs = {};
var quonUDFsCount = 0;
var currentTopBlock = '';

function ResetGeneratedCode()
{
    vars = new Set();
    setup = '';
    _setup = new Set();
    include = new Set();
    loop = '';
    _loop = new Set();
    def = '';
    UDFs = {};
    UDFsUnderGeneration = [];
    define = new Set();

    inUDF = false;
    inLoop = false;
    inIfElse = false;
    inIff = false;
    setup = '';
    loop = '';
    quonUDFs = {};
    quonUDFsCount = 0;
    currentTopBlock = '';
}

function getGeneratedCode() {
    var storage = window.localStorage; 
    var codeString = "";
    var cardTypeName = storage.getItem("CardTypeName");

    var lInclude = "";

    var define = "";

    codeString += lInclude;

    codeString += include.size ? "".concat(include.size == 0 ? "" : "".concat(_toConsumableArray(include).join(''), "\n\n")) : "";

    codeString += define + "\n";

    codeString += define.size ? "".concat(define.size == 0 ? "" : "".concat(_toConsumableArray(define).join(''), "\n")) : "";
    codeString += vars.size ? "".concat(vars.size == 0 ? "" : "".concat(_toConsumableArray(vars).join(''), "\n")) : "";

    codeString += "void setup() {\n".concat(_toConsumableArray(_setup).join(''), "\n").concat(setup, "}\n");
    codeString += "void loop() {\n".concat(_toConsumableArray(_loop).join(''), "\n").concat(loop, "\n}\n");
    codeString = formatCodeSegment(codeString);

    console.log(codeString);
    
    return codeString;
}

function _toConsumableArray(arr) { 
   if (Array.isArray(arr)) { 
     for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
     arr2[i] = arr[i]; 
   } 
     return arr2; 
   } 
   else { 
     return Array.from(arr); 
   } 
}

function formatCodeSegment(inputCode) {
   var tabCounter = 0;
   var formattedCode = "";

   for (var itr = 0; itr < inputCode.length - 1; itr++) {
     formattedCode += inputCode.charAt(itr);

        switch (inputCode.charAt(itr)) {
          case '{':
            if (inputCode.charAt(itr + 1) == "\n") ++tabCounter;
            break;

          case '}':
            if (inputCode.charAt(itr + 1) == "\n") --tabCounter;
            break;

          case '\n':
            if (inputCode.charAt(itr + 1) == '}') formattedCode += "\t".repeat(tabCounter > 0 ? tabCounter - 1 : 0);else {
              formattedCode += "\t".repeat(tabCounter > 0 ? tabCounter : 0);
            }
            break;

          default:
            break;
      }
   }

   return formattedCode;
}

function codeGenerateHelper(command) {
   if (inUDF) {
      var currentUDF = UDFsUnderGeneration[UDFsUnderGeneration.length - 1];

        if (UDFs[currentUDF] === undefined) {
          UDFs[currentUDF] = {
            "code": "",
            "completed": false
          };
        }

        if (currentUDF && !UDFs[currentUDF]["completed"]) {
          UDFs[currentUDF]["code"] += command;
        }
      } else if (quonUDFs.hasOwnProperty(currentTopBlock)) {
        if (quonUDFs[currentTopBlock]['inLoop']) {
          quonUDFs[currentTopBlock]['loop'] += command;
        } else {
          quonUDFs[currentTopBlock]['setup'] += command;
        }
      } else if (inLoop) {
        loop += command;
      } else {
        setup += command;
      }
}

function increaseNestBlockCount() {
  if (this.quonUDFs.hasOwnProperty(this.currentTopBlock)) {
     this.quonUDFs[this.currentTopBlock]['cShapedBlockNestCount'] += 1;
  } else {
    this.cShapedBlockNestCount += 1;
  }
}

function decreaseNestBlockCount() {
   if (this.quonUDFs.hasOwnProperty(this.currentTopBlock)) {
     this.quonUDFs[this.currentTopBlock]['cShapedBlockNestCount'] -= 1;
   } else {
     this.cShapedBlockNestCount -= 1;
   }
}