import { afterEach, describe, expect, it, vi } from "vitest";

import { requestContext } from "src/context/requestContext";
import { EventStatus } from "src/enums/EventStatusEnum";
import { RoleEnum } from "src/enums/RoleEnum";
import EventRepository from "src/repositories/EventRepository";
import EventUpdatesRepository from "src/repositories/EventUpdatesRepository";
import EventService from "src/services/EventService";
import UserService from "src/services/UserService";

describe("EventService processQueryParams (privado)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve adicionar userId e schoolId para usuário não administrador", async () => {
    vi.spyOn(requestContext, "get").mockReturnValue({ payload: { id: 15 } } as any);
    vi.spyOn(UserService, "getDetailById").mockResolvedValue({
      id: 15,
      school: { id: 2 },
      role: { roleName: "Aluno" },
    } as any);

    const getAllSpy = vi.spyOn(EventRepository, "getAll").mockResolvedValue([]);

    await EventService.getAll({ status: "Planned", schoolId: 999 } as any);

    expect(getAllSpy).toHaveBeenCalledWith({
      status: "Planned",
      schoolId: 2,
      userId: 15,
    });
  });

  it("deve adicionar adminId para usuário administrador", async () => {
    vi.spyOn(requestContext, "get").mockReturnValue({ payload: { id: 1 } } as any);
    vi.spyOn(UserService, "getDetailById").mockResolvedValue({
      id: 1,
      school: { id: 1 },
      role: { roleName: RoleEnum.ADMINISTRATOR },
    } as any);

    const getAllSpy = vi.spyOn(EventRepository, "getAll").mockResolvedValue([]);

    await EventService.getAll({ limit: 10, offset: 20 } as any);

    expect(getAllSpy).toHaveBeenCalledWith({
      limit: 10,
      offset: 20,
      adminId: 1,
    });
  });

  it("deve funcionar sem params no fluxo de criação", async () => {
    vi.spyOn(requestContext, "get").mockReturnValue({ payload: { id: 22 } } as any);
    vi.spyOn(UserService, "getDetailById").mockResolvedValue({
      id: 22,
      school: { id: 9 },
      role: { roleName: "Professor" },
    } as any);

    const createSpy = vi.spyOn(EventRepository, "create").mockResolvedValue({
      id: 100,
      status: EventStatus.Planned,
      organizerUserId: 22,
    } as any);
    const updatesSpy = vi.spyOn(EventUpdatesRepository, "create").mockResolvedValue({} as any);

    await EventService.create({
      schoolId: 9,
      eventTypeId: 1,
      venueId: 2,
      name: "Evento de Teste",
      description: null,
      objective: null,
      targetAudience: null,
      status: EventStatus.Planned,
      isPublic: true,
      startDate: new Date("2026-01-01T10:00:00.000Z"),
      endDate: new Date("2026-01-01T12:00:00.000Z"),
    });

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        organizerUserId: 22,
      })
    );
    expect(updatesSpy).toHaveBeenCalledWith({
      eventId: 100,
      status: EventStatus.Planned,
      userId: 22,
    });
  });
});
