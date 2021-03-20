const fs = require("fs");
const path = require("path");
const rootPath = require("../util/path");

const p = path.join(rootPath, "data", "products.json");

const getProductsfromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsfromFile((products) => {
      products.push(this);
      // write to file
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsfromFile(cb);
  }
};
