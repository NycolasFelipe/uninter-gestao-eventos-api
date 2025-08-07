import EventRepository from "src/repositories/EventRepository";
import { EventStatus } from "src/models/Event";

const eventRepository = new EventRepository();

async function seedEvents() {
  const events = [
    // Eventos para a escola Niterói (ID: 1)
    {
      id: 1,
      schoolId: 1,
      eventTypeId: 1, // Formatura
      organizerUserId: 1000, // Professor Niterói
      venueId: 1, // Auditório Principal
      name: "Formatura do Ensino Médio 2023",
      description: `# 🎓 Formatura Ensino Médio 2023 🎓

**Um marco inesquecível na vida dos nossos alunos!**

✨ **Detalhes do Evento:**
- Cerimônia de colação de grau das turmas do 3º ano
- Entrega de diplomas e homenagens especiais
- Noite de gala com direito a valsa tradicional
- Fotógrafo profissional para registrar cada momento

📅 **Data:** 15/12/2023  
🕖 **Horário:** 19h às 23h  
📍 **Local:** Auditório Principal da Escola Niterói

💬 *"A educação é a arma mais poderosa que você pode usar para mudar o mundo." - Nelson Mandela*

#Formatura #EnsinoMedio #Sucesso #FuturoBrilhante`,
      objective: "Celebrar a conclusão do ciclo escolar dos alunos",
      targetAudience: "Alunos formandos, familiares e equipe escolar",
      status: EventStatus.Completed,
      isPublic: true,
      startDate: new Date("2023-12-15T19:00:00"),
      endDate: new Date("2023-12-15T23:00:00")
    },
    {
      id: 2,
      schoolId: 1,
      eventTypeId: 4, // Feira de Ciências
      organizerUserId: 1000, // Professor Niterói
      venueId: 3, // Quadra Poliesportiva
      name: "Feira de Ciências Anual",
      description: `# 🔬 Feira de Ciências 2024 - "Inovação e Sustentabilidade" 🌱

**Venha explorar as mentes científicas do futuro!**

Nossa Feira de Ciências deste ano terá como tema central **"Soluções Sustentáveis para o Amanhã"**, onde os alunos apresentarão projetos incríveis desenvolvidos ao longo do semestre.

🌟 **Destaques:**
- Projetos de energia renovável
- Soluções para redução de resíduos
- Tecnologias verdes inovadoras
- Experimentos interativos

🎯 **Programação:**
- 9h: Abertura oficial
- 10h-12h: Apresentação dos projetos (categoria Fundamental II)
- 14h-16h: Apresentação dos projetos (categoria Ensino Médio)
- 16h30: Premiação dos melhores projetos

📸 **Não perca:** Área especial para fotos com os projetos mais criativos!

#FeiraDeCiências #Inovação #Sustentabilidade #EducaçãoSTEM`,
      objective: "Promover a investigação científica entre os alunos",
      targetAudience: "Comunidade escolar e visitantes",
      status: EventStatus.Published,
      isPublic: true,
      startDate: new Date("2024-05-20T09:00:00"),
      endDate: new Date("2024-05-20T17:00:00")
    },
    {
      id: 3,
      schoolId: 1,
      eventTypeId: 5, // Evento Cultural
      organizerUserId: 1001, // Coordenador Niterói
      venueId: 2, // Sala 101
      name: "Sarau Literário",
      description: `# 📚 Sarau Literário "Palavras que Encantam" ✨

**Uma noite para celebrar a arte da palavra!**

Nossa escola abre suas portas para uma noite mágica de poesia, música e expressão artística. Alunos, professores e convidados especiais compartilharão suas criações literárias em um ambiente acolhedor e inspirador.

🎭 **Atrações confirmadas:**
- Recital de poesias autorais
- Performances teatrais baseadas em obras literárias
- Intervenções musicais com canções de protesto
- Exposição de livros artesanais

☕ **Será servido:**
- Café literário com quitutes temáticos
- Bebidas especiais batizadas com nomes de autores famosos

📖 **Traga seu poema favorito para compartilhar no microfone aberto!**

*"A literatura é a expressão da sociedade, como a palavra é a expressão do homem." - Louis de Bonald*

#SarauLiterário #Cultura #Arte #Literatura`,
      objective: "Incentivar a expressão artística dos alunos",
      targetAudience: "Alunos, professores e comunidade",
      status: EventStatus.Planned,
      isPublic: true,
      startDate: new Date("2024-06-10T18:00:00"),
      endDate: new Date("2024-06-10T21:00:00")
    },

    // Eventos para a escola Copacabana (ID: 2)
    {
      id: 4,
      schoolId: 2,
      eventTypeId: 3, // Competição Esportiva
      organizerUserId: 1003, // Professor Copacabana
      venueId: 5, // Biblioteca
      name: "Torneio de Xadrez",
      description: `# ♟️ Torneio de Xadrez Interclasses 2024 🏆

**Estratégia, concentração e muito aprendizado!**

A 5ª edição do nosso tradicional torneio de xadrez promete emocionantes partidas entre os melhores enxadristas da escola. 

📌 **Informações:**
- Sistema suíço com 5 rodadas
- Tempo de reflexão: 15 minutos por jogador
- Categorias: Iniciante (6º-7º ano), Intermediário (8º-9º ano) e Avançado (Ensino Médio)

🏅 **Premiações:**
- Troféu para o 1º lugar de cada categoria
- Medalhas para os 3 primeiros colocados
- Certificado de participação para todos

👑 **Destaque:** O campeão absoluto ganhará uma vaga para representar a escola no Campeonato Municipal!

🧠 *"O xadrez é um mar no qual um mosquito pode beber e um elefante pode banhar-se." - Provérbio Indiano*

#Xadrez #EsporteMental #CompetiçãoSaudável`,
      objective: "Promover o raciocínio lógico e a concentração",
      targetAudience: "Alunos do 6º ano ao Ensino Médio",
      status: EventStatus.Ongoing,
      isPublic: true,
      startDate: new Date("2024-04-01T14:00:00"),
      endDate: new Date("2024-04-05T18:00:00")
    },
    {
      id: 5,
      schoolId: 2,
      eventTypeId: 6, // Palestra Educativa
      organizerUserId: 1004, // Coordenador Copacabana
      venueId: 4, // Sala de Reuniões
      name: "Palestra sobre Saúde Mental",
      description: `# 🧠 "Mente Saudável, Vida Plena" - Palestra sobre Saúde Mental 💙

**Um diálogo necessário com nossa comunidade escolar!**

Em parceria com o Instituto de Psicologia, trazemos a renomada Dra. Ana Beatriz Silva para uma conversa franca e acolhedora sobre os desafios da saúde mental na adolescência.

🔍 **Tópicos abordados:**
- Identificação de sinais de ansiedade e depressão
- Estratégias de autocuidado emocional
- A importância da rede de apoio
- Como buscar ajuda profissional

🎯 **Para quem é?**
- Alunos do 9º ano e Ensino Médio
- Professores e funcionários
- Pais e responsáveis (últimos 30 minutos)

📢 **Material gratuito:** Todos os participantes receberão um guia com recursos de saúde mental e contatos úteis.

*"Não há saúde sem saúde mental." - Organização Mundial da Saúde*

#SaúdeMental #BemEstar #EscolaQueAcolhe`,
      objective: "Conscientizar sobre a importância da saúde mental",
      targetAudience: "Alunos do 9º ano e Ensino Médio",
      status: EventStatus.Published,
      isPublic: false,
      startDate: new Date("2024-05-15T10:00:00"),
      endDate: new Date("2024-05-15T12:00:00")
    },

    // Eventos para a escola Ipanema (ID: 3)
    {
      id: 6,
      schoolId: 3,
      eventTypeId: 9, // Semana Literária
      organizerUserId: 1006, // Professor Ipanema
      venueId: 6, // Teatro
      name: "Semana da Literatura Brasileira",
      description: `# 📖 Semana da Literatura Brasileira 2024 🇧🇷

**Uma imersão na riqueza da nossa literatura!**

De 22 a 26 de julho, transformaremos nossa escola em um verdadeiro celeiro cultural, celebrando autores brasileiros desde os clássicos até os contemporâneos.

🎭 **Programação diária:**
- **Manhã:** Oficinas de criação literária
- **Tarde:** Encontros com autores convidados
- **Noite:** Saraus temáticos (MPB, Cordel, etc.)

✍️ **Atividades especiais:**
- Concurso de microcontos com premiação
- Feira de troca de livros
- Exposição "Linha do Tempo da Literatura Brasileira"
- Dramatizações de obras famosas

🖋️ **Autor convidado:** Marcelino Freire, premiado contista brasileiro, ministrará uma oficina exclusiva!

*"A literatura é o sonho acordado das civilizações." - Alberto Manguel*

#LiteraturaBrasileira #Cultura #Leitura`,
      objective: "Promover o gosto pela leitura e conhecer autores brasileiros",
      targetAudience: "Todos os alunos e professores",
      status: EventStatus.Planned,
      isPublic: true,
      startDate: new Date("2024-07-22T08:00:00"),
      endDate: new Date("2024-07-26T18:00:00")
    },
    {
      id: 7,
      schoolId: 3,
      eventTypeId: 2, // Evento de Caridade
      organizerUserId: 1007, // Coordenador Ipanema
      venueId: 8, // Jardim Externo
      name: "Bazar Beneficente",
      description: `# 🛍️ Bazar Beneficente "Solidariedade que Transforma" ❤️

**Seu consumo vira doação!**

Todo o valor arrecadado será destinado ao Instituto Sorriso de Criança, que apoia famílias em situação de vulnerabilidade social.

🛒 **O que você encontra:**
- Roupas e acessórios em ótimo estado
- Livros usados a preços simbólicos
- Artesanato feito pelos alunos
- Doces e salgados caseiros

🎉 **Atrações:**
- 10h: Apresentação do coral infantil
- 14h: Oficina de customização gratuita
- Durante todo o dia: Sorteio de cestas básicas

🤝 **Como ajudar?**
- Doe itens em bom estado na secretaria até 08/08
- Voluntarie-se para ajudar no evento
- Divulgue para seus amigos e familiares

*"A solidariedade é o sentimento que melhor expressa o respeito pela dignidade humana." - Franz Kafka*

#BazarBeneficente #Solidariedade #FazerOBem`,
      objective: "Arrecadar fundos para ajudar crianças carentes",
      targetAudience: "Comunidade escolar e público externo",
      status: EventStatus.Draft,
      isPublic: true,
      startDate: new Date("2024-08-10T09:00:00"),
      endDate: new Date("2024-08-10T16:00:00")
    },
    {
      id: 8,
      schoolId: 3,
      eventTypeId: 7, // Olimpíada do Conhecimento
      organizerUserId: 1008, // Diretor Ipanema
      venueId: 7, // Laboratório de Informática
      name: "Olimpíada de Matemática",
      description: `# 🧮 Olimpíada de Matemática - Edição 2024 🏅

**Desafiando mentes brilhantes!**

Uma competição saudável para estimular o raciocínio lógico e o amor pela matemática. As provas serão elaboradas pela equipe de professores seguindo os moldes da OBMEP.

📝 **Estrutura da prova:**
- Fase única com 20 questões
- Níveis: N1 (6º-7º ano), N2 (8º-9º ano)
- Conteúdos: Aritmética, Geometria, Combinatória e Lógica

💡 **Preparação:**
- Aulas extras às quartas-feiras (15h-17h)
- Material de estudo disponível na biblioteca
- Simulados online na plataforma da escola

🏆 **Os 3 primeiros colocados de cada nível receberão:**
- Bolsa de estudos para curso de matemática avançada
- Medalhas de ouro, prata e bronze
- Vaga no time que representará a escola nas competições regionais

🔢 *"A matemática é a música da razão." - James Joseph Sylvester*

#OlimpíadaDeMatemática #Desafio #Aprendizado`,
      objective: "Estimular o estudo da matemática e identificar talentos",
      targetAudience: "Alunos do 6º ao 9º ano",
      status: EventStatus.Published,
      isPublic: false,
      startDate: new Date("2024-06-05T13:00:00"),
      endDate: new Date("2024-06-05T17:00:00")
    },

    // Evento futuro para todas as escolas
    {
      id: 9,
      schoolId: 1, // Niterói
      eventTypeId: 8, // Excursão Escolar
      organizerUserId: 1002, // Diretor Niterói
      venueId: 3, // Quadra Poliesportiva (ponto de encontro)
      name: "Excursão ao Museu do Amanhã",
      description: `# 🚀 Excursão Educativa: Museu do Amanhã 🌎

**Uma jornada pelo futuro da humanidade e do nosso planeta!**

Nossos alunos terão a oportunidade de vivenciar uma experiência única no icônico Museu do Amanhã, no Rio de Janeiro, com curadoria especial para grupos escolares.

📌 **Roteiro do dia:**
- 7h: Saída da escola (lanche incluso)
- 10h: Chegada ao museu e início da visita guiada
- 12h30: Almoço no Espaço Porto (opções variadas)
- 14h: Atividade interativa "O Amanhã que Queremos"
- 16h: Retorno à escola

🎯 **Objetivos pedagógicos:**
- Refletir sobre sustentabilidade e futuro do planeta
- Conhecer aplicações práticas da ciência moderna
- Integrar conhecimentos de diversas disciplinas

💰 **Investimento:** R$ 85,00 (inclui transporte, entrada e lanche)
📅 **Inscrições até:** 05/09/2024 (vagas limitadas!)

*"O futuro não é algo que simplesmente acontece. Ele é criado." - Augusto Cury*

#ExcursãoEscolar #AprendizadoForaDaSala #MuseuDoAmanhã`,
      objective: "Ampliar o conhecimento científico dos alunos",
      targetAudience: "Alunos do 8º e 9º anos",
      status: EventStatus.Planned,
      isPublic: false,
      startDate: new Date("2024-09-12T07:00:00"),
      endDate: new Date("2024-09-12T18:00:00")
    },
    {
      id: 10,
      schoolId: 2, // Copacabana
      eventTypeId: 10, // Simulado
      organizerUserId: 1005, // Diretor Copacabana
      venueId: 4, // Sala de Reuniões
      name: "Simulado ENEM",
      description: `# ✍️ Simulado ENEM 2024 - Preparação para o Futuro 🎯

**O treino que faz a diferença na hora da prova!**

Nosso simulado seguirá rigorosamente o formato do ENEM, proporcionando aos alunos uma experiência realista da prova que pode definir seu futuro acadêmico.

📚 **Estrutura:**
- **Dia 1 (20/08):** Linguagens, Códigos, Redação e Ciências Humanas
- **Dia 2 (21/08):** Ciências da Natureza e Matemática
- **Redação:** Correção por professores especializados

📊 **Benefícios:**
- Relatório personalizado de desempenho
- Análise de probabilidade de aprovação por curso
- Plantão de dúvidas pós-prova

🏆 **Incentivos:**
- Melhor redação: Curso de escrita criativa
- Melhor desempenho geral: Bolsa para cursinho preparatório

⏰ **Importante:** Chegar com 1h de antecedência - portões fecham pontualmente!

#SimuladoENEM #Preparação #FocoNoFuturo`,
      objective: "Preparar os alunos para o exame do ENEM",
      targetAudience: "Alunos do Ensino Médio",
      status: EventStatus.Published,
      isPublic: false,
      startDate: new Date("2024-08-20T08:00:00"),
      endDate: new Date("2024-08-21T13:00:00")
    }
  ];

  for (const event of events) {
    await eventRepository.findOrCreate({
      where: { id: event.id },
      defaults: event
    });
  }
}

export default seedEvents;