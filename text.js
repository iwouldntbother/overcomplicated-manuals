var child_process = require('child_process');
const fs = require('fs');
const { randomUUID } = require('crypto');
const toGenerate = require('./toGenerate.json').items;

console.log('Node Version:     ', process.version);

let conda_env = '';

function check_env() {
  var child = child_process.spawnSync('python', ['./checkEnv.py']);
  conda_env = child.stdout.toString().replaceAll('\n', '');
}

check_env();

console.log('Conda environment:', conda_env);

console.log();

if (conda_env !== 'text-gen') {
  console.log('Incorrect conda environment, exiting');
  console.log(
    `Environment should be: "text-gen", current environment: "${conda_env}"`
  );
  return;
}

generate_all();

function run_script(command, args, callback) {
  console.log('Generating instructions...');
  var child = child_process.spawnSync(command, args);

  callback(child.stdout.toString(), child.status);
}

function generate_all() {
  console.log(`Starting instruction generation. (${toGenerate.length})`);

  let noGenerated = 0;

  for (let i = 0; i < toGenerate.length; i++) {
    let dir = `./manual-site/content/manuals`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    let item = toGenerate[i];
    let file = `${dir}/${item
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '')}.json`;

    console.log('Starting process: ', item, `(${i + 1}/${toGenerate.length})`);

    if (fs.existsSync(file)) {
      // console.log('File present, skipping.\n');
      continue;
    }

    run_script(
      'python',
      ['./demo2.py', String(item)],
      function (output, exit_code) {
        console.log('Process Finished: ', item);
        let text = output
          .split('<|im_start|> assistant\n')
          .slice(-1)[0]
          .replace('<|im_end|>', '');
        let data = {
          id: randomUUID(),
          title: item,
          instructions: text,
        };
        console.log('Writing to file:', file);
        fs.writeFileSync(file, JSON.stringify(data));
        noGenerated++;
      }
    );
  }
  console.log(`All manuals generated. (${noGenerated}/${toGenerate.length})`);
}
