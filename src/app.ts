// Importação de módulos principais e dependências
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import sequelize from "src/config/sequelize";

// Importação das rotas da aplicação
//

// Importação dos middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

// Criação da instância do Express
const app = express();

// Configuração de middlewares globais
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rotas da aplicação
// app.use();

// Middlewares
app.use(errorHandlerMiddleware);

// Sincronização com o banco de dados e inicialização do servidor
sequelize
  .then(async (db) => {
    await db.sync({ force: false });
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  })
  .catch((error) => {
    console.error('Falha na inicialização:', error);
    process.exit(1);
  });

export default app;