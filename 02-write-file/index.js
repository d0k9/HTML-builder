const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let filename = 'input.txt';

console.log(`Введите текст для записи в файл ${filename}.`);
console.log(`Для завершения введите 'exit' или нажмите Ctrl+C.`);

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Завершение программы.');
    rl.close();
  } else {
    fs.appendFile(filename, input + '\n', (err) => {
      if (err) throw err;
      console.log(`Текст добавлен в файл ${filename}.`);
      console.log(`Введите текст для записи в файл ${filename}.`);
    });
  }
});

rl.on('close', () => {
  console.log('Завершение программы.');
});
