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