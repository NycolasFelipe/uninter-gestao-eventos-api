import SchoolRepository from "src/repositories/SchoolRepository";

const schoolRepository = new SchoolRepository();

async function seedSchools() {
  const schools = [
    { id: 1, name: "Niterói", address: "Rua Presidente Pedreira, 98, Ingá, Niterói - RJ, CEP 24.220-320" },
    { id: 2, name: "Copacabana", address: "Av. Nossa Sra. de Copacabana, 226, Copacabana, Rio de Janeiro - RJ, CEP 22.031-000" },
    { id: 3, name: "Ipanema", address: "Rua Visconde de Pirajá, 81, Ipanema, Rio de Janeiro - RJ, CEP 22.410-003" },
    { id: 4, name: "Leblon", address: "Rua General Urquiza, 155, Leblon, Rio de Janeiro - RJ, CEP 22.441-040" },
    { id: 5, name: "Barra da Tijuca", address: "Av. das Américas, 3555, Barra da Tijuca, Rio de Janeiro - RJ, CEP 22.640-102" },
    { id: 6, name: "Tijuca", address: "Rua Conde de Bonfim, 431, Tijuca, Rio de Janeiro - RJ, CEP 20.520-050" },
    { id: 7, name: "Botafogo", address: "Rua Voluntários da Pátria, 118, Botafogo, Rio de Janeiro - RJ, CEP 22.270-010" },
    { id: 8, name: "Flamengo", address: "Rua Marquês de Abrantes, 55, Flamengo, Rio de Janeiro - RJ, CEP 22.230-060" },
    { id: 9, name: "Laranjeiras", address: "Rua das Laranjeiras, 346, Laranjeiras, Rio de Janeiro - RJ, CEP 22.240-002" },
    { id: 10, name: "Santa Teresa", address: "Rua Almirante Alexandrino, 541, Santa Teresa, Rio de Janeiro - RJ, CEP 20.240-260" }
  ];

  for (const school of schools) {
    await schoolRepository.findOrCreate({
      where: { id: school.id },
      defaults: school
    });
  }
}

export default seedSchools;