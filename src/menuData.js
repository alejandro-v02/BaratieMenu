// Orden de la carta tal como lo pasó el cliente:
// Entradas, Hamburguesas, Hot Dogs, Otras Delicias, Especiales, Bebidas (Limonadas, Sodas,
// Granizados, Malteadas), Helados y cierre.
const entradas = {
  title: 'Entradas',
  char: 1,
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
  photo: '/personajes/otras-delicias.jpg',
  char: 2,
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
  char: 4,
  icon: 'soda',
  quote: 'Burbujas con el poder de una fruta del diablo',
  items: [
    { name: 'Capitán Shaks', tag: 'Fresa', price: '15.000' },
    { name: 'Sanji', tag: 'Maracuyá', price: '15.000' },
    { name: 'Zoro', tag: 'Mango biche', price: '15.000' },
    { name: 'Franky', tag: 'Blueberry', price: '15.000' },
  ],
}

const granizados = {
  title: 'Granizados',
  char: 5,
  charBelow: true,
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
  char: 6,
  icon: 'shake',
  quote: 'Ricas y cremosas, preparadas por el gremio de cazadores',
  items: [{ name: 'Malteada del gremio', price: '15.000' }],
}

const helados = {
  title: 'Helados',
  icon: 'icecream',
  quote: 'Sabores para pasar el rato',
  chips: {
    label: 'Cono',
    price: '5.000',
    flavors: ['Chocolate', 'Fresa', 'Maracuyá', 'Brownie', 'Veteado de mora'],
  },
}

export const pages = [
  { id: 'p1', fx: 'ドン!', sections: [entradas, hamburguesas] },
  { id: 'p2', fx: 'ゴゴゴ', sections: [hotdogs, otras, especiales] },
  {
    id: 'p3',
    fx: 'ザブン!',
    title: 'Bebidas',
    icon: 'lemonade',
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
