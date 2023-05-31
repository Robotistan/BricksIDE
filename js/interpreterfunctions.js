function StepCode() { 
   try
   {
      if(myInterpreter)
      {
         glowStack(highlightblockid);
         unglowStack(exhighlightblockid);
         
         highlightPause = false;
         do {
           try {
             hasMoreCode = myInterpreter.step();

           } finally {
             if (!hasMoreCode) {
               return;
             }
           }
           // Keep executing until a highlight statement is reached,
           // or the code completes or errors.
         } while (hasMoreCode && !highlightPause);
      }
   }
   catch(err)
   {
      console.log(err.message);
   }
}

function initApi(interpreter, scope) {
  for(var i = 0; i < ActionsList.length; i++)
  {
    var initCode = " var wrapper = function() { " +
        " return " + ActionsList[i] + "()" +
      " };" +
      " interpreter.setProperty(scope, '" + ActionsList[i] + "', " +
      "    interpreter.createNativeFunction(wrapper)); ";
    eval(initCode);
  }

  for(var i = 0; i < ActionsListWithParam.length; i++)
  {
    var initCode = " var wrapper = function(prm) { " +
        " return " + ActionsListWithParam[i] + "(prm)" +
      " };" +
      " interpreter.setProperty(scope, '" + ActionsListWithParam[i] + "', " +
      "    interpreter.createNativeFunction(wrapper)); ";
    eval(initCode);
  }

    var wrapper = function(id) {
      return highlightBlock(id);
    };
    interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

    var wrapper = function() {
      return loopstep();
    };
    interpreter.setProperty(scope, 'loopstep',
      interpreter.createNativeFunction(wrapper));

    var wrapper = function() {
      return loopend();
    };
    interpreter.setProperty(scope, 'loopend',
      interpreter.createNativeFunction(wrapper));

    // Add an API function for writeTextScreen blocks.
    var wrapper = function(xPos, yPos, value) {
        return writeTextScreen(xPos, yPos, value);
    };
    interpreter.setProperty(scope, 'writeTextScreen',
        interpreter.createNativeFunction(wrapper));
}

function runButtonClick()
{
   runCode();
}

function stopButtonClick()
{
  restart();
}

function connectButtonClick()
{

}

function highlightBlock(id) {
   exhighlightblockid = highlightblockid;
   highlightblockid = id;

   highlightPause = true;
}

function generateCodeAndLoadIntoInterpreter() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  //latestCode = Blockly.JavaScript.workspaceToCode(workspace);
  resetStepUi();
}

function resetStepUi() {
  workspace.highlightBlock(null);

  unglowStack(highlightblockid);
  unglowStack(exhighlightblockid);
  
  highlightblockid = "";
  exhighlightblockid = "";
  highlightPause = false;
}

function CreateInterpreter()
{
    myInterpreter = null;
    resetStepUi();
    myInterpreter = new Interpreter(latestCode, initApi);
}

function glowStack(id) {
  try
  {
    workspace.glowBlock(id, true);
  }
  catch
  {

  }
}

function unglowStack(id) {
  try
  {
    workspace.glowBlock(id, false);
  }
  catch
  {
    
  }
}

function loopstep() {
    setTimeout(function() {
        StepCode();
    }, 50);
}

function loopend() 
{
    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function StateControl()
{         
    if(hasMoreCode == false){
        restart();      
    }
}