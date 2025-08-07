import SubscriptionRepository from "src/repositories/SubscriptionRepository";

const subscriptionRepository = new SubscriptionRepository();

async function seedSubscriptions() {
  // Obter todos os alunos (roleId = 2) - IDs de 1 a 30
  const students = Array.from({ length: 30 }, (_, i) => i + 1);

  // Eventos privados (isPublic = false) que permitem inscrição
  const privateEvents = [5, 8, 9, 10]; // IDs de eventos com isPublic: false

  const subscriptions = [];

  // Cada aluno se inscreve em 1-2 eventos privados aleatórios da sua escola
  for (const studentId of students) {
    const schoolId = Math.ceil(studentId / 10); // 1, 2 ou 3 (cada escola tem 10 alunos)

    // Filtrar eventos privados da mesma escola ou eventos abertos a todas escolas (como o 9)
    const eligibleEvents = privateEvents.filter(eventId => {
      const eventSchoolId = getEventSchoolId(eventId);
      return eventSchoolId === schoolId || eventId === 9; // Evento 9 é para todas escolas
    });

    // Selecionar 1-2 eventos aleatórios
    const eventsToSubscribe = [...eligibleEvents]
      .sort(() => Math.random() - 0.5)
      .slice(0, 1 + Math.floor(Math.random() * 2)); // 1-2 eventos

    for (const eventId of eventsToSubscribe) {
      subscriptions.push({
        eventId,
        userId: studentId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  // Inserir todas as inscrições no banco de dados
  for (const subscription of subscriptions) {
    await subscriptionRepository.findOrCreate({
      where: {
        eventId: subscription.eventId,
        userId: subscription.userId
      },
      defaults: subscription
    });
  }
}

// Função auxiliar para obter a escola do evento (baseado no seed de events.ts)
function getEventSchoolId(eventId: number): number {
  const eventSchools: Record<number, number> = {
    1: 1, 2: 1, 3: 1,     // Niterói
    4: 2, 5: 2,           // Copacabana
    6: 3, 7: 3, 8: 3,     // Ipanema
    9: 1, 10: 2           // Eventos futuros (9 é excursão para todas escolas)
  };
  return eventSchools[eventId] || 1;
}

export default seedSubscriptions;