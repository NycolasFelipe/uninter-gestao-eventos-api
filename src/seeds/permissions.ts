import PermissionRepository from "src/repositories/PermissionRepository";

const permissionRepository = new PermissionRepository();

async function seedPermissions() {
  const permissions = [
    // Usuários
    { id: 1, permissionName: "users.get", description: "Acessar dados de usuários" },
    { id: 2, permissionName: "users.delete", description: "Remover um usuário" },
    { id: 3, permissionName: "users.patch", description: "Atualizar dados de um usuário" },
    { id: 4, permissionName: "users.post", description: "Criar um novo usuário" },

    // Escolas
    { id: 5, permissionName: "schools.get", description: "Acessar dados de escolas" },
    { id: 6, permissionName: "schools.delete", description: "Remover uma escola" },
    { id: 7, permissionName: "schools.patch", description: "Atualizar dados de uma escola" },
    { id: 8, permissionName: "schools.post", description: "Criar uma nova escola" },
    
    // Cargos
    { id: 9, permissionName: "roles.get", description: "Acessar dados de cargos" },
    { id: 10, permissionName: "roles.delete", description: "Remover um cargo" },
    { id: 11, permissionName: "roles.patch", description: "Atualizar dados de um cargo" },
    { id: 12, permissionName: "roles.post", description: "Criar um novo cargo" },
  ]

  for (const permission of permissions) {
    await permissionRepository.findOrCreate({
      where: { id: permission.id },
      defaults: permission
    });
  }
}

export default seedPermissions;