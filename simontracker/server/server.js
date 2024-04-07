const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001; // Choose any port you prefer
const fs = require('fs');

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cors()); // Enable CORS for all routes

const data = require('./data/data.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log(data);
  res.send(data);
});

app.post('/', (req, res) => {
  console.log(req.body, 'aaaaa');
  const { value, street, number, action } = req.body;
  data.forEach((item) => {
    const currentStreet = Object.keys(item)[0];
    if (currentStreet === street) {
      item[street].forEach((line) => {
        const currentAction = Object.keys(line)[0];
        if (currentAction === action) {
          line[action][value] += number;
          line[action][value] < 0
            ? (line[action][value] = 0)
            : line[action][value];
        }
      });
    }
  });
  fs.writeFile('./data/data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
