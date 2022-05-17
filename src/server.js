const express = require("express");
const main = require("./main");
require("dotenv").config();

async function start() {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    await require("./database/index.js")();

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      setTimeout(main, 5000);
    });
  } catch (err) {
    console.error(err);
  }

  await main();
}

start();
