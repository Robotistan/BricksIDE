window.addEventListener("DOMContentLoaded", () => {
    const selectedLanguage = getCookie("selectedLanguage");
    if (selectedLanguage) {
        loadLanguage(selectedLanguage);
    } else {
        loadLanguage("en");
    }
});

function loadLanguage(language) {
    const langScript = document.getElementById("langScript");
    if (langScript) {
        langScript.remove();
    }

    const newLangScript = document.createElement("script");
    newLangScript.id = "langScript";
    newLangScript.src = `../js/blockly/msg/js/${language}.js`;
    document.head.appendChild(newLangScript);
}

function changeLanguage(language) {
    document.cookie = `selectedLanguage=${language}; path=/;`;

    loadLanguage(language);
    showLangChang();
}

function showLangChang(){
    $("#ModalLangChange").modal('show');
}

function reload(){
   return window.location.reload();
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}