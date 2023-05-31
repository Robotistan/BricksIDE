define("ace/snippets/javascript",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.snippetText = "# for (...) {...}\n\
snippet for\n\
	for (var ${1:count} = 0; $1 < 5; $1++) {\n\
		\n\
	}\n\
\n\
\n\
";
exports.scope = "javascript";

});   

(function() {
    window.require(["ace/snippets/javascript"], function(m) {
         if (typeof module == "object" && typeof exports == "object" && module) {
              module.exports = m;
            }
    });
})();
            