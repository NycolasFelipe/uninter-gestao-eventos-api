import { afterEach, describe, expect, it, vi } from "vitest";

import { requestContext } from "src/context/requestContext";
import UserService from "src/services/UserService";
import processQueryParams from "src/util/processQueryParams";

describe("processQueryParams", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve adicionar userId e schoolId para usuário não administrador", async () => {
    vi.spyOn(requestContext, "get").mockReturnValue({ payload: { id: 15 } });
    vi.spyOn(UserService, "getDetailById").mockResolvedValue({
      id: 15,
      school: { id: 2 },
      role: { roleName: "Aluno" },
    } as any);

    const result = await processQueryParams({ status: "Planned", schoolId: 999 } as any);

    expect(result).toEqual({
      status: "Planned",
      schoolId: 2,
      userId: 15,
    });
    expect(UserService.getDetailById).toHaveBeenCalledWith(15);
  });

  it("deve adicionar adminId para usuário administrador", async () => {
    vi.spyOn(requestContext, "get").mockReturnValue({ payload: { id: 1 } });
    vi.spyOn(UserService, "getDetailById").mockResolvedValue({
      id: 1,
      school: { id: 1 },
      role: { roleName: "Administrador" },
    } as any);

    const result = await processQueryParams({ limit: 10, offset: 20 } as any);

    expect(result).toEqual({
      limit: 10,
      offset: 20,
      adminId: 1,
    });
    expect((result as any).userId).toBeUndefined();
    expect((result as any).schoolId).toBeUndefined();
  });

  it("deve funcionar mesmo sem params informados", async () => {
    vi.spyOn(requestContext, "get").mockReturnValue({ payload: { id: 22 } });
    vi.spyOn(UserService, "getDetailById").mockResolvedValue({
      id: 22,
      school: { id: 9 },
      role: { roleName: "Professor" },
    } as any);

    const result = await processQueryParams();

    expect(result).toEqual({
      userId: 22,
      schoolId: 9,
    });
  });
});
