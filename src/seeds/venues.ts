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
  ];

  for (const venue of venues) {
    await venueRepository.findOrCreate({
      where: { id: venue.id },
      defaults: venue
    });
  }
}

export default seedVenues;