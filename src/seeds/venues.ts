import VenueRepository from "src/repositories/VenueRepository";

const venueRepository = new VenueRepository();

async function seedVenues() {
  const venues = [
    { id: 1, schoolId: 1, name: "Auditório Principal", address: "Bloco A, 1º andar", capacity: 150, isInternal: 1 },
    { id: 2, schoolId: 1, name: "Sala 101", address: "Bloco B, Térreo", capacity: 30, isInternal: 1 },
    { id: 3, schoolId: 1, name: "Quadra Poliesportiva", address: "Área Externa", capacity: 200, isInternal: 0 },
    { id: 4, schoolId: 2, name: "Sala de Reuniões", address: "2º andar, Sala 205", capacity: 20, isInternal: 1 },
    { id: 5, schoolId: 2, name: "Biblioteca", address: "Térreo", capacity: 50, isInternal: 1 },
    { id: 6, schoolId: 3, name: "Teatro", address: "Anfiteatro", capacity: 120, isInternal: 1 },
    { id: 7, schoolId: 3, name: "Laboratório de Informática", address: "Bloco C, Sala 301", capacity: 25, isInternal: 1 },
    { id: 8, schoolId: 3, name: "Jardim Externo", address: "Área Verde", capacity: 80, isInternal: 0 },
    { id: 9, schoolId: 4, name: "Sala Multiuso", address: "1º andar", capacity: 60, isInternal: 1 },
    { id: 10, schoolId: 5, name: "Auditório VIP", address: "Bloco Administrativo", capacity: 100, isInternal: 1 },
    { id: 11, schoolId: 5, name: "Sala de Treinamento", address: "Bloco B, Sala 102", capacity: 40, isInternal: 1 },
    { id: 12, schoolId: 5, name: "Estacionamento Coberto", address: "Subsolo", capacity: 300, isInternal: 0 },
    { id: 13, schoolId: 6, name: "Sala de Conferências", address: "3º andar", capacity: 35, isInternal: 1 },
    { id: 14, schoolId: 6, name: "Cantina", address: "Térreo", capacity: 80, isInternal: 1 },
    { id: 15, schoolId: 7, name: "Auditório", address: "Bloco Principal", capacity: 200, isInternal: 1 },
    { id: 16, schoolId: 7, name: "Sala 201", address: "2º andar", capacity: 30, isInternal: 1 },
    { id: 17, schoolId: 7, name: "Pátio Interno", address: "Área Central", capacity: 150, isInternal: 0 },
    { id: 18, schoolId: 8, name: "Sala de Eventos", address: "1º andar", capacity: 70, isInternal: 1 },
    { id: 19, schoolId: 9, name: "Sala de Projeção", address: "Bloco B", capacity: 50, isInternal: 1 },
    { id: 20, schoolId: 9, name: "Área de Convivência", address: "Térreo", capacity: 100, isInternal: 0 },
    { id: 21, schoolId: 10, name: "Sala de Música", address: "Bloco Artístico", capacity: 25, isInternal: 1 },
    { id: 22, schoolId: 10, name: "Sala de Dança", address: "Bloco Artístico", capacity: 30, isInternal: 1 },
    { id: 23, schoolId: 10, name: "Terraço", address: "Último andar", capacity: 60, isInternal: 0 }
  ];

  for (const venue of venues) {
    await venueRepository.findOrCreate({
      where: { id: venue.id },
      defaults: venue
    });
  }
}

export default seedVenues;