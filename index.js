const db = require('./db');

db.then(() => {
    console.log('Database: Connected successfuly');
    require('./main');
});
