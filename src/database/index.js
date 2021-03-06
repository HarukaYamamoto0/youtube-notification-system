const { connect } = require("mongoose");

async function start() {
  try {
    if (!process.env.tokenData)
      throw new Error("TokenData not defined in .env file");

    await connect(process.env.tokenData);
    console.log("[DATABASE] - connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = start;
