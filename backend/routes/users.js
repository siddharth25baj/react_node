const { users } = require('../controllers');

module.exports = app => {
  app.post('/user', users.createUser);
  app.get('/user', users.getAllUsers);
  app.get('/user/:id', users.getUserDetails);
  app.put('/user/:id', users.updateUserDetails);
  app.delete('/user/:id', users.deteleUser);
}