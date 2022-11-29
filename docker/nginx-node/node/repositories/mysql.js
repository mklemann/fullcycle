const mysql = require('mysql')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

module.exports.query = (sql) => {
    const connection = mysql.createConnection(config)

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, res) => {
            if(err) {
                connection.end()
                reject(err)
            }

            resolve(res)
        })
    })
}
