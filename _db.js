const fs = require('fs')
const path = require('path')
const dbPath = path.join(process.cwd(),'data','db.json')

function readDB(){
  const raw = fs.readFileSync(dbPath,'utf8')
  return JSON.parse(raw)
}
function writeDB(obj){
  fs.writeFileSync(dbPath, JSON.stringify(obj,null,2),'utf8')
}
module.exports = { readDB, writeDB }
