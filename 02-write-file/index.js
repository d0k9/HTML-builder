const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filename = 'output.txt';
let stream = fs.createWriteStream(filename, { flags: 'a'});

console.log('Введите текст. Для выхода введите exit или нажмите Ctrl+C\n');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('\nПрограмма завершена');
    rl.close();
    stream.end();
    return;
  } 
    stream.write(input + '\n');
});

rl.on('SIGINT', () => {
  console.log('\nПрограмма завершена');
  stream.end();
  process.exit();
});