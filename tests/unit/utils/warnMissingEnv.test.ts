import { describe, expect, it } from "vitest";

import ErrorMessage from "src/errors/ErrorMessage";
import warnMissingEnv from "src/util/warnMissingEnv";

describe("warnMissingEnv", () => {
  it("não deve lançar erro quando todas as variáveis estiverem preenchidas", () => {
    expect(() =>
      warnMissingEnv({
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASSWORD: "123",
        DB_PORT: 3306,
      })
    ).not.toThrow();
  });

  it("deve lançar ErrorMessage com status 500 quando encontrar variáveis faltantes", () => {
    expect(() =>
      warnMissingEnv({
        DB_HOST: "",
        DB_USER: undefined,
        DB_PASSWORD: null,
        DB_PORT: 0,
      })
    ).toThrowError(ErrorMessage);

    try {
      warnMissingEnv({
        DB_HOST: "",
        DB_USER: undefined,
        DB_PASSWORD: null,
        DB_PORT: 0,
      });
    } catch (error) {
      const err = error as ErrorMessage;
      expect(err.status).toBe(500);
      expect(err.message).toContain("DB_HOST");
      expect(err.message).toContain("DB_USER");
      expect(err.message).toContain("DB_PASSWORD");
      expect(err.message).toContain("DB_PORT");
    }
  });
});
