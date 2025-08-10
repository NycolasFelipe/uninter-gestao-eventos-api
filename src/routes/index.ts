import { RequestHandler, Router } from "express";

// Rotas
import AuthRoute from "./AuthRoute";
import EventRoute from "./EventRoute";
import EventTypeRoute from "./EventTypeRoute";
import PermissionRoute from "./PermissionRoute";
import RoleRoute from "./RoleRoute";
import SchoolRoute from "./SchoolRoute";
import SubscriptionRoute from "./SubscriptionRoute";
import TaskRoute from "./TaskRoute";
import UserRoute from "./UserRoute";
import VenueRoute from "./VenueRoute";

// Middlewares
import authenticateJWT from "src/middlewares/authenticateJWT";
import resourceAccessMiddleware from "src/middlewares/resourceAccessMiddleware";

// Middlewares globais
const globalMiddlewares: RequestHandler[] = [authenticateJWT];

// Interface para tipagem das rotas configuráveis
interface ConfigurableRoute {
  name: string;
  router: Router;
  useGlobalMiddlewares?: boolean;
  middlewares?: RequestHandler[];
}

// Configuração das rotas
const routes: ConfigurableRoute[] = [
  {
    name: "/auth",
    router: AuthRoute,
    useGlobalMiddlewares: false,
    middlewares: []
  },
  {
    name: "/events",
    router: EventRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
  {
    name: "/event-types",
    router: EventTypeRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
  {
    name: "/permissions",
    router: PermissionRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
  {
    name: "/roles",
    router: RoleRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
  {
    name: "/schools",
    router: SchoolRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
  {
    name: "/subscriptions",
    router: SubscriptionRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
  {
    name: "/tasks",
    router: TaskRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
  {
    name: "/users",
    router: UserRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
  {
    name: "/venues",
    router: VenueRoute,
    useGlobalMiddlewares: true,
    middlewares: []
  },
];

// Aplica os middlewares conforme configuração
const router = Router();

// Aplica os middlewares e monta as rotas
for (const route of routes) {
  const middlewaresToApply: RequestHandler[] = [];

  if (route.useGlobalMiddlewares) {
    middlewaresToApply.push(...globalMiddlewares);
  }

  if (route.middlewares) {
    middlewaresToApply.push(...route.middlewares);
  }

  // Monta a rota com os middlewares apropriados
  router.use(route.name, ...middlewaresToApply, route.router);
}

export default router;