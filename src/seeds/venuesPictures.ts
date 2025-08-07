import VenuePictureRepository from "src/repositories/VenuePictureRepository";

const venuePictureRepository = new VenuePictureRepository();

async function seedVenuePictures() {
  const venuePictures = [
    // Auditório
    { id: 1, venueId: 1, pictureUrl: "https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, venueId: 1, pictureUrl: "https://plus.unsplash.com/premium_photo-1679547202918-bf37285d3caf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, venueId: 1, pictureUrl: "https://plus.unsplash.com/premium_photo-1679547202606-4d905471107f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Sala de aula
    { id: 4, venueId: 2, pictureUrl: "https://images.unsplash.com/photo-1752579664702-e6609516e21a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, venueId: 2, pictureUrl: "https://plus.unsplash.com/premium_photo-1680807869780-e0876a6f3cd5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, venueId: 2, pictureUrl: "https://images.unsplash.com/photo-1496681859237-6039cd585c4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Quadra Poliesportiva
    { id: 7, venueId: 3, pictureUrl: "https://plus.unsplash.com/premium_photo-1663039984787-b11d7240f592?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, venueId: 3, pictureUrl: "https://plus.unsplash.com/premium_photo-1749494938087-94fa511eecd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 9, venueId: 3, pictureUrl: "https://plus.unsplash.com/premium_photo-1733342490554-4bcb4c60631e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Sala de reuniões
    { id: 10, venueId: 4, pictureUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 11, venueId: 4, pictureUrl: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 12, venueId: 4, pictureUrl: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Biblioteca
    { id: 13, venueId: 5, pictureUrl: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 14, venueId: 5, pictureUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 15, venueId: 5, pictureUrl: "https://plus.unsplash.com/premium_photo-1703701579660-8481915a7991?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Teatro
    { id: 16, venueId: 6, pictureUrl: "https://images.unsplash.com/photo-1613210434051-4b00d62d03fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 17, venueId: 6, pictureUrl: "https://images.unsplash.com/photo-1577179269430-7d2dd258b31f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 18, venueId: 6, pictureUrl: "https://plus.unsplash.com/premium_photo-1683219367985-b59ec6e32e5b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Laboratório de Informática
    { id: 19, venueId: 7, pictureUrl: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 20, venueId: 7, pictureUrl: "https://images.unsplash.com/photo-1707386320395-6a163624aab6?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 21, venueId: 7, pictureUrl: "https://images.unsplash.com/photo-1586534313131-8b27a31f9894?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    // Jardim Externo
    { id: 22, venueId: 8, pictureUrl: "https://plus.unsplash.com/premium_photo-1675039871605-eb156cc0575d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 23, venueId: 8, pictureUrl: "https://images.unsplash.com/photo-1668120089623-4e658a40987b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 24, venueId: 8, pictureUrl: "https://images.unsplash.com/photo-1630441466350-d053acf63b22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]

  for (const venuePicture of venuePictures) {
    await venuePictureRepository.findOrCreate({
      where: { id: venuePicture.id },
      defaults: venuePicture
    });
  }
}

export default seedVenuePictures;