import RolePermissionRepository from "src/repositories/RolePermissionRepository";

const rolePermissionRepository = new RolePermissionRepository();

async function seedRolesPermissions() {
  const rolesPermissions = [
    // Administrador - Acesso total
    { roleId: 1, permissionId: 1 },   // users.get
    { roleId: 1, permissionId: 2 },   // users.delete
    { roleId: 1, permissionId: 3 },   // users.patch
    { roleId: 1, permissionId: 4 },   // users.post
    { roleId: 1, permissionId: 5 },   // schools.get
    { roleId: 1, permissionId: 6 },   // schools.delete
    { roleId: 1, permissionId: 7 },   // schools.patch
    { roleId: 1, permissionId: 8 },   // schools.post
    { roleId: 1, permissionId: 9 },   // roles.get
    { roleId: 1, permissionId: 10 }, // roles.delete
    { roleId: 1, permissionId: 11 }, // roles.patch
    { roleId: 1, permissionId: 12 }, // roles.post
    { roleId: 1, permissionId: 13 }, // venues.get
    { roleId: 1, permissionId: 14 }, // venues.delete
    { roleId: 1, permissionId: 15 }, // venues.patch
    { roleId: 1, permissionId: 16 }, // venues.post
    { roleId: 1, permissionId: 17 }, // permissions.get
    { roleId: 1, permissionId: 18 }, // permissions.delete
    { roleId: 1, permissionId: 19 }, // permissions.patch
    { roleId: 1, permissionId: 20 }, // permissions.post
    { roleId: 1, permissionId: 21 }, // tasks.get
    { roleId: 1, permissionId: 22 }, // tasks.delete
    { roleId: 1, permissionId: 23 }, // tasks.patch
    { roleId: 1, permissionId: 24 }, // tasks.post
    { roleId: 1, permissionId: 25 }, // events.get
    { roleId: 1, permissionId: 26 }, // events.delete
    { roleId: 1, permissionId: 27 }, // events.patch
    { roleId: 1, permissionId: 28 }, // events.post
    { roleId: 1, permissionId: 29 }, // event-types.get
    { roleId: 1, permissionId: 30 }, // event-types.delete
    { roleId: 1, permissionId: 31 }, // event-types.patch
    { roleId: 1, permissionId: 32 }, // event-types.post
    { roleId: 1, permissionId: 33 }, // subscriptions.get
    { roleId: 1, permissionId: 34 }, // subscriptions.delete
    { roleId: 1, permissionId: 35 }, // subscriptions.patch
    { roleId: 1, permissionId: 36 }, // subscriptions.post

    // Aluno - Somente ver dados próprios, eventos e inscrições
    { roleId: 2, permissionId: 1 },   // users.get
    { roleId: 2, permissionId: 25 }, // events.get
    { roleId: 2, permissionId: 33 }, // subscriptions.get

    // Professor - Gerenciar inscrições, eventos, tipos de eventos e tarefas
    { roleId: 3, permissionId: 1 },   // users.get
    { roleId: 3, permissionId: 25 }, // events.get
    { roleId: 3, permissionId: 26 }, // events.delete
    { roleId: 3, permissionId: 27 }, // events.patch
    { roleId: 3, permissionId: 28 }, // events.post
    { roleId: 3, permissionId: 29 }, // event-types.get
    { roleId: 3, permissionId: 30 }, // event-types.delete
    { roleId: 3, permissionId: 31 }, // event-types.patch
    { roleId: 3, permissionId: 32 }, // event-types.post
    { roleId: 3, permissionId: 33 }, // subscriptions.get
    { roleId: 3, permissionId: 34 }, // subscriptions.delete
    { roleId: 3, permissionId: 35 }, // subscriptions.patch
    { roleId: 3, permissionId: 36 }, // subscriptions.post
    { roleId: 3, permissionId: 21 }, // tasks.get
    { roleId: 3, permissionId: 22 }, // tasks.delete
    { roleId: 3, permissionId: 23 }, // tasks.patch
    { roleId: 3, permissionId: 24 }, // tasks.post

    // Coordenador - Professor + gerenciar usuários
    { roleId: 4, permissionId: 1 },   // users.get
    { roleId: 4, permissionId: 1 },  // users.get
    { roleId: 4, permissionId: 2 },  // users.delete
    { roleId: 4, permissionId: 3 },  // users.patch
    { roleId: 4, permissionId: 4 },  // users.post
    { roleId: 4, permissionId: 25 }, // events.get
    { roleId: 4, permissionId: 26 }, // events.delete
    { roleId: 4, permissionId: 27 }, // events.patch
    { roleId: 4, permissionId: 28 }, // events.post
    { roleId: 4, permissionId: 29 }, // event-types.get
    { roleId: 4, permissionId: 30 }, // event-types.delete
    { roleId: 4, permissionId: 31 }, // event-types.patch
    { roleId: 4, permissionId: 32 }, // event-types.post
    { roleId: 4, permissionId: 33 }, // subscriptions.get
    { roleId: 4, permissionId: 34 }, // subscriptions.delete
    { roleId: 4, permissionId: 35 }, // subscriptions.patch
    { roleId: 4, permissionId: 36 }, // subscriptions.post
    { roleId: 4, permissionId: 21 }, // tasks.get
    { roleId: 4, permissionId: 22 }, // tasks.delete
    { roleId: 4, permissionId: 23 }, // tasks.patch
    { roleId: 4, permissionId: 24 }, // tasks.post

    // Diretor - Tudo exceto cargos e permissões
    { roleId: 5, permissionId: 1 },   // users.get
    { roleId: 5, permissionId: 1 },  // users.get
    { roleId: 5, permissionId: 2 },  // users.delete
    { roleId: 5, permissionId: 3 },  // users.patch
    { roleId: 5, permissionId: 4 },  // users.post
    { roleId: 5, permissionId: 5 },  // schools.get
    { roleId: 5, permissionId: 6 },  // schools.delete
    { roleId: 5, permissionId: 7 },  // schools.patch
    { roleId: 5, permissionId: 8 },  // schools.post
    { roleId: 5, permissionId: 13 }, // venues.get
    { roleId: 5, permissionId: 14 }, // venues.delete
    { roleId: 5, permissionId: 15 }, // venues.patch
    { roleId: 5, permissionId: 16 }, // venues.post
    { roleId: 5, permissionId: 21 }, // tasks.get
    { roleId: 5, permissionId: 22 }, // tasks.delete
    { roleId: 5, permissionId: 23 }, // tasks.patch
    { roleId: 5, permissionId: 24 }, // tasks.post
    { roleId: 5, permissionId: 25 }, // events.get
    { roleId: 5, permissionId: 26 }, // events.delete
    { roleId: 5, permissionId: 27 }, // events.patch
    { roleId: 5, permissionId: 28 }, // events.post
    { roleId: 5, permissionId: 29 }, // event-types.get
    { roleId: 5, permissionId: 30 }, // event-types.delete
    { roleId: 5, permissionId: 31 }, // event-types.patch
    { roleId: 5, permissionId: 32 }, // event-types.post
    { roleId: 5, permissionId: 33 }, // subscriptions.get
    { roleId: 5, permissionId: 34 }, // subscriptions.delete
    { roleId: 5, permissionId: 35 }, // subscriptions.patch
    { roleId: 5, permissionId: 36 }  // subscriptions.post
  ];

  for (const rolePermission of rolesPermissions) {
    await rolePermissionRepository.findOrCreate({
      where: {
        roleId: rolePermission.roleId,
        permissionId: rolePermission.permissionId
      },
      defaults: rolePermission
    });
  }
}

export default seedRolesPermissions;