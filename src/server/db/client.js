const { PrismaClient } = require("@prisma/client");
let prisma = new PrismaClient({ log: ["query"] });

module.exports = prisma;
