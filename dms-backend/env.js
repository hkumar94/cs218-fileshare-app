var e = {};

e = {
    MONGO_HOST: process.env.MONGO_HOST || "localhost",
    MONGO_PORT: process.env.MONGO_PORT || "27017",
    MONGO_DB: process.env.MONGO_DB || "test",
    MONGO_PWD: process.env.MONGO_PWD || "1234",
    MONGO_USER: process.env.MONGO_USER || "admin",
    APP_HOST: process.env.APP_HOST || "localhost",
    APP_PORT: process.env.APP_PORT || 8081,
    CERT_LOC: process.env.CERT_LOC || "rds-combined-ca-bundle.pem"
}

module.exports = e;