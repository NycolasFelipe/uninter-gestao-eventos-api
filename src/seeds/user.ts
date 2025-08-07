import UserRepository from "src/repositories/UserRepository";

const userRepository = new UserRepository();

// Configurações compartilhadas
const COMMON_PROPS = {
  passwordHash: "55a5e9e78207b4df8699d60886fa070079463547b095d1a05bc719bb4e6cd251",
  isActive: 1
};

// Dados iniciais
const SCHOOLS = [
  { id: 1, name: "Niterói" },
  { id: 2, name: "Copacabana" },
  { id: 3, name: "Ipanema" }
];

const FIRST_NAMES = [
  "João", "Pedro", "Lucas", "Gabriel", "Carlos", "Marcos", "Eduardo", "Rafael",
  "Daniel", "Bruno", "Felipe", "André", "Thiago", "Leonardo", "Vinicius", "Paulo",
  "Rodrigo", "Marcelo", "Alexandre", "Roberto", "Gustavo", "Fernando", "Diego",
  "Antônio", "Ricardo", "Márcio", "Sérgio", "José", "Wagner", "Maurício",
  "Maria", "Ana", "Julia", "Fernanda", "Patrícia", "Camila", "Amanda", "Letícia",
  "Isabela", "Beatriz", "Mariana", "Carolina", "Gabriela", "Laura", "Cláudia",
  "Tatiana", "Vanessa", "Renata", "Bianca", "Raquel", "Daniela", "Aline", "Monica",
  "Adriana", "Cristina", "Elaine", "Sandra", "Débora", "Jéssica", "Natália"
];

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
  "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho",
  "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha",
  "Dias", "Nunes", "Monteiro", "Moreira", "Mendes", "Araújo", "Cardoso",
  "Teixeira", "Cunha", "Machado", "Nascimento", "Aguiar", "Moraes", "Tavares",
  "Andrade", "Borges", "Sampaio", "Brito", "Peixoto", "Fonseca", "Pinto",
  "Guimarães", "Vasconcelos", "Correia", "Castro", "Xavier", "Azevedo", "Freitas"
];

// Funções utilitárias
const generateRandomPhone = () => `(21) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
const generateAvatarUrl = (firstName: string, lastName: string) =>
  `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

// Função para criar usuário
const createUser = (id: number, firstName: string, lastName: string, email: string, schoolId: number | null, roleId: number) => ({
  id,
  firstName,
  lastName,
  email,
  schoolId,
  roleId,
  phoneNumber: generateRandomPhone(),
  profilePictureUrl: generateAvatarUrl(firstName, lastName),
  ...COMMON_PROPS
});

// Função para gerar e-mail baseado no nome e escola
const generateEmail = (firstName: string, lastName: string, schoolName?: string) => {
  const baseEmail = `${firstName.toLowerCase().replace(/\s+/g, '.')}.${lastName.toLowerCase().replace(/\s+/g, '.')}`;
  return schoolName
    ? `${baseEmail}@${schoolName.toLowerCase()}.com`
    : `${baseEmail}@email.com`;
};

async function seedUsers() {
  const users = [];
  let userId = 1;

  // Gerar alunos para cada escola
  for (const school of SCHOOLS) {
    const shuffledFirstNames = [...FIRST_NAMES].sort(() => Math.random() - 0.5);
    const shuffledLastNames = [...LAST_NAMES].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 10; i++) {
      const firstName = shuffledFirstNames[i % shuffledFirstNames.length];
      const lastName = shuffledLastNames[i % shuffledLastNames.length];

      users.push(createUser(
        userId++,
        firstName,
        lastName,
        generateEmail(firstName, lastName, school.name),
        school.id,
        2 // Aluno
      ));
    }
  }

  // Usuário administrador
  users.push(createUser(
    999,
    "Administrador",
    "TI",
    "ti.admin@email.com",
    null,
    1 // Administrador
  ));

  // Gerar usuários especiais (professor, coordenador, diretor) para cada escola
  const SPECIAL_ROLES = [
    { roleName: "Professor", roleId: 3 },
    { roleName: "Coordenador", roleId: 4 },
    { roleName: "Diretor", roleId: 5 }
  ];

  let specialUserId = 1000;
  for (const school of SCHOOLS) {
    for (const role of SPECIAL_ROLES) {
      users.push(createUser(
        specialUserId++,
        role.roleName,
        school.name,
        generateEmail(role.roleName, school.name),
        school.id,
        role.roleId
      ));
    }
  }

  // Inserir todos os usuários no banco de dados
  for (const user of users) {
    await userRepository.findOrCreate({
      where: { id: user.id },
      defaults: user
    });
  }
}

export default seedUsers;