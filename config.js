module.exports = {
    port: 3000,
    database: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/bachotek-app',
};