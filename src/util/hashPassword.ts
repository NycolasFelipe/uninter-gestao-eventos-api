import crypto from "crypto";
import ErrorMessage from "src/errors/ErrorMessage";

const hashPassword = (password: string) => {
  if (!password) {
    throw new ErrorMessage("o campo senha não pode ser vazio.", 400);
  }
  return crypto.createHash('sha256').update(password).digest('hex')
}

export default hashPassword;