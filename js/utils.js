/* Define function for escaping user input to be treated as 
a literal string within a regular expression */
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
 
/* Define functin to find and replace specified term with replacement string */
function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}