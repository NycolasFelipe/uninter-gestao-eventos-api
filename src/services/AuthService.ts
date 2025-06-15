import { Model } from "sequelize-typescript";
import { IToken } from "src/interfaces/IToken";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import ErrorMessage from "src/errors/ErrorMessage";
import UserService from "./UserService";
import compareHashPassword from "src/util/compareHashPassword";

// Carregar variáveis ​​de ambiente
dotenv.config();

// Recuperar variáveis ​​de ambiente
const SECRET = process.env.SECRET as string;

// Validar variáveis ​​de ambiente
if (!SECRET) {
  throw new ErrorMessage("Variável de ambiente 'SECRET' não foi configurada.", 500);
}

// Instância do serviço de usuários
const service = new UserService();

class AuthService {
  /** Autentica um usuário com email e senha, retornando um token JWT em caso de sucesso */
  async login(email: string, password: string): Promise<IToken> {
    const user = await service.getByEmail(email);
    if (!user) {
      throw new ErrorMessage("Credenciais inválidas", 401);
    }

    // Valida a senha informada
    const isPasswordCorrect = compareHashPassword(password, user.passwordHash).success;
    if (!isPasswordCorrect) {
      throw new ErrorMessage("Credenciais inválidas", 401);
    }

    // Gera token do usuário
    const payload = {
      id: user.id,
      name: [user.firstName, user.lastName].join(" "),
      email: user.email,
      isActive: user.isActive,
      profilePictureUrl: user.profilePictureUrl
    }
    const jsonPayload = payload instanceof Model ? payload.toJSON() : payload;

    // Retorna token de acesso
    return { token: this.generateToken(jsonPayload, SECRET) };
  }

  private generateToken(payload: any, secret: string): string {
    const plainPayload = payload instanceof Model ? payload.toJSON() : payload;
    return jwt.sign(plainPayload, secret, { expiresIn: "2h" });
  }
}

export default AuthService;