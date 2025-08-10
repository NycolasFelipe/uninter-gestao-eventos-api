import { Attributes, FindOptions, Model, ModelStatic, WhereOptions } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

/** Classe abstrata base para repositórios com operações CRUD comuns */
abstract class BaseRepository<T extends Model> {
  /** Cria uma nova instância do BaseRepository */
  constructor(protected model: ModelStatic<T>) { }

  /** Obtém todos os registros */
  async getAll(options?: FindOptions<Attributes<T>> | undefined): Promise<T[]> {
    return this.model.findAll(options);
  }

  /** Busca um registro pela chave primária */
  async getById(id: number | bigint): Promise<T | null> {
    return this.model.findByPk(id);
  }

  /** Cria um novo registro */
  async create(data: Omit<MakeNullishOptional<T['_creationAttributes']>, 'id'>): Promise<T> {
    return this.model.create(data as MakeNullishOptional<T['_creationAttributes']>);
  }

  /** Busca ou atualiza um registro */
  async findOrCreate(data: Omit<MakeNullishOptional<T['_creationAttributes']>, 'id'>): Promise<[T, boolean]> {
    return this.model.findOrCreate(data as MakeNullishOptional<T['_creationAttributes']>);
  }

  /** Atualiza registros por ID */
  async update(id: number | bigint, data: Partial<T>): Promise<number> {
    const [affectedRows] = await this.model.update(data, {
      where: { id } as unknown as WhereOptions<T>
    });
    return affectedRows;
  }

  /** Exclui registros por ID */
  async delete(options?: FindOptions<Attributes<T>> | undefined): Promise<number>;
  async delete(id: number | bigint): Promise<number>;
  async delete(identifier?: number | bigint | FindOptions<Attributes<T>>): Promise<number> {
    if (typeof identifier === 'number' || typeof identifier === 'bigint') {
      // Exclusão por id
      return this.model.destroy({
        where: { id: identifier } as unknown as WhereOptions<T>
      });
    } else {
      // Exclusão por opções de busca
      return this.model.destroy(identifier);
    }
  }
}

export default BaseRepository;
