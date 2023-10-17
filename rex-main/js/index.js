var storage = window.localStorage;   

function GotoSimulator()
{
	window.location.href = "verticalsimulator.html";
	storage.setItem("isHorizontal", "false");
}

function GotoVertical(editor)
{
	window.location.href = "verticalblocks.html?" + editor;
	storage.setItem("isHorizontal", "false");
}

function GotoHorizontal()
{
	window.location.href = "horizontal-blocks/horizontalblocks.html";
	storage.setItem("isHorizontal", "true");
}

function showNavBar(){
	var st = document.getElementById("nav").style.display;
	if(st == "none"){
		document.getElementById("nav").style.display = "inline-grid";
	} else {
		document.getElementById("nav").style.display = "none";
	}
}

function goTop(){

	
		location.href = "#home";
	
}



