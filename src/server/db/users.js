const prisma = require("./client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async ({ first_name, last_name, email, password }) => {
  try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
          where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Create a new user
      const newUser = await prisma.user.create({
          data: {
              first_name,
              last_name,
              email,
              password: hashedPassword,
          },
      });

      return newUser;
  } catch (error) {
      throw error;
  }
};


const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await prisma.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
};
