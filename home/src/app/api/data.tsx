import { title } from "process";

export const footerlabels: { label: string; herf: string }[] = [
  { label: "Terms", herf: "#" },
  { label: "Disclosures", herf: "#" },
  { label: "Disclosures", herf: "#" },
  { label: "Latest News", herf: "#" },
];



export const CourseData: { course: string; imageSrc: string; profession: string; price: string; category: 'informatique'; }[] = [
  {
    course: 'laptop',
    imageSrc: '/images/courses/laptop.jpeg',
    profession: 'HTML, CSS, Javascript Development',
    price: '40',
    category: 'informatique'
  },
  {
    course: 'pc',
    imageSrc: '/images/courses/pc.jpeg',
    profession: 'Backend with Node.js and Express.js',
    price: '21',
    category: 'informatique'
  },
  {
    course: 'Database',
    imageSrc: '/images/courses/HyperMonitor 24.jpeg',
    profession: 'Learn Mongodb with Mongoose',
    price: '21',
    category: 'informatique'
  },
  {
    course: 'React.js',
    imageSrc: '/images/courses/CyberMouse Elite.jpeg',
    profession: 'Learn React with Redux toolkit',
    price: '99',
    category: 'informatique'
  }
];

export const TestimonialData: { profession: string; name: string; imgSrc: string; starimg: string; detail: string; }[] = [
  {
    profession: 'Acheteur de PC',
    name: 'Andrew Williams',
    imgSrc: '/images/testimonial/user-1.jpg',
    starimg: '/images/testimonial/stars.png',
    detail: "J'ai acheté mon premier PC chez cette boutique et je suis impressionné par la qualité du produit. Le service client a été exceptionnel et la livraison rapide. Je recommande vivement !"
  },
  {
    profession: 'Technicien informatique',
    name: 'Cristian Doru Barin',
    imgSrc: '/images/testimonial/user-2.jpg',
    starimg: '/images/testimonial/stars.png',
    detail: "J'ai récemment acheté un écran HyperMonitor 24. L'image est nette et les couleurs sont incroyables. Parfait pour mes besoins professionnels et personnels."
  },
  {
    profession: 'Développeur web',
    name: 'Tanzeel Ur Rehman',
    imgSrc: '/images/testimonial/user-3.jpg',
    starimg: '/images/testimonial/stars.png',
    detail: "J'ai acheté un ordinateur portable sur ce site et il a parfaitement répondu à mes attentes. Très bon rapport qualité/prix et le support a été très réactif."
  },
  {
    profession: 'Designer graphique',
    name: 'Sarah Smith',
    imgSrc: '/images/testimonial/user-4.jpg',
    starimg: '/images/testimonial/stars.png',
    detail: "J'ai acheté une souris gaming CyberMouse Elite et je suis plus que satisfaite. La prise en main est confortable, et la précision est parfaite pour mes projets créatifs."
  },
]