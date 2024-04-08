const express = require('express');
const path = require('path');
const childProcess = require('child_process');

const app = express();
const port = 3000;

const pythonFile = './demo2.py';
console.log('Running Python file:', pythonFile);
const pythonProcess = childProcess.exec(
  '/home/williamwestwood/anaconda3/envs/text-gen/python',
  [pythonFile]
);

pythonProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
// // Run the Python file and pipe the results as a return value
// exec('conda run -n text-gen python ./demo2.py', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`stderr: ${stderr}`);
//     return;
//   }

//   // Use the stdout as the return value
//   const pythonResult = stdout;
//   console.log(`Python result: ${pythonResult}`);
// });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
