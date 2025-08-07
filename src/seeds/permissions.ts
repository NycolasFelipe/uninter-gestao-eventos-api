import PermissionRepository from "src/repositories/PermissionRepository";

const permissionRepository = new PermissionRepository();

async function seedPermissions() {
  const permissions = [
    // Usuários
    { id: 1, permissionName: "users.get", description: "Buscar dados de usuários" },
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

    // Locais
    { id: 13, permissionName: "venues.get", description: "Acessar dados de locais" },
    { id: 14, permissionName: "venues.delete", description: "Remover um local" },
    { id: 15, permissionName: "venues.patch", description: "Atualizar dados de um local" },
    { id: 16, permissionName: "venues.post", description: "Criar um novo local" },

    // Permissões
    { id: 17, permissionName: "permissions.get", description: "Acessar permissões" },
    { id: 18, permissionName: "permissions.delete", description: "Remover uma permissão" },
    { id: 19, permissionName: "permissions.patch", description: "Atualizar dados de uma permissão" },
    { id: 20, permissionName: "permissions.post", description: "Criar nova permissão" },

    // Tarefas
    { id: 21, permissionName: "tasks.get", description: "Acessar dados de tarefas" },
    { id: 22, permissionName: "tasks.delete", description: "Remover uma tarefa" },
    { id: 23, permissionName: "tasks.patch", description: "Atualizar dados de uma tarefa" },
    { id: 24, permissionName: "tasks.post", description: "Criar uma nova tarefa" },

    // Eventos
    { id: 25, permissionName: "events.get", description: "Acessar dados de eventos" },
    { id: 26, permissionName: "events.delete", description: "Remover um evento" },
    { id: 27, permissionName: "events.patch", description: "Atualizar dados de um evento" },
    { id: 28, permissionName: "events.post", description: "Criar um novo evento" },

    // Tipos de Eventos
    { id: 29, permissionName: "event-types.get", description: "Acessar tipos de eventos" },
    { id: 30, permissionName: "event-types.delete", description: "Remover um tipo de evento" },
    { id: 31, permissionName: "event-types.patch", description: "Atualizar um tipo de evento" },
    { id: 32, permissionName: "event-types.post", description: "Criar um novo tipo de evento" },

    // Inscrições
    { id: 33, permissionName: "subscriptions.get", description: "Acessar inscrições" },
    { id: 34, permissionName: "subscriptions.delete", description: "Remover inscrição" },
    { id: 35, permissionName: "subscriptions.patch", description: "Atualizar inscrição" },
    { id: 36, permissionName: "subscriptions.post", description: "Criar nova inscrição" }
  ];

  for (const permission of permissions) {
    await permissionRepository.findOrCreate({
      where: { permissionName: permission.permissionName },
      defaults: permission
    });
  }
}

export default seedPermissions;