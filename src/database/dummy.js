export const shots = [
  {
    id: 1,
    score: 20,
    diana: {
      name: 'Diana Basica',
      src: './img/dians/s.jpg'
    },
    gun: {
      date: new Date(),
      name: "FX-05",
      details: '',
      src: './img/guns/s.jpg'
    }
  },
];

export const guns = [
  {
    id: '1',
    createAt: new Date(),
    name: "Pistola calibre 9mm",
    details: '',
    src: './img/guns/s.jpg'
  },
  {
    id: '2',
    createAt: new Date(),
    name: "FX-05",
    details: '',
    src: './img/guns/FX05.jpg'
  },
  {
    id: '3',
    createAt: new Date(),
    name: "MP-5",
    details: '',
    src: './img/guns/MP5.jpg'
  },
  {
    id: '4',
    createAt: new Date(),
    name: "Pistola 9mm",
    details: '',
    src: './img/guns/nmm.jpeg'
  },

];


export const dians = [
  {
    id: '1',
    createAt: new Date(),
    distance: 'Es un ejercicio que el tirador utiliza para familiarizarse con el armamento y regimar el arma antes del desarrollo de los siguientes cuadros de tiro.',
    name: "Cuadro Básico del Tiradorr",
    src: './img/dians/s.jpg'
  },
  {
    id: '2',
    createAt: new Date(),
    distance: 'Se emplea para acostumbrar al tirador a realizar disparos en diferentes posiciones y a diferentes distancias. ',
    name: "Cuadro de Exámen",
    src: './img/dians/diana.jpg'
  },
  {
    id: '3',
    createAt: new Date(),
    distance: 'Permite desarrollar la reacción del tirador y practicar su precisión ante situaciones de estrés, ya que el tirador espera una señal audible para realizar 10 disparos sobre una silueta enemiga en un tiempo máximo de 15 segundos.',
    name: "Cuadro de Identificación de Blancos",
    src: './img/dians/diana.jpg'
  },
  {
    id: '4',
    createAt: new Date(),
    distance: 'Su objetivo es acostumbrar al tirador a situaciones de poca luz, el tirador debe evacuar 20 cartuchos en un tiempo maximo de 10 segundos, para aprobar se requiere obtener un minimo de 3 impactos en diana.',
    name: "Cuadro de Tiro Nocturno",
    src: './img/dians/diana.jpg'
  }

];