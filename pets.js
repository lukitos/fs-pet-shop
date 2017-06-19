// $ node pets.js
// Usage: node pets.js [read | create | update | destroy]

var fs = require('fs');
var fname = 'pets.json';

if (process.argv.length < 3) {
  console.log('Usage: node pets.js [read | create | update | destroy]');
  return;
}

switch (process.argv[2].toLowerCase()) {
  case 'read':
    read();
    break;
  case 'create':
    create();
    break;
  case 'update':
    break;
  case 'destroy':
    break;
  default:
    console.log('No handler');
}

function read() {
  fs.readFile(fname, 'utf8', function (err, data) {
    if (err) throw err;
    let pets = JSON.parse(data);
    let index = process.argv[3];
    if (index) {
      if (index >= 0 && index < pets.length) {
        console.log(pets[index]);
      } else {
        console.log('Usage: node pets.js read INDEX');
      }
    } else {
      console.log(pets);
    }
  });
}

function create() {
  if (process.argv.length < 6) {
    console.log('Usage: node pets.js update INDEX AGE KIND NAME');
  } else {
    fs.readFile(fname, 'utf8', function (err, data) {
      let age = process.argv[3];
      let kind = process.argv[4];
      let name = process.argv[5];
      let parsed = JSON.parse(data);
      parsed.push({
        age: parseInt(age),
        kind: kind,
        name: name
      });
      fs.writeFile(fname, JSON.stringify(parsed), function (err) {
        if (err) console.log(err);
      });
    });
  }
}
