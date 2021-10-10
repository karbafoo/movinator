const fs = require('fs');
const path = require('path');
module.exports = {
    DATABASE_NAMURL: 'mongodb://localhost:27017/movinator',
    USER_SECRET: fs.readFileSync(path.join(__dirname, './pk')),
};
