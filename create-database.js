const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const createTable = async () => {

    const client = await pool.connect();

    let response = await client.query('CREATE TABLE public."temp-user"(id bigserial NOT NULL, email character varying(100) NOT NULL, status boolean NOT NULL, PRIMARY KEY (id))')
    
    return response;
};

createTable()
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });