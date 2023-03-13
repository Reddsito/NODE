const mysql = require('mysql2/promise')

 async function connectDb() {
    const connection = await mysql.createConnection({
        host: 'us-east.connect.psdb.cloud',
        user: '9i6i7du8al0y2w92ry67',
        password: 'pscale_pw_3eys4NGJUO2Gkw4v7BiXQXpxjZu1Xf91MxtWtM98Du3',
        database: 'expressdb',
        ssl: {
            rejectUnauthorized: false
        }
    
    })
    
    const result= await connection.query('SELECT 1 + 1 AS Result')
    
    console.log(result)
}

module.exports = {connectDb}




