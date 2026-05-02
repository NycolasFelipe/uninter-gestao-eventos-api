import { describe, expect, it } from "vitest";

import ErrorMessage from "src/errors/ErrorMessage";
import hashPassword from "src/util/hashPassword";

describe("hashPassword", () => {
  it("deve gerar hash sha256 determinístico para a mesma senha", () => {
    const password = "senha-super-secreta";

    const hash1 = hashPassword(password);
    const hash2 = hashPassword(password);

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64);
    expect(hash1).toMatch(/^[a-f0-9]{64}$/);
  });

  it("deve lançar ErrorMessage quando senha estiver vazia", () => {
    expect(() => hashPassword("")).toThrowError(ErrorMessage);

    try {
      hashPassword("");
    } catch (error) {
      const err = error as ErrorMessage;
      expect(err.status).toBe(400);
      expect(err.message).toBe("o campo senha não pode ser vazio.");
    }
  });
});
