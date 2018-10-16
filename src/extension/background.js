import '@babel/polyfill'

function setItem() {
  console.log("OK");
}

function gotKitten(item) {
  console.log(`${item.kitten.name} has ${item.kitten.eyeCount} eyes`);
}

function gotMonster(item) {
  console.log(`${item.monster.name} has ${item.monster.eyeCount} eyes`);
}

function onError(error) {
  console.log(error)
}

// define 2 objects
var monster = {
  name: {1: 2},
  tentacles: true,
  eyeCount: 10
}

var kitten = {
  name: "Moggy",
  tentacles: false,
  eyeCount: 2
}

// store the objects
browser.storage.local.set({kitten, monster})
  .then(setItem, onError);

browser.storage.local.get("kitten")
  .then(gotKitten, onError);
browser.storage.local.get("monster")
       .then(gotMonster, onError);

browser.storage.local.set({
  'test': {a: 1}
}).then(() => {
  return browser.storage.local.get('test')
}).then((r) => {
  console.log('result', r)
})
browser.windows.onCreated.addListener(() => {
  browser.windows.getAll().then(r => console.log(`windows are`, r))
})

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


function hanHigh() {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(function() {
    registerScript("highlight.bundle.js", "<all_urls>")
    console.log(browser.runtime.getManifest())
  })
}

browser.menus.onClicked.addListener((info) => {
  hanHigh()
  switch (info.menuItemId) {
    case "green":
      handleHighlight("green")
  }
})
