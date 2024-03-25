import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear hash
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validar hash
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateProduct = () => {
  const title = faker.commerce.productName();
  const description = faker.lorem.paragraph();
  const code = faker.string.uuid();
  const price = faker.number.int(({ min: 1, max: 1000, precision: 0.01 }));
  const status = faker.datatype.boolean();
  const stock = faker.image.url({ min: 0, max: 1000 });
  const category = faker.commerce.department();
  const thumbnail = [faker.image.url()];

  return {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  };
};

export default __dirname;
