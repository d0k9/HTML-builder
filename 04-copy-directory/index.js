const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

function copyDir(sourceDir, targetDir) {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    files.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      fs.stat(sourcePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.isDirectory()) {
          copyDir(sourcePath, targetPath);
        } else {
          fs.readFile(sourcePath, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            fs.writeFile(targetPath, data, (err) => {
              if (err) {
                console.error(err);
              }
            });
          });
        }
      });
    });
  });
}
copyDir(sourceDir, targetDir);