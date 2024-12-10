import bcrypt from "bcrypt";

const generateHashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
  // return hashedPassword
};

const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

// export default generateHashedPassword
export { comparePassword, generateHashedPassword };
