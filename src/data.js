const fs = require("fs");
const path = require("path");
const read = require("fs-readdir-recursive");

module.exports.getObject = function (folder, file) {
  return fs.readFileSync(path.join(__dirname, "../data/", folder, file + ".json"), 'utf-8');
};

module.exports.getObjects = function (folder) {
  var objs = [];
  
  var p = path.join(__dirname, "../data/", folder);
  var files = read(p).filter(f => f.endsWith(".json"));
  
  for (var f of files) {
    var json = JSON.parse(fs.readFileSync(path.join(p, f)));
    objs.push(json);
  }
  
  return objs;
};

module.exports.setObject = function (folder, file, data) {
  fs.writeFileSync(path.join(__dirname, "../data/", folder, file + ".json"), JSON.stringify(data, 2));
};

module.exports.removeObject = function (folder, file) {
  fs.unlinkSync(path.join(__dirname, "../data/", folder, file + ".json"));
};