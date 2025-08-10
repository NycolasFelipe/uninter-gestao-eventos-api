import ErrorMessage from "src/errors/ErrorMessage";

/**
 * Verifica se há variáveis de ambiente faltando e lança um erro customizado se alguma estiver ausente
 * 
 * @param env - Objeto chave-valor contendo as variáveis de ambiente a serem validadas
 * @throws {ErrorMessage} - Erro customizado listando todas as variáveis faltantes
 * 
 * @example
 * warnMissingEnv({
 *   DB_HOST: process.env.DB_HOST,
 *   API_KEY: process.env.API_KEY
 * });
 */
function warnMissingEnv(env: Record<string, any>): void {
  // Filtra as entradas do objeto para encontrar variáveis com valor falsy (undefined, null, '', etc)
  const missingVariables = Object.entries(env)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  // Se encontrou variáveis faltando, lança um erro com a lista das variáveis
  if (missingVariables.length > 0) {
    throw new ErrorMessage(
      `Variáveis de ambiente necessárias não encontradas: ${missingVariables.join(', ')}`, 
      500 // Código HTTP 500 (Internal Server Error)
    );
  }
}

export default warnMissingEnv;