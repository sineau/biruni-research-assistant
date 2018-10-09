console.log("script registered")
document.body.style.border = "solid 2px black"
browser.runtime.onMessage.addListener(
  function(msg){
    console.log("message received", msg)
    if(msg.indexOf("green")) {
      let selObj = document.getSelection()
      let text = selObj.toString()
      console.log(text.length)
    }
  }
)
