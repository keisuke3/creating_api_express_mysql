const app = require('./server');
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});