const express = require('express');
const sql = require('mssql');
const exphbs  = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// const config = {
//     user: 'admin123',
//     password: '6EW5SSHR9BVt',
//     server: 'az-eastus-bsp-dev-newobw-sqls.database.windows.net', 
//     database: 'az-eastus-bsp-dev-newobw-dbsql',
//     options: {
//         encrypt: true 
//     }
// };

const config = {
    user: 'admin123',
    password: fs.readFileSync('/mnt/secrets-store/dbpassword', 'utf8'),
    server: 'az-eastus-bsp-dev-newobw-sqls.database.windows.net', 
    database: 'az-eastus-bsp-dev-newobw-dbsql',
    options: {
        encrypt: true 
    }
};

sql.connect(config).then(pool => {
    app.get('/', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT TOP 50 * FROM SalesLT.Product');
            res.render('home', {products: result.recordset});
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    });
}).catch(err => {
    console.error(err);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

