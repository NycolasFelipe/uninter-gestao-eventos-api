// Importação de módulos principais e dependências
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import sequelize from "src/config/sequelize";

// Importação das rotas da aplicação
import announcement from "src/routes/AnnouncementRoute";
import auth from "src/routes/AuthRoute";
import event from "src/routes/EventRoute";
import eventType from "src/routes/EventTypeRoute";
import permission from "src/routes/PermissionRoute";
import role from "src/routes/RoleRoute";
import school from "src/routes/SchoolRoute";
import subscription from "src/routes/SubscriptionRoute";
import task from "src/routes/TaskRoute";
import user from "src/routes/UserRoute";
import venue from "src/routes/VenueRoute";

// Importação dos middlewares
import authenticateJWT from "./middlewares/authenticateJWT";
import resourceAccessMiddleware from "./middlewares/resourceAccessMiddleware";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

// Criação da instância do Express
const app = express();

// Configuração de middlewares globais
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rotas sem autenticação
app.use("/api/v0/auth", auth);

// Middleware de autenticação JWT aplicado globalmente
app.use(authenticateJWT);

// Rotas autenticadas da aplicação com controle de acesso
app.use("/api/v0/announcements", resourceAccessMiddleware, announcement);
app.use("/api/v0/events", resourceAccessMiddleware, event);
app.use("/api/v0/event-types", resourceAccessMiddleware, eventType);
app.use("/api/v0/permissions", resourceAccessMiddleware, permission);
app.use("/api/v0/roles", resourceAccessMiddleware, role);
app.use("/api/v0/schools", resourceAccessMiddleware, school);
app.use("/api/v0/subscriptions", resourceAccessMiddleware, subscription);
app.use("/api/v0/tasks", resourceAccessMiddleware, task);
app.use("/api/v0/users", resourceAccessMiddleware, user);
app.use("/api/v0/venues", resourceAccessMiddleware, venue);

// Middleware de tratamento de erros
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