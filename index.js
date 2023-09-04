const express = require('express');
const app1 = express();
const app2 = express();




const sequelize = require('./startup/db');


require('./startup/config')();

const relation = require("./models/relations")();

require('./startup/routes')(app1);
require('./startup/routes')(app2);



const port1 = process.env.PORT || 3000;
const port2 = process.env.PORT || 3001;
sequelize.sync({ force: false }).then((result) => {

    app1.listen(port1, () => console.log(`Listening on port ${port1}...`));
    app2.listen(port2, () => console.log(`Listening on port ${port2}...`));
}).catch((err) => {
    console.log(err)
    console.log('Error in Create Server * index.js 29 *')

});