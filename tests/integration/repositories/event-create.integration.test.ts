import { Sequelize } from "sequelize-typescript";
import { describe, beforeAll, beforeEach, afterAll, it, expect } from "vitest";
import { MySqlContainer, type StartedMySqlContainer } from "@testcontainers/mysql";

import models from "src/models";
import EventRepository from "src/repositories/EventRepository";
import School from "src/models/School";
import EventType from "src/models/EventType";
import Venue from "src/models/Venue";
import User from "src/models/User";
import Event from "src/models/Event";
import ErrorMessage from "src/errors/ErrorMessage";
import { EventStatus } from "src/enums/EventStatusEnum";

let sequelize: Sequelize;
let mysqlContainer: StartedMySqlContainer;

type BaseEntities = {
  schoolId: number;
  eventTypeId: number;
  venueId: number;
  organizerUserId: number;
};

const baseEventData = {
  name: "Feira de Tecnologia",
  description: "Evento para apresentar projetos de tecnologia",
  objective: "Engajar alunos em práticas de inovação",
  targetAudience: "Alunos e comunidade escolar",
  status: EventStatus.Planned,
  isPublic: true,
};

async function seedBaseEntities(): Promise<BaseEntities> {
  const school = await School.create({
    name: "Escola Integração",
    address: "Rua dos Testes, 123",
  });

  const eventType = await EventType.create({
    name: "Tipo Integração",
    description: "Tipo usado apenas para testes",
  });

  const venue = await Venue.create({
    schoolId: school.id,
    name: "Auditório de Teste",
    address: "Bloco A",
    capacity: 200,
    isInternal: true,
  });

  const user = await User.create({
    firstName: "Usuário",
    lastName: "Teste",
    email: "usuario.teste@integracao.local",
    passwordHash: "hash-somente-teste",
    phoneNumber: null,
    profilePictureUrl: null,
    isActive: true,
    schoolId: school.id,
    roleId: null,
  });

  return {
    schoolId: school.id,
    eventTypeId: eventType.id,
    venueId: venue.id,
    organizerUserId: Number(user.id),
  };
}

describe("EventRepository.create (integração)", () => {
  beforeAll(async () => {
    mysqlContainer = await new MySqlContainer("mysql:8.4").start();

    sequelize = new Sequelize({
      dialect: "mysql",
      host: mysqlContainer.getHost(),
      port: mysqlContainer.getPort(),
      database: mysqlContainer.getDatabase(),
      username: mysqlContainer.getUsername(),
      password: mysqlContainer.getUserPassword(),
      logging: false,
      models,
    });

    await sequelize.authenticate();
  }, 120_000);

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
    await mysqlContainer.stop();
  }, 120_000);

  it("deve criar evento com sucesso quando não há conflito de agenda", async () => {
    const base = await seedBaseEntities();

    const created = await EventRepository.create({
      ...baseEventData,
      ...base,
      startDate: new Date("2026-06-10T10:00:00.000Z"),
      endDate: new Date("2026-06-10T12:00:00.000Z"),
    });

    const persisted = await Event.findByPk(created.id);

    expect(created.id).toBeGreaterThan(0);
    expect(created.name).toBe(baseEventData.name);
    expect(persisted).not.toBeNull();
    expect(persisted?.venueId).toBe(base.venueId);
  });

  it("deve bloquear criação quando houver conflito de agenda no mesmo local e escola", async () => {
    const base = await seedBaseEntities();

    const existing = await EventRepository.create({
      ...baseEventData,
      ...base,
      name: "Evento já agendado",
      startDate: new Date("2026-06-10T10:00:00.000Z"),
      endDate: new Date("2026-06-10T12:00:00.000Z"),
    });

    await expect(
      EventRepository.create({
        ...baseEventData,
        ...base,
        name: "Evento conflitante",
        startDate: new Date("2026-06-10T11:00:00.000Z"),
        endDate: new Date("2026-06-10T13:00:00.000Z"),
      })
    ).rejects.toEqual(
      expect.objectContaining({
        name: ErrorMessage.name,
        status: 422,
        message: expect.stringContaining(String(existing.id)),
      })
    );
  });

  it("deve permitir criação quando horários não se sobrepõem", async () => {
    const base = await seedBaseEntities();

    await EventRepository.create({
      ...baseEventData,
      ...base,
      name: "Evento manhã",
      startDate: new Date("2026-06-10T08:00:00.000Z"),
      endDate: new Date("2026-06-10T10:00:00.000Z"),
    });

    const created = await EventRepository.create({
      ...baseEventData,
      ...base,
      name: "Evento tarde",
      startDate: new Date("2026-06-10T10:01:00.000Z"),
      endDate: new Date("2026-06-10T12:00:00.000Z"),
    });

    expect(created.id).toBeGreaterThan(0);

    const count = await Event.count();
    expect(count).toBe(2);
  });
});
