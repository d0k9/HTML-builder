const fs = require('fs');
const path = require('path');

const stylesDir = './05-merge-styles/styles';
const distDir = './05-merge-styles/project-dist';
const outputFile = 'bundle.css';

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.readdir(stylesDir, (err, files) => {
  if (err) throw err;

  const cssFiles = files.filter(file => path.extname(file) === '.css');

  const promises = cssFiles.map(file => {
    const filePath = path.join(stylesDir, file);

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  });

  Promise.all(promises).then(dataArray => {
    const cssContent = dataArray.join('');
    const outputPath = path.join(distDir, outputFile);

    fs.writeFile(outputPath, cssContent, err => {
      if (err) throw err;
      console.log('Styles merged successfully!');
    });
  }).catch(err => {
    console.error(err);
  });
});