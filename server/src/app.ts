import express from 'express';
const app = express();
const port = 3000;


app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
