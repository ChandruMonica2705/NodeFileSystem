const express = require('express');
const date = require('date-and-time');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set the current working directory
const Direct = process.cwd();

// Define the output folder name
const outputFolder = 'output';

// Create the output folder if it doesn't exist
const outputFolderPath = path.join(Direct, outputFolder);
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

// Define a route to create a text file with current date and time
app.get('/', (req, res) => {
  const now = new Date();
  const value = date.format(now, 'DD-MM-YYYY,HH-mm-ss');

  // Modify the filePath to include the output folder
  const filePath = path.join(outputFolderPath, `${value}.txt`);

  fs.writeFile(filePath, `${value}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    res.status(200).send(`File ${value}.txt created successfully in the '${outputFolder}' folder`);
  });
});

// Define a route to read a file from the directory
app.get('/readFile/:files', (req, res) => {
  const filename = req.params.files;
  const filePath = path.join(outputFolderPath, filename);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send('File not found');
    }

    res.status(200).send(data);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
