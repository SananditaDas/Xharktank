require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'local',
    PORTUSED: process.env.PORTUSED || 8081,
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/xharktank'
}