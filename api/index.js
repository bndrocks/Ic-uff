const {app} = require('./server');
//const startDatabase = require('./database');

/*startDatabase().then(() => {
  console.log('Connection has been established successfully.');
*/
  app.listen(3003, () => {
    console.log('🚀 Server is running!');
  });
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
//}).catch(err => console.log(err));