import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Util e erros internos
import ErrorMessage from "src/errors/ErrorMessage";
import warnMissingEnv from "src/util/warnMissingEnv";
import { requestContext } from "src/context/requestContext";

// Carrega as variáveis de ambiente
dotenv.config();

// Variáveis de ambiente necessárias
const env = {
  ADMIN_FIXED_TOKEN: process.env.ADMIN_FIXED_TOKEN!,
  SECRET: process.env.SECRET!
}

// Valida as variáveis de ambiente e alerta sobre quaisquer faltantes
warnMissingEnv(env);

// Desestruturação das variáveis de ambiente após validação
const { ADMIN_FIXED_TOKEN, SECRET } = env;

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  // Primeiro verifica o token fixo da equipe admin
  const fixedToken = req.headers["x-admin-token"];

  // Se o token fixo foi enviado e é válido, permite acesso
  if (fixedToken && fixedToken === ADMIN_FIXED_TOKEN) {
    return next();
  }

  // Se não usar token fixo, verifica o JWT normal
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.replace(/^Bearer\s+/i, '');

  const handleError = (message: string) => {
    throw new ErrorMessage(message, 401);
  }

  if (!token) {
    return handleError("Token não fornecido ou formato inválido");
  }

  // Verifica o token JWT
  jwt.verify(token, SECRET, (error, payload) => {
    const handleError = (message: string) => {
      throw new ErrorMessage(message, 401);
    };

    if (error) {
      switch (error.name) {
        case 'JsonWebTokenError':
          return handleError('Erro na validação do token');
        case 'TokenExpiredError':
          return handleError('Token expirado');
        case 'Invalid token':
        default:
          return handleError(error.message === 'Invalid token'
            ? 'Token inválido'
            : 'Erro ao verificar token');
      }
    }

    // Injeta dados do usuário na requisição e contexto
    req.payload = payload as jwt.JwtPayload;

    requestContext.run(
      { payload: req.payload },
      async () => next()
    );
  });
}

export default authenticateJWT;
