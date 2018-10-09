import '@babel/polyfill'

browser.menus.create({
  id: "highlight",
  title: "Highlight Selection",
  contexts: ["selection", "page"]
})

browser.menus.create({
  id: "blue",
  parentId: "highlight",
  title: "Blue highlight"
})

browser.menus.create({
  id: "green",
  parentId: "highlight",
  title: "Green highlight"
})

browser.menus.onClicked.addListener((info) => {
  hanHigh()
  switch (info.menuItemId) {
    case "green":
      handleHighlight("green")
  }
})

function hanHigh() {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(function(tabs) {
    let a = registerScript("highlight.bundle.js", "<all_urls>")
    console.log(browser.runtime.getManifest())
  })
}

function handleHighlight(color) {
  let msg = `highlight ${color}`
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {message: msg}).then(
      function suc(res) {
        console.log('message success ', res)
      },
      function fail(err) {
        console.log('message error ', err)
      }
    )
  })
}

async function registerScript(code, url) {
  console.log('called register')
  return await browser.contentScripts.register({
    "matches": [url],
    "js": [{file: code}],
    "allFrames": true,
    "runAt": "document_end"
  })
}
