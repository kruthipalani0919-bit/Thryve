import bcrypt from "bcrypt";

const password = "Thryve@123";

bcrypt.hash(password, 10).then((hash) => {
  console.log(hash);
});