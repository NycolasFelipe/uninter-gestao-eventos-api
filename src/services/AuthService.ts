import { Model } from "sequelize-typescript";
import ErrorMessage from "src/errors/ErrorMessage";
import jwt from "jsonwebtoken";

// Config
import env from "src/config/env";

// Interfaces
import { IToken } from "src/interfaces/IToken";

// Util
import compareHashPassword from "src/util/compareHashPassword";

// Services
import UserService from "./UserService";

class AuthService {
  constructor(private readonly userService = UserService) {}

  /** 
   * Autentica um usuário com email e senha, retornando um token JWT em caso de sucesso
   * @param email - Email do usuário
   * @param password - Senha do usuário
   * @returns Token JWT
   */
  async login(email: string, password: string): Promise<IToken> {
    // Valida existência de usuário com o email informado
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new ErrorMessage("Credenciais inválidas", 401);
    }

    // Valida a senha informada
    const isPasswordCorrect = compareHashPassword(password, user.passwordHash).success;
    if (!isPasswordCorrect) {
      throw new ErrorMessage("Credenciais inválidas", 401);
    }

    // Verifica se usuário está com acesso ativo
    if (!user.isActive) {
      throw new ErrorMessage("Usuário com acesso desativado", 401);
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
    return { token: this.generateToken(jsonPayload, env.SECRET) };
  }

  /**
   * Gera um token JWT com base em um payload e um segredo
   * @param payload - Dados a serem incluídos no token
   * @param secret - Segredo para assinatura do token
   * @returns Token JWT
   */
  private generateToken(payload: any, secret: string): string {
    const plainPayload = payload instanceof Model ? payload.toJSON() : payload;
    return jwt.sign(plainPayload, secret, { expiresIn: "2h" });
  }
}

export default new AuthService();
