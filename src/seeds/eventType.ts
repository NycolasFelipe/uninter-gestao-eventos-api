import EventTypeRepository from "src/repositories/EventTypeRepository";

const eventTypeRepository = new EventTypeRepository();

async function seedEventTypes() {
  const eventTypes = [
    {
      id: 1,
      name: "Formatura",
      description: "Cerimônia de conclusão de curso ou ano letivo"
    },
    {
      id: 2,
      name: "Evento de Caridade",
      description: "Evento para arrecadação de fundos ou doações para causas sociais"
    },
    {
      id: 3,
      name: "Competição Esportiva",
      description: "Torneios ou jogos entre turmas ou escolas"
    },
    {
      id: 4,
      name: "Feira de Ciências",
      description: "Exposição de projetos científicos dos alunos"
    },
    {
      id: 5,
      name: "Evento Cultural",
      description: "Apresentação de trabalhos artísticos e culturais"
    },
    {
      id: 6,
      name: "Palestra Educativa",
      description: "Palestras sobre diversos temas relevantes para a comunidade escolar"
    },
    {
      id: 7,
      name: "Olimpíada do Conhecimento",
      description: "Competições acadêmicas entre alunos"
    },
    {
      id: 8,
      name: "Excursão Escolar",
      description: "Passeios educativos fora do ambiente escolar"
    },
    {
      id: 9,
      name: "Semana Literária",
      description: "Evento dedicado à promoção da leitura e literatura"
    },
    {
      id: 10,
      name: "Simulado",
      description: "Aplicação de provas simuladas para preparação dos alunos"
    }
  ];

  for (const eventType of eventTypes) {
    await eventTypeRepository.findOrCreate({
      where: { id: eventType.id },
      defaults: eventType
    });
  }
}

export default seedEventTypes;