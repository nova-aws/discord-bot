require("dotenv/config");

const Client = require("./structures/Client");

const client = new Client();

client.start();
