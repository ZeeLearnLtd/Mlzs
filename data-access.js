const mssql = require('mssql')

let pool;

const poolConfig = (dbid) =>
{
 console.log("in pool");
 const SQL_SERVER = process.env.SQL_SERVER;
 const SQL_DATABASE = process.env.SQL_DATABASE;
 const SQL_UID = process.env.SQL_UID;
 const SQL_PWD = process.env.SQL_PWD;
 const port = process.env.sqlport;
 console.log(SQL_DATABASE);

    data = {
      driver: process.env.SQL_DRIVER,
      server: SQL_SERVER,
      database: SQL_DATABASE,
      user: SQL_UID,
      port: Number(port),
      password: SQL_PWD,
      requestTimeout: 360000,
      options: {
        encrypt: false,
        enableArithAbort: false,
      },
    };



return data;
};

//console.log('database config');
//console.log(process.env.SQL_master_PWD);
//console.log(process.env.SQL_master_SERVER);

const fetchParams = entity => {
    const params = [];
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const value = entity[key];
            params.push({
                name: key,
                value
            });
        }
    }
    //console.log(params);
    return params;
};

const assignParams = (request, inputs, outputs) => {
    [inputs, outputs].forEach((params, index) => {
        const operation = index === 0 ? 'input' : 'output';
        params.forEach(param => {
            if (param.type) {
                request[operation](param.name, param.type, param.value);
            } else {
                request[operation](param.name, param.value);
            }
        });
    });
};

const run = async (name, command, inputs = [], headers , outputs = []) => {
    //console.log(headers);
    await connect(1);
    const request = pool.request();
    assignParams(request, inputs, outputs);
    return request[name](command);
};

const connect = async (dbid) => {
 console.log('coonect');
    pool = new mssql.ConnectionPool(poolConfig(1));
     console.log(!pool.connected)
    if (!pool.connected) {
        const SQL_DATABASE = process.env.SQL_DATABASE;
        await pool.connect();

    } else {
        console.log('Not connected');
    }
};
const close = async () => {

     await pool.close()
};

const query = async (command, inputs = [], outputs = []) => {
    return run('query', command, inputs, outputs);
};

const queryEntity = async (command, entity, headers,outputs = []) => {
    const inputs = fetchParams(entity);
    return run('query', command, inputs,headers, outputs);
};

const execute = async (command, inputs = [],headers, outputs = []) => {
    return run('execute', command, inputs,headers, outputs);
};

const executeEntity = async (command, entity, headers,outputs = []) => {
    const inputs = fetchParams(entity);
   //console.log('execute'+headers)
    return run('execute', command, inputs,headers, outputs);
};

const generateTable = (columns, entities) => {
    const table = new mssql.Table();

    columns.forEach(column => {
        if (column && typeof column === 'object' && column.name && column.type) {
            if (column.hasOwnProperty('options')) {
                table.columns.add(column.name, column.type, column.options);
            } else {
                table.columns.add(column.name, column.type);
            }
        }
    });

    entities.forEach(entity => {
        table.rows.add(...columns.map(i => entity[i.name]));
    });

    return table;
};

module.exports = {
    pool,
    mssql,
    connect,
    query,
    queryEntity,
    execute,
    executeEntity,
    generateTable,
    close
};
