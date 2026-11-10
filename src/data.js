/* ============================================================
   SALA DE LA MEMORIA NACIONAL · Datos
   ------------------------------------------------------------
   Para añadir a alguien: copia un bloque de PEOPLE, cambia sus
   campos y listo. La sala se reconstruye sola.

   IMÁGENES: cada persona tiene su retrato en src/assets/heroes/<id>.svg.
   Para usar una foto real guarda  src/assets/heroes/<id>.jpg  (o .png,
   .webp); se detecta sola y se muestra sobre el retrato ilustrado.

   campos:
     tipo    "martir" | "influencia"
     era     1 a 5 (ver ERAS)
     figura  "hombre" | "mujer" | "trio" | "dos" | "mascara"
     acc     "sombrero" | "plumas" | "boina" | "cuello" | null
     hue     0-360, color del retrato
   ============================================================ */
const SALA = {

  ERAS: [
    { id: 1, nombre: "Pueblos originarios y Colonia", rango: "hasta 1821" },
    { id: 2, nombre: "República y Revolución Liberal", rango: "1821 – 1909" },
    { id: 3, nombre: "Intervención y Sandino", rango: "1909 – 1934" },
    { id: 4, nombre: "Dinastía y lucha", rango: "1934 – 1979" },
    { id: 5, nombre: "Nicaragua contemporánea", rango: "desde 1979" }
  ],

  PEOPLE: [

    /* ---------------------------- MÁRTIRES ---------------------------- */

    {
      id: "benjamin-zeledon", tipo: "martir", era: 3, hue: 218,
      nombre: "Benjamín Zeledón", corto: "Zeledón",
      anios: "1879 – 1912", rol: "General de la soberanía nacional",
      figura: "hombre", acc: null,
      resumen: "El general liberal que se alzó contra la intervención extranjera y cayó en Catarina el 4 de octubre de 1912.",
      bio: [
        "Abogado y militar liberal, Benjamín Zeledón fue uno de los jefes de la rebelión de 1912 contra el gobierno de Adolfo Díaz, sostenido por la intervención militar de Estados Unidos. Al frente de sus tropas defendió Masaya y los cerros Coyotepe y La Barranca, hasta que fueron tomados por fuerzas del gobierno y marines estadounidenses.",
        "Murió el 4 de octubre de 1912 en Catarina, el mismo día en que cumplía 33 años. La tradición cuenta que un joven Augusto C. Sandino vio pasar su cuerpo por Niquinohomo; Sandino lo reconoció siempre como ejemplo de dignidad frente al invasor."
      ],
      datos: [
        ["Cayó", "4 de octubre de 1912, Catarina"],
        ["Defendió", "Masaya, Coyotepe y La Barranca"],
        ["Contra", "La intervención de Estados Unidos"]
      ]
    },

    {
      id: "augusto-sandino", tipo: "martir", era: 3, hue: 30,
      nombre: "Augusto C. Sandino", corto: "Sandino",
      anios: "1895 – 1934", rol: "General de Hombres Libres",
      figura: "hombre", acc: "sombrero",
      resumen: "Defendió la soberanía nacional con las armas frente a la ocupación de los marines (1927 – 1933).",
      bio: [
        "Nacido en Niquinohomo el 18 de mayo de 1895, Augusto C. Sandino trabajó como obrero en Honduras, Guatemala y México antes de volver a Nicaragua. En 1927 se alzó en armas, rechazó el Pacto del Espino Negro y organizó el Ejército Defensor de la Soberanía Nacional en las montañas de las Segovias, enfrentando a los marines hasta su retirada en enero de 1933.",
        "El 21 de febrero de 1934, tras una cena con el presidente Juan Bautista Sacasa en Managua, fue detenido y asesinado por oficiales de la Guardia Nacional bajo las órdenes de Anastasio Somoza García. Su nombre inspiró a las generaciones que luego fundaron el Frente Sandinista."
      ],
      datos: [
        ["Lema", "Patria y Libertad"],
        ["Lucha", "1927 – 1933, contra la ocupación"],
        ["Asesinado", "21 de febrero de 1934, Managua"]
      ],
      frase: { t: "La soberanía de un pueblo no se discute, se defiende con las armas en la mano.", a: "Augusto C. Sandino" }
    },

    {
      id: "rigoberto-lopez-perez", tipo: "martir", era: 4, hue: 352,
      nombre: "Rigoberto López Pérez", corto: "Rigoberto",
      anios: "1929 – 1956", rol: "Poeta que enfrentó a la dictadura",
      figura: "hombre", acc: null,
      resumen: "El joven poeta que, el 21 de septiembre de 1956, disparó contra el dictador Anastasio Somoza García.",
      bio: [
        "Poeta nacido en León el 13 de marzo de 1929, Rigoberto López Pérez decidió enfrentar en persona a una dictadura que llevaba dos décadas en el poder y había cerrado todos los caminos cívicos.",
        "El 21 de septiembre de 1956, durante un baile en la Casa del Obrero de León, disparó contra Somoza García y fue abatido en el acto por su escolta. El dictador murió ocho días después, el 29 de septiembre, en un hospital de la Zona del Canal de Panamá. Su gesto se volvió un símbolo para quienes continuaron la lucha."
      ],
      datos: [
        ["Nació", "León, 13 de marzo de 1929"],
        ["Acción", "21 de septiembre de 1956, León"],
        ["Efecto", "Somoza García murió el 29 de septiembre"]
      ]
    },

    {
      id: "carlos-fonseca", tipo: "martir", era: 4, hue: 8,
      nombre: "Carlos Fonseca Amador", corto: "Fonseca",
      anios: "1936 – 1976", rol: "Fundador del Frente Sandinista",
      figura: "hombre", acc: null,
      resumen: "Rescató el pensamiento de Sandino, fundó el FSLN en 1961 y cayó en combate en Zinica en 1976.",
      bio: [
        "Nacido en Matagalpa el 23 de junio de 1936, Carlos Fonseca estudió en León y se formó como dirigente político y escritor. En 1961 fundó, junto a Tomás Borge y Silvio Mayorga, el Frente de Liberación Nacional, que poco después añadiría el nombre de Sandino. Fue encarcelado y desterrado varias veces, y escribió para dar a conocer el ideario sandinista.",
        "El 8 de noviembre de 1976, de regreso a las montañas, cayó en combate contra la Guardia Nacional en Zinica, Matagalpa. Es considerado el principal ideólogo y fundador del movimiento que derrocó la dictadura en 1979."
      ],
      datos: [
        ["Fundó", "El FSLN, en 1961"],
        ["Caído", "8 de noviembre de 1976, Zinica"],
        ["Escribió", "Un nicaragüense en Moscú (1957)"]
      ]
    },

    {
      id: "pedro-joaquin-chamorro", tipo: "martir", era: 4, hue: 205,
      nombre: "Pedro Joaquín Chamorro", corto: "P. J. Chamorro",
      anios: "1924 – 1978", rol: "Periodista, director de La Prensa",
      figura: "hombre", acc: null,
      resumen: "Su pluma desafió a la dictadura durante décadas; su asesinato en 1978 encendió la insurrección.",
      bio: [
        "Director del diario La Prensa, Pedro Joaquín Chamorro Cardenal denunció sin descanso los abusos de la dinastía Somoza. Fue encarcelado y desterrado, participó en intentos de derrocar al régimen y más tarde apostó por la oposición cívica, fundando en 1974 la Unión Democrática de Liberación (UDEL).",
        "El 10 de enero de 1978 fue asesinado a tiros en Managua cuando se dirigía a su trabajo. Su muerte provocó indignación nacional: hubo disturbios, una huelga general y comenzó la etapa final de la lucha contra el régimen."
      ],
      datos: [
        ["Medio", "Diario La Prensa"],
        ["Fundó", "La UDEL, en 1974"],
        ["Asesinado", "10 de enero de 1978, Managua"]
      ]
    },

    {
      id: "leonel-rugama", tipo: "martir", era: 4, hue: 45,
      nombre: "Leonel Rugama", corto: "Rugama",
      anios: "1949 – 1970", rol: "Poeta y guerrillero",
      figura: "hombre", acc: null,
      resumen: "Poeta de 20 años que murió combatiendo en Managua el 15 de enero de 1970.",
      bio: [
        "Joven poeta de familia humilde, Leonel Rugama se formó en un seminario antes de unirse al Frente Sandinista, donde combinó la escritura con la lucha clandestina. Su poema «La tierra es un satélite de la luna» se hizo célebre por su mirada sobre la pobreza y la justicia.",
        "El 15 de enero de 1970 fue rodeado por la Guardia Nacional en una casa del barrio Riguero, en Managua, junto a otros dos compañeros. Cuando le exigieron rendirse, cuenta la tradición que respondió la frase que quedó en la historia. Murió a los 20 años."
      ],
      datos: [
        ["Murió", "15 de enero de 1970, Managua"],
        ["Edad", "20 años"],
        ["Poema célebre", "La tierra es un satélite de la luna"]
      ],
      frase: { t: "¡Que se rinda tu madre!", a: "Leonel Rugama, según la tradición" }
    },

    {
      id: "julio-buitrago", tipo: "martir", era: 4, hue: 160,
      nombre: "Julio Buitrago", corto: "Buitrago",
      anios: "† 1969", rol: "Jefe de la guerrilla urbana",
      figura: "hombre", acc: null,
      resumen: "Resistió casi solo, durante horas, el cerco de la Guardia Nacional en Managua el 15 de julio de 1969.",
      bio: [
        "Julio Buitrago fue uno de los principales jefes de la guerrilla urbana del Frente Sandinista a finales de los años sesenta. Organizaba acciones y casas de seguridad en Managua, en pleno corazón del régimen.",
        "El 15 de julio de 1969 la Guardia Nacional descubrió su refugio en el barrio Altagracia y lo cercó con una fuerza muy superior. Buitrago resistió casi solo durante horas hasta morir en combate. Su batalla marcó a toda una generación de jóvenes que se sumaron a la lucha."
      ],
      datos: [
        ["Cayó", "15 de julio de 1969, Managua"],
        ["Lugar", "Barrio Altagracia"],
        ["Rol", "Jefe de la guerrilla urbana"]
      ]
    },

    {
      id: "luisa-amanda-espinoza", tipo: "martir", era: 4, hue: 320,
      nombre: "Luisa Amanda Espinoza", corto: "L. A. Espinoza",
      anios: "† 1970", rol: "Primera mujer sandinista caída en combate",
      figura: "mujer", acc: null,
      resumen: "Combatiente del FSLN cuyo nombre lleva hoy la organización de mujeres nicaragüenses.",
      bio: [
        "Luisa Amanda Espinoza fue una joven combatiente del Frente Sandinista que se incorporó a la lucha clandestina en un tiempo en que casi todos los mandos eran hombres. En 1970 murió a manos de la Guardia Nacional y quedó como la primera mujer sandinista caída en combate.",
        "Tras el triunfo de 1979, la organización de mujeres que había nacido en la lucha contra la dictadura adoptó su nombre: Asociación de Mujeres Nicaragüenses Luisa Amanda Espinoza (AMNLAE)."
      ],
      datos: [
        ["Año", "1970"],
        ["Distinción", "Primera mujer sandinista caída en combate"],
        ["Legado", "AMNLAE lleva su nombre"]
      ]
    },

    {
      id: "gaspar-garcia-laviana", tipo: "martir", era: 4, hue: 100,
      nombre: "Gaspar García Laviana", corto: "García Laviana",
      anios: "1941 – 1978", rol: "Sacerdote y comandante guerrillero",
      figura: "hombre", acc: "cuello",
      resumen: "Cura asturiano que se unió a la lucha del pueblo y cayó como combatiente del Frente Sur en 1978.",
      bio: [
        "Nacido en Asturias, España, en 1941, Gaspar García Laviana llegó a Nicaragua como misionero y fue párroco de Tola, en Rivas. Convivió con los campesinos del sur y fue testigo de la injusticia y la represión que sufrían.",
        "En 1974 se incorporó al Frente Sandinista y llegó a ser comandante en el Frente Sur. Escribió poemas y cantos. Cayó en combate el 11 de diciembre de 1978, siete meses antes del triunfo revolucionario: un mártir nicaragüense por elección."
      ],
      datos: [
        ["Nació", "Asturias, España, 1941"],
        ["Parroquia", "Tola, Rivas"],
        ["Cayó", "11 de diciembre de 1978"]
      ]
    },

    {
      id: "estudiantes-1959", tipo: "martir", era: 4, hue: 280,
      nombre: "Los estudiantes de León", corto: "León 1959",
      anios: "23 de julio de 1959", rol: "Mártires estudiantiles",
      figura: "trio", acc: null,
      resumen: "Jóvenes que protestaron contra la dictadura y fueron baleados por la Guardia Nacional en León.",
      bio: [
        "El 23 de julio de 1959, estudiantes de León salieron a la calle para protestar contra la represión de la dictadura somocista. La Guardia Nacional disparó contra la manifestación: varios jóvenes murieron y decenas más resultaron heridos.",
        "La matanza reforzó el papel del movimiento estudiantil en la lucha contra el régimen. Desde entonces, el estudiantado fue una de las fuerzas más activas y valientes de la oposición."
      ],
      datos: [
        ["Fecha", "23 de julio de 1959"],
        ["Lugar", "León"],
        ["Responsable", "La Guardia Nacional"]
      ]
    },

    {
      id: "masacre-1967", tipo: "martir", era: 4, hue: 190,
      nombre: "Mártires del 22 de enero", corto: "22 enero 1967",
      anios: "22 de enero de 1967", rol: "Masacre de la oposición cívica",
      figura: "trio", acc: null,
      resumen: "Manifestantes de la oposición reprimidos a balazos en Managua cuando marchaban contra el fraude.",
      bio: [
        "El 22 de enero de 1967, miles de personas marcharon en Managua convocadas por la Unión Nacional Opositora (UNO), que denunciaba el fraude preparado para las elecciones de ese año. Al llegar al centro de la ciudad, la Guardia Nacional abrió fuego contra la multitud.",
        "Las cifras de víctimas varían según las fuentes, pero hubo decenas de muertos y heridos. La masacre mostró el costo de la protesta cívica bajo la dictadura y quedó grabada en la memoria de la oposición."
      ],
      datos: [
        ["Convocó", "Unión Nacional Opositora (UNO)"],
        ["Lugar", "Managua"],
        ["Víctimas", "Decenas (las cifras varían)"]
      ]
    },

    /* --------------------------- INFLUENCIAS --------------------------- */

    {
      id: "nicarao", tipo: "influencia", era: 1, hue: 42,
      nombre: "Cacique Nicarao", corto: "Nicarao",
      anios: "siglo XVI", rol: "Cacique del pueblo nicarao",
      figura: "hombre", acc: "plumas",
      resumen: "Su encuentro con Gil González Dávila, en 1522, dio origen al nombre de Nicaragua.",
      bio: [
        "Nicarao fue el cacique de los nicaraos, un pueblo de lengua náhuatl asentado en el istmo de Rivas, entre el Gran Lago y el océano Pacífico. En 1522 recibió al capitán español Gil González Dávila, con quien sostuvo el célebre diálogo sobre creencias, costumbres y sentido de la vida.",
        "Según la explicación más difundida, de su nombre unido a la palabra «agua», por los lagos de la región, nació el nombre de nuestro país: Nicaragua. Su figura simboliza la sabiduría y la dignidad de los pueblos originarios."
      ],
      datos: [
        ["Encuentro", "1522, con Gil González Dávila"],
        ["Región", "Istmo de Rivas"],
        ["Legado", "Origen del nombre «Nicaragua»"]
      ]
    },

    {
      id: "diriangen", tipo: "influencia", era: 1, hue: 18,
      nombre: "Cacique Diriangén", corto: "Diriangén",
      anios: "siglo XVI", rol: "Líder de la resistencia indígena",
      figura: "hombre", acc: "plumas",
      resumen: "Plantó cara a los conquistadores españoles en 1523 y se volvió símbolo de la resistencia.",
      bio: [
        "Diriangén fue un cacique de los dirianes, pueblo del Pacífico sur de Nicaragua. Tras la visita de Gil González Dávila en 1522, volvió en 1523 al frente de numerosos guerreros para enfrentar a los españoles, en uno de los primeros episodios de resistencia armada a la conquista.",
        "Las armas y los caballos de los conquistadores terminaron por obligarlo a retirarse, pero su valentía quedó como símbolo de la dignidad indígena. Su nombre lo llevan hoy escuelas, calles y condecoraciones en todo el país."
      ],
      datos: [
        ["Pueblo", "Dirianes, Pacífico sur"],
        ["Hecho", "Resistencia armada, 1523"],
        ["Símbolo", "Resistencia indígena"]
      ]
    },

    {
      id: "rafaela-herrera", tipo: "influencia", era: 1, hue: 335,
      nombre: "Rafaela Herrera", corto: "R. Herrera",
      anios: "Defensa de 1762", rol: "Heroína del Castillo de la Inmaculada",
      figura: "mujer", acc: null,
      resumen: "Muy joven aún, tomó el mando del Castillo de la Inmaculada Concepción y rechazó a los invasores ingleses.",
      bio: [
        "En julio de 1762 una flota inglesa remontó el río San Juan y sitió el Castillo de la Inmaculada Concepción. Al morir su padre, el castellano José Herrera, Rafaela asumió el mando de la fortaleza, con alrededor de 19 años.",
        "Organizó la defensa, dirigió el fuego de la artillería y, según la tradición, logró que los atacantes se retiraran. Su hazaña la convirtió en un símbolo del coraje de las mujeres nicaragüenses."
      ],
      datos: [
        ["Fecha", "Julio de 1762"],
        ["Lugar", "Castillo de la Inmaculada, río San Juan"],
        ["Edad", "Alrededor de 19 años"]
      ]
    },

    {
      id: "el-gueguense", tipo: "influencia", era: 1, hue: 12,
      nombre: "El Güegüense", corto: "Güegüense",
      anios: "Tradición colonial", rol: "Obra maestra del patrimonio oral",
      figura: "mascara", acc: null,
      resumen: "Teatro, danza y música mestiza donde un viejo astuto burla con ingenio a las autoridades coloniales.",
      bio: [
        "El Güegüense o Macho Ratón nació en la época colonial y mezcla teatro, danza y música con textos en náhuatl y español. Su protagonista es un anciano comerciante, ingenioso y burlón, que se ríe de los funcionarios españoles sin que puedan atraparlo.",
        "Se representa cada enero en las fiestas de San Sebastián, en Diriamba. Es una muestra del humor, la resistencia cultural y el mestizaje de Nicaragua, y en 2005 la UNESCO lo proclamó Obra Maestra del Patrimonio Oral e Intangible de la Humanidad."
      ],
      datos: [
        ["Reconocimiento", "UNESCO, 2005"],
        ["Se representa", "San Sebastián, Diriamba (enero)"],
        ["Lenguas", "Náhuatl y español"]
      ]
    },

    {
      id: "miguel-larreynaga", tipo: "influencia", era: 2, hue: 255,
      nombre: "Miguel Larreynaga", corto: "Larreynaga",
      anios: "1772 – 1847", rol: "Jurista y humanista",
      figura: "hombre", acc: null,
      resumen: "Ilustrado leonés, firmante del Acta de Independencia de Centroamérica en 1821.",
      bio: [
        "Nacido en León en 1772, Miguel Larreynaga fue jurista, escritor y político, una de las mentes más brillantes de la Nicaragua de su tiempo. Impulsó la educación y las ideas de la Ilustración en una sociedad todavía colonial.",
        "Fue uno de los firmantes del Acta de Independencia de Centroamérica el 15 de septiembre de 1821. Murió en 1847, dejando un ejemplo de servicio público basado en el estudio y la razón."
      ],
      datos: [
        ["Nació", "León, 1772"],
        ["Firmó", "Acta de Independencia, 1821"],
        ["Falleció", "1847"]
      ]
    },

    {
      id: "san-jacinto", tipo: "influencia", era: 2, hue: 140,
      nombre: "Héroes de San Jacinto", corto: "San Jacinto",
      anios: "14 de septiembre de 1856", rol: "José Dolores Estrada y Andrés Castro",
      figura: "dos", acc: "sombrero",
      resumen: "El ejército nicaragüense derrotó a los filibusteros de William Walker en la hacienda San Jacinto.",
      bio: [
        "El 14 de septiembre de 1856, en la hacienda San Jacinto, cerca de Tipitapa, el ejército nicaragüense al mando del coronel José Dolores Estrada derrotó a los filibusteros de William Walker, un aventurero estadounidense que se había hecho proclamar presidente.",
        "Según la tradición, en pleno combate el soldado Andrés Castro, sin municiones, derribó a pedradas a un enemigo. La victoria fue clave para expulsar al filibusterismo: Walker se rindió en Rivas en 1857. Cada 14 de septiembre es fiesta patria."
      ],
      datos: [
        ["Fecha", "14 de septiembre de 1856"],
        ["Enemigo", "Filibusteros de William Walker"],
        ["Hoy", "Fiesta patria nicaragüense"]
      ]
    },

    {
      id: "jose-santos-zelaya", tipo: "influencia", era: 2, hue: 200,
      nombre: "José Santos Zelaya", corto: "Zelaya",
      anios: "1853 – 1919", rol: "Presidente de la Revolución Liberal",
      figura: "hombre", acc: null,
      resumen: "Modernizó el país entre 1893 y 1909 y reincorporó la Costa Caribe a la soberanía nacional.",
      bio: [
        "Líder de la Revolución Liberal de 1893, José Santos Zelaya gobernó hasta 1909. Impulsó la educación laica, la separación de la Iglesia y el Estado, el ferrocarril y el telégrafo, y en 1894 reincorporó la Mosquitia, en la Costa Caribe, a la soberanía nacional.",
        "Su proyecto nacionalista chocó con los intereses de Estados Unidos y, bajo presión de Washington, renunció en diciembre de 1909. Murió en el exilio, en Nueva York, en 1919."
      ],
      datos: [
        ["Gobierno", "1893 – 1909"],
        ["Constitución", "«La Libérrima», 1893"],
        ["Costa Caribe", "Reincorporación de la Mosquitia, 1894"]
      ]
    },

    {
      id: "ruben-dario", tipo: "influencia", era: 2, hue: 275,
      nombre: "Rubén Darío", corto: "Rubén Darío",
      anios: "1867 – 1916", rol: "Padre del modernismo",
      figura: "hombre", acc: null,
      resumen: "El poeta universal que renovó la lengua española y puso a Nicaragua en el mapa de las letras.",
      bio: [
        "Nacido en Metapa (hoy Ciudad Darío) el 18 de enero de 1867, Félix Rubén García Sarmiento se crió en León, donde fue conocido desde niño como «el niño poeta». Publicó Azul… (1888) en Chile, Prosas profanas (1896) y Cantos de vida y esperanza (1905), obras con las que inauguró el modernismo.",
        "Fue periodista y diplomático, y vivió en Chile, Argentina, España y París. Murió en León el 6 de febrero de 1916. Su tumba, en la Catedral de León, está custodiada por un león de piedra."
      ],
      datos: [
        ["Obras clave", "Azul… · Prosas profanas · Cantos de vida y esperanza"],
        ["Movimiento", "Modernismo"],
        ["Reposa", "Catedral de León"]
      ],
      frase: { t: "Juventud, divino tesoro, ¡ya te vas para no volver!", a: "Rubén Darío, «Canción de otoño en primavera»" }
    },

    {
      id: "pablo-antonio-cuadra", tipo: "influencia", era: 3, hue: 172,
      nombre: "Pablo Antonio Cuadra", corto: "P. A. Cuadra",
      anios: "1912 – 2002", rol: "Poeta, ensayista y periodista",
      figura: "hombre", acc: null,
      resumen: "Voz central del Movimiento de Vanguardia y defensor de la identidad cultural nicaragüense.",
      bio: [
        "Nacido en Managua en 1912, Pablo Antonio Cuadra fue una figura central del Movimiento de Vanguardia (1931), junto a José Coronel Urtecho y otros escritores que quisieron renovar la poesía nacional mirando hacia lo propio: el lago, el campo, la gente.",
        "Fue poeta y ensayista, y codirigió el diario La Prensa. En El nicaragüense (1967) reflexionó sobre lo que somos como pueblo. Murió en 2002 como una de las grandes conciencias culturales del país."
      ],
      datos: [
        ["Movimiento", "Vanguardia (1931)"],
        ["Ensayo", "El nicaragüense (1967)"],
        ["Periodismo", "Codirector de La Prensa"]
      ]
    },

    {
      id: "ernesto-cardenal", tipo: "influencia", era: 4, hue: 52,
      nombre: "Ernesto Cardenal", corto: "Cardenal",
      anios: "1925 – 2020", rol: "Sacerdote, poeta y ministro de Cultura",
      figura: "hombre", acc: "boina",
      resumen: "Poeta y sacerdote que fundó la comunidad de Solentiname y llevó la poesía nicaragüense al mundo.",
      bio: [
        "Nacido en Granada en 1925, Ernesto Cardenal fue sacerdote, poeta y escultor. Sus Epigramas, Salmos y el Cántico cósmico lo convirtieron en uno de los poetas más leídos de América Latina. En 1966 fundó en el archipiélago de Solentiname una comunidad contemplativa donde los campesinos pintaban, escribían y leían el Evangelio.",
        "Tras 1979 fue ministro de Cultura, cargo que ejerció hasta 1987. Recibió el Premio Reina Sofía de Poesía Iberoamericana en 2012. Murió en Managua el 1 de marzo de 2020."
      ],
      datos: [
        ["Comunidad", "Solentiname (1966)"],
        ["Libros", "Epigramas · Salmos · Cántico cósmico"],
        ["Premio", "Reina Sofía de Poesía, 2012"]
      ]
    },

    {
      id: "carlos-mejia-godoy", tipo: "influencia", era: 4, hue: 95,
      nombre: "Carlos Mejía Godoy", corto: "Mejía Godoy",
      anios: "n. 1943", rol: "Cantautor del pueblo",
      figura: "hombre", acc: null,
      resumen: "Puso música a la voz del campesinado nicaragüense con la «Misa Campesina» y canciones que son memoria viva.",
      bio: [
        "Nacido en Somoto en 1943, Carlos Mejía Godoy ha cantado a la gente humilde, al campo y a la lucha de su pueblo con ritmos folclóricos de Nicaragua. En 1975 grabó la Misa Campesina Nicaragüense, que acercó la liturgia a la vida diaria de los campesinos.",
        "Canciones suyas como «Nicaragua, Nicaragüita» son parte de la identidad sonora del país y se cantan en escuelas, plazas y fiestas. Su música ayudó a construir una memoria colectiva."
      ],
      datos: [
        ["Nació", "Somoto, 1943"],
        ["Obra clave", "Misa Campesina Nicaragüense (1975)"],
        ["Canción emblema", "Nicaragua, Nicaragüita"]
      ]
    },

    {
      id: "sergio-ramirez", tipo: "influencia", era: 5, hue: 225,
      nombre: "Sergio Ramírez", corto: "S. Ramírez",
      anios: "n. 1942", rol: "Escritor, Premio Cervantes 2017",
      figura: "hombre", acc: null,
      resumen: "Narrador de Masatepe que recibió el Premio Cervantes, el mayor honor de las letras en español.",
      bio: [
        "Nacido en Masatepe en 1942, Sergio Ramírez es uno de los novelistas más importantes de Hispanoamérica. Ganó el Premio Alfaguara con Margarita, está linda la mar (1998), y en 2017 recibió el Premio Cervantes, el más alto reconocimiento de la lengua española.",
        "Fue vicepresidente de Nicaragua entre 1985 y 1990. Su obra, de Castigo divino a sus cuentos, retrata con humor y hondura la historia, la política y el alma de los nicaragüenses."
      ],
      datos: [
        ["Nació", "Masatepe, 1942"],
        ["Premio Alfaguara", "Margarita, está linda la mar (1998)"],
        ["Premio Cervantes", "2017"]
      ]
    },

    {
      id: "gioconda-belli", tipo: "influencia", era: 5, hue: 318,
      nombre: "Gioconda Belli", corto: "G. Belli",
      anios: "n. 1948", rol: "Poeta y novelista",
      figura: "mujer", acc: null,
      resumen: "Poeta y novelista de Managua cuya obra ha sido traducida a muchos idiomas.",
      bio: [
        "Nacida en Managua en 1948, Gioconda Belli escribe poesía y novela con una voz apasionada y libre. Su poemario Línea de fuego (1978) ganó el Premio Casa de las Américas, y su novela La mujer habitada (1988) la hizo conocida en todo el mundo.",
        "En El país bajo mi piel (2001) contó sus memorias de amor y compromiso con Nicaragua. Sus libros han sido traducidos a decenas de idiomas."
      ],
      datos: [
        ["Nació", "Managua, 1948"],
        ["Novela clave", "La mujer habitada (1988)"],
        ["Memorias", "El país bajo mi piel (2001)"]
      ]
    }
  ],

  TIMELINE: [
    { anio: "1522", titulo: "Nicarao y Gil González Dávila", texto: "El cacique recibe a la expedición española y sostiene el célebre diálogo que dará origen al nombre de Nicaragua.", tipo: "hist", personas: ["nicarao"] },
    { anio: "1523", titulo: "Diriangén enfrenta a los conquistadores", texto: "Al frente de numerosos guerreros, el cacique desafía a las tropas españolas en uno de los primeros actos de resistencia.", tipo: "hist", personas: ["diriangen"] },
    { anio: "1762", titulo: "La defensa del Castillo de la Inmaculada", texto: "Rafaela Herrera toma el mando de la fortaleza del río San Juan y rechaza a la flota inglesa.", tipo: "hist", personas: ["rafaela-herrera"] },
    { anio: "1821", titulo: "Independencia de Centroamérica", texto: "El 15 de septiembre se firma el Acta de Independencia de España, con Miguel Larreynaga entre sus firmantes.", tipo: "hist", personas: ["miguel-larreynaga"] },
    { anio: "1856", titulo: "Batalla de San Jacinto", texto: "El 14 de septiembre, el ejército nicaragüense derrota a los filibusteros de William Walker.", tipo: "hist", personas: ["san-jacinto"] },
    { anio: "1888", titulo: "Azul…", texto: "Rubén Darío publica en Chile el libro que da inicio al modernismo literario en lengua española.", tipo: "cultura", personas: ["ruben-dario"] },
    { anio: "1893", titulo: "Revolución Liberal", texto: "José Santos Zelaya llega al poder e impulsa la modernización del país; en 1894 reincorpora la Mosquitia.", tipo: "hist", personas: ["jose-santos-zelaya"] },
    { anio: "1912", titulo: "Cae Benjamín Zeledón", texto: "El general que defendió la soberanía frente a la intervención muere en Catarina el 4 de octubre.", tipo: "martir", personas: ["benjamin-zeledon"] },
    { anio: "1927 – 1933", titulo: "La guerra de Sandino", texto: "El Ejército Defensor de la Soberanía Nacional combate a los marines de Estados Unidos hasta su retirada.", tipo: "hist", personas: ["augusto-sandino"] },
    { anio: "1934", titulo: "Asesinato de Sandino", texto: "El 21 de febrero, oficiales de la Guardia Nacional asesinan al General de Hombres Libres en Managua.", tipo: "martir", personas: ["augusto-sandino"] },
    { anio: "1956", titulo: "Rigoberto López Pérez", texto: "El 21 de septiembre, el joven poeta dispara contra Somoza García en León y cae abatido.", tipo: "martir", personas: ["rigoberto-lopez-perez"] },
    { anio: "1959", titulo: "Los estudiantes de León", texto: "El 23 de julio la Guardia Nacional dispara contra una protesta estudiantil.", tipo: "martir", personas: ["estudiantes-1959"] },
    { anio: "1961", titulo: "Nace el Frente Sandinista", texto: "Carlos Fonseca, Tomás Borge y Silvio Mayorga fundan el movimiento que retomará la bandera de Sandino.", tipo: "hist", personas: ["carlos-fonseca"] },
    { anio: "1967", titulo: "Masacre del 22 de enero", texto: "La Guardia Nacional dispara contra una marcha de la oposición en Managua.", tipo: "martir", personas: ["masacre-1967"] },
    { anio: "1969", titulo: "El combate de Julio Buitrago", texto: "El 15 de julio, el jefe de la guerrilla urbana resiste durante horas el cerco de la Guardia Nacional.", tipo: "martir", personas: ["julio-buitrago"] },
    { anio: "1970", titulo: "Rugama y Luisa Amanda Espinoza", texto: "Un joven poeta y la primera mujer sandinista caída en combate entregan la vida.", tipo: "martir", personas: ["leonel-rugama", "luisa-amanda-espinoza"] },
    { anio: "1975", titulo: "Misa Campesina Nicaragüense", texto: "Carlos Mejía Godoy graba la obra que lleva la voz del campo a toda Nicaragua.", tipo: "cultura", personas: ["carlos-mejia-godoy"] },
    { anio: "1976", titulo: "Cae Carlos Fonseca", texto: "El fundador del FSLN muere en combate en Zinica, Matagalpa, el 8 de noviembre.", tipo: "martir", personas: ["carlos-fonseca"] },
    { anio: "1978", titulo: "Asesinato de Pedro Joaquín Chamorro", texto: "El 10 de enero muere el director de La Prensa; el país se levanta en huelga general.", tipo: "martir", personas: ["pedro-joaquin-chamorro"] },
    { anio: "1978", titulo: "Cae Gaspar García Laviana", texto: "El sacerdote y comandante del Frente Sur muere en combate el 11 de diciembre.", tipo: "martir", personas: ["gaspar-garcia-laviana"] },
    { anio: "1979", titulo: "19 de julio", texto: "Tras la huida de Somoza Debayle, la insurrección popular entra en Managua y termina con la dinastía.", tipo: "hist", personas: [] }
  ]
};

export const { ERAS, PEOPLE, TIMELINE } = SALA;
export default SALA;
