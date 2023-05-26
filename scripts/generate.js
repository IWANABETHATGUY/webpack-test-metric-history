const fs = require('fs')
const path = require('path')

const content = fs.readFileSync(path.resolve(__dirname, "../out.json"))
console.log(content)
