import ErrorMessage from "src/errors/ErrorMessage";
import { CreationAttributes } from "sequelize";

// Models
import Subscription from "src/models/Subscription";

// Repositories
import SubscriptionRepository from "src/repositories/SubscriptionRepository";

// Instância do repositório de inscrições
const repository = new SubscriptionRepository();

/** Serviço para operações relacionadas a inscrições em eventos */
class SubscriptionService {
  /** Obtém todas as inscrições cadastradas */
  async getAll(): Promise<Subscription[]> {
    return repository.getAll();
  }

  /** Obtém todas as inscrições associadas a um usuário */
  async getAllByUserId(userId: number): Promise<Subscription[]> {
    return repository.getAllByUserId(userId);
  }

  /** Obtém todas as inscrições associadas a um evento */
  async getAllByEventId(eventId: number): Promise<Subscription[]> {
    return repository.getAll({ where: { eventId } });
  }

  /** Busca uma inscrição por ID */
  async getById(id: number): Promise<Subscription> {
    const subscription = await repository.getById(id);
    if (!subscription) {
      throw new ErrorMessage(`Inscrição com id ${id} não encontrada.`, 404);
    }
    return subscription;
  }

  /** Cria uma nova inscrição */
  async create(data: CreationAttributes<Subscription>): Promise<Subscription> {
    return repository.create(data);
  }

  /** Cancela uma inscrição existente */
  async cancel(eventId: number, userId: number): Promise<void> {
    // Executa cancelamento
    await repository.delete(eventId, userId);
  }
}

export default SubscriptionService;