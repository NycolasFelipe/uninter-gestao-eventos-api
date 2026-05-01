import SchoolRepository from "src/repositories/SchoolRepository";

const schoolRepository = SchoolRepository;

async function seedSchools() {
  const schools = [
    { id: 1, name: "Niterói", address: "Rua Presidente Pedreira, 98, Ingá, Niterói - RJ, CEP 24.220-320" },
    { id: 2, name: "Copacabana", address: "Av. Nossa Sra. de Copacabana, 226, Copacabana, Rio de Janeiro - RJ, CEP 22.031-000" },
    { id: 3, name: "Ipanema", address: "Rua Visconde de Pirajá, 81, Ipanema, Rio de Janeiro - RJ, CEP 22.410-003" },
  ];

  for (const school of schools) {
    await schoolRepository.findOrCreate({
      where: { name: school.name },
      defaults: school
    });
  }
}

export default seedSchools;
