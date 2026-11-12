// Orden de la carta tal como lo pasó el cliente:
// Entradas, Hamburguesas, Hot Dogs, Otras Delicias, Especiales, Bebidas (Limonadas, Sodas,
// Granizados, Malteadas), Helados y cierre.
const entradas = {
  title: 'Entradas',
  char: 1,
  charPeek: true,
  charMembers: [
    {
      name: 'Luffy',
      top: 0,
      height: 33,
      messages: ['¡Quiero carne!', '¡Quiero otra hamburguesa!', '¡Voy a ser el Rey de los Piratas... y el rey del menú!'],
    },
    {
      name: 'Zoro',
      top: 33,
      height: 31,
      messages: ['Esto está bueno... ¿pero dónde está la salida?', '¿Alguien vio mi cerveza?', '¡No me perdí, la mesa se movió!'],
    },
    {
      name: 'Sanji',
      top: 64,
      height: 36,
      messages: ['¡La cocina del Baratie es mía!', '¡Aquí nadie desperdicia comida!', '¡Una dama merece lo mejor del menú!'],
    },
  ],
  noBadge: true,
  icon: 'empanada',
  quote: 'Toda gran aventura comienza con un bocado',
  items: [
    { name: 'Empanadas del Going Merry x6', price: '15.000' },
    { name: 'Nachos del Botín Pirata', price: '15.000' },
  ],
}

const hamburguesas = {
  title: 'Hamburguesas',
  photo: '/personajes/hamburguesas.jpg',
  strip: '/personajes/tripulacion.png',
  icon: 'burger',
  quote: 'Rangos de poder',
  items: [
    { tag: 'Nivel 1', name: 'Baratie Sencilla', desc: 'Pan artesanal, 150 g de carne, queso, lechuga, tomate y salsa de la casa.', price: '18.000' },
    { tag: 'Nivel 2', name: 'Nakama Doble', desc: 'Pan artesanal, doble carne de 150 g, doble queso, cebolla caramelizada, vegetales y salsa de la casa.', price: '26.000' },
    { tag: 'Nivel 3', name: 'Luffy Burger', desc: 'Pan artesanal, 180 g de carne, queso gratinado, jamón, huevo, vegetales y salsa de la casa.', price: '26.000' },
    { tag: 'Nivel 4', name: 'Monkey D. Queso', desc: 'Pan artesanal, 180 g de carne, triple queso gratinado, tocineta crocante, cebolla caramelizada y salsa de la casa.', price: '28.000' },
  ],
}

const hotdogs = {
  title: 'Hot Dogs',
  photo: '/personajes/hot-dogs.jpg',
  icon: 'hotdog',
  quote: 'Cazadores Legendarios',
  items: [
    { tag: 'Primera Luna', name: 'Kimetsu Clásico', price: '15.000' },
    { tag: 'Segunda Luna', name: 'Pilar de la Brasa', price: '18.000' },
    { tag: 'Tercera Luna', name: 'Especial Luna Superior', price: '22.000' },
  ],
}

const otras = {
  title: 'Otras Delicias',
  photo: '/personajes/otras-delicias.png',
  char: 2,
  charWide: true,
  charRock: true,
  stretchFirst: true,
  icon: 'chest',
  quote: 'Sabores de otro mundo',
  items: [
    { name: 'Picada banquete pirata', price: '38.000' },
    { name: 'Choripapa Rey Pirata', price: '25.000' },
    { name: 'Papas la Gran Ruta', price: '25.000' },
  ],
}

const especiales = {
  title: 'Especiales',
  photo: '/personajes/especiales.png',
  char: 3,
  stretchFirst: true,
  charBubble: 'top',
  charMessages: [
    '¡Itadakimasu!',
    '¡Este ramen está buenísimo!',
    '¡Tengo hambre otra vez!',
    '¿Me regalas otro tazón?',
  ],
  icon: 'gem',
  quote: 'El Botín oculto que solo verdaderos piratas se atreven a probar',
  items: [
    { name: 'Tenders Esfera Sagrada del Dragón', price: '26.000' },
    { name: 'Electro Costillas Pikachu', price: '35.000' },
    { name: 'Ramen Ichiracku', price: '28.000' },
  ],
}

const limonadas = {
  title: 'Limonadas',
  noBadge: true,
  icon: 'lemonade',
  quote: 'La frescura del mar y los viajes piratas',
  items: [
    { name: 'Luffy', tag: 'Sandía', price: '15.000' },
    { name: 'Nami', tag: 'Mandarina', price: '15.000' },
    { name: 'Chopper', tag: 'Cereza', price: '15.000' },
    { name: 'Nico Robin', tag: 'Coco', price: '15.000' },
  ],
}

