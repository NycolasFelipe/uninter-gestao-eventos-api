import RoleRepository from "src/repositories/RoleRepository";

const roleRepository = new RoleRepository();

async function seedRoles() {
  const roles = [
    {
      id: 1,
      roleName: "Administrador",
      description: "Acesso completo e controle total do sistema"
    },
    {
      id: 2,
      roleName: "Aluno",
      description: "Pode se inscrever em eventos e acessar materiais"
    },
    {
      id: 3,
      roleName: "Professor",
      description: "Pode criar eventos e gerenciar atividades"
    },
    {
      id: 4,
      roleName: "Coordenador",
      description: "Pode criar eventos e gerenciar dados de usuários"
    },
    {
      id: 5,
      roleName: "Diretor",
      description: "Pode visualizar todas as funcionalidades da escola"
    }
  ]

  for (const role of roles) {
    await roleRepository.findOrCreate({
      where: { roleName: role.roleName },
      defaults: role
    });
  }
}

export default seedRoles;