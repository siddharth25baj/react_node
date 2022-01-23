require('dotenv').config()

module.exports = {
  'PORT': 8080,
  'SECRET': 'secret',
  'hostUrl': "http://localhost:8080",
  'dbCreds': {
    'username': 'mysql',
    'password': "root",
    'database': 'form_data',
    'host': '127.0.0.1',
    'port': 3306,
    'dialect': 'mysql',
    'logging': false
  }
}
