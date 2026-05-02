import ErrorMessage from "src/errors/ErrorMessage";
import { CreationAttributes } from "sequelize";

// Models
import Subscription from "src/models/Subscription";

// Repositories
import SubscriptionRepository from "src/repositories/SubscriptionRepository";

/** Serviço para operações relacionadas a inscrições em eventos */
class SubscriptionService {
  constructor(private readonly repository = SubscriptionRepository) {}

  /** Obtém todas as inscrições cadastradas */
  async getAll(): Promise<Subscription[]> {
    return this.repository.getAll();
  }

  /** Obtém todas as inscrições associadas a um usuário */
  async getAllByUserId(userId: number): Promise<Subscription[]> {
    return this.repository.getAllByUserId(userId);
  }

  /** Obtém todas as inscrições associadas a um evento */
  async getAllByEventId(eventId: number): Promise<Subscription[]> {
    return this.repository.getAll({ where: { eventId } });
  }

  /** Busca uma inscrição por ID */
  async getById(id: number): Promise<Subscription> {
    const subscription = await this.repository.getById(id);
    if (!subscription) {
      throw new ErrorMessage(`Inscrição com id ${id} não encontrada.`, 404);
    }
    return subscription;
  }

  /** Cria uma nova inscrição */
  async create(data: CreationAttributes<Subscription>): Promise<Subscription> {
    return this.repository.create(data);
  }

  /** Cancela uma inscrição existente */
  async cancel(eventId: number, userId: number): Promise<void> {
    // Executa cancelamento
    await this.repository.delete(eventId, userId);
  }
}

export default new SubscriptionService();
