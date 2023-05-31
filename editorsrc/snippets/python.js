define("ace/snippets/python",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.snippetText = "# For\n\
snippet for\n\
	for ${1:count} in ${2:range(1)}:\n\
		${3}\n\
";

exports.scope = "python";

});                

(function() {
    window.require(["ace/snippets/python"], function(m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
               module.exports = m;
            }
        });
    })();
            