const sodas = {
  title: 'Sodas Saborizadas',
  photo: '/personajes/sodas-saborizadas.jpg',
  char: 4,
  charBubble: 'top',
  charShout: true,
  stretchFirst: 2,
  charMessages: [
    '¡QUIERO UNA SODA!',
    '¡SOY UN RENO, NO UN MAPACHE!',
    '¡NO ME HAGAS FELIZ, IDIOTA!',
    '¡SOY EL DOCTOR... Y TENGO SED!',
  ],
  icon: 'soda',
  quote: 'Burbujas con el poder de una fruta del diablo',
  items: [
    { name: 'Capitán Shanks', tag: 'Fresa', price: '15.000' },
    { name: 'Sanji', tag: 'Maracuyá', price: '15.000' },
    { name: 'Zoro', tag: 'Mango biche', price: '15.000' },
    { name: 'Franky', tag: 'Blueberry', price: '15.000' },
  ],
}

const granizados = {
  title: 'Granizados',
  photo: '/personajes/granizados.jpg',
  group: {
    src: '/personajes/personaje-5.png',
    members: [
      {
        name: 'Inosuke',
        left: 0,
        width: 31,
        align: 'left',
        messages: ['¡Tráiganme comida o los reto a un duelo!', '¡Yo pedí primero!', '¡Soy el rey de la montaña... y de la carta!'],
      },
      {
        name: 'Tanjiro',
        left: 31,
        width: 25,
        align: 'center',
        messages: ['¡Gracias por la comida!', '¡Con esfuerzo todo sabe más rico!', '¡Un granizado para recuperar fuerzas!'],
      },
      {
        name: 'Nezuko',
        left: 56,
        width: 17,
        align: 'center',
        messages: ['¡Mmh! ¡Mmmh!', '¡Mmh mmh mmh!'],
      },
      {
        name: 'Zenitsu',
        left: 73,
        width: 27,
        align: 'right',
        messages: ['¡Quiero un granizado, ya!', '¡Tengo miedo... pero tengo hambre!', '¡Con esto sí me hago fuerte!'],
      },
    ],
  },
  icon: 'ice',
  quote: 'Primera postura, concentración total para tu sed',
  items: [
    { name: 'Tanjiro', tag: 'Frutos rojos', price: '15.000' },
    { name: 'Zenitsu', tag: 'Maracuyá', price: '15.000' },
    { name: 'Inosuke', tag: 'Mango biche', price: '15.000' },
    { name: 'Adicional licor', price: '+3.000' },
  ],
}

const malteadas = {
  title: 'Malteadas',
  photo: '/personajes/malteadas.jpg',
  char: 6,
  icon: 'shake',
  quote: 'Ricas y cremosas, preparadas por el gremio de cazadores',
  items: [{ name: 'Malteada del gremio', price: '15.000' }],
}

const helados = {
  title: 'Helados',
  photo: '/personajes/helados.png',
  icon: 'icecream',
  quote: 'Sabores para pasar el rato',
  chips: {
    label: 'Cono',
    price: '5.000',
    flavors: ['Chocolate', 'Fresa', 'Maracuyá', 'Brownie', 'Veteado de mora'],
  },
}

// Cofre flotante: siempre visible abajo; al tocarlo abre el modal con lo que trae la cajita
export const mysteryBox = {
  price: '25.000',
  tagline: 'Pequeños piratas, grandes aventuras',
  hint: 'Toca cada carta para descubrir qué trae',
  messages: ['¡Cajita sorpresa!', '¿Qué traerá?', '¡Ábrela!', '¡Misterio por ฿25.000!'],
  items: [
    { icon: 'burger', name: 'Mini hamburguesa' },
    { icon: 'lemonade', name: 'Bebida' },
    { icon: 'gift', name: 'Sorpresa', secret: '¡Es un secreto!' },
    { icon: 'cards', name: 'Sobre de cartas' },
  ],
}

export const pages = [
  { id: 'p1', fx: 'ドン!', sections: [entradas, hamburguesas] },
  { id: 'p2', fx: 'ゴゴゴ', sections: [hotdogs, otras, especiales] },
  {
    id: 'p3',
    fx: 'ザブン!',
    title: 'Bebidas',
    icon: 'lemonade',
    photo: '/personajes/bebidas.jpg',
    subtitle: 'El tesoro más refrescante de los siete mares',
    sections: [limonadas, sodas, granizados],
  },
  {
    id: 'p4',
    fx: 'ワクワク',
    sections: [malteadas, helados],
    footer: ['Pequeños antojos y grandes sabores', '¡La combinación perfecta para tu aventura!'],
  },
]
