require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "test",
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || "24h",
  dbMongoUri:
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_DB_URI_TEST
      : process.env.MONGO_DB_URI,
  adminFirstName: process.env.ADMIN_FIRST_NAME,
  adminLastName: process.env.ADMIN_LAST_NAME,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
};

module.exports = { config };
