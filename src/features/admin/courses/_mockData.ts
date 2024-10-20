// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shose', label: 'Shose' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

export type ProductItemProps = {
  id: string;
  title: string;
  instructor: string;
  price: number;
  priceSale: number | null;
  students: number;
  rating: number;
  reviews: number;
  categories: string[];
  status: string;
  coverUrl: string;
  colors: string[];
};

// Mock courses data
const _courses: ProductItemProps[] = [
  {
    id: '1',
    title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
    instructor: 'Maximilian Schwarzmüller',
    price: 129.99,
    priceSale: 89.99,
    status: 'bestseller',
    coverUrl:
      'https://telcomatraining.com/wp-content/uploads/2022/06/1_vJgCHEOEJrAn_pU7hVhkKQ.jpeg',
    students: 45000,
    rating: 4.8,
    reviews: 5200,
    categories: ['Web Development', 'Programming'],
    colors: [],
  },
  {
    id: '2',
    title: 'The Complete JavaScript Course 2024: From Zero to Expert!',
    instructor: 'Jonas Schmedtmann',
    price: 139.99,
    priceSale: 109.99,
    status: 'new',
    coverUrl: 'https://img-b.udemycdn.com/course/750x422/5450776_0385.jpg',
    students: 35000,
    rating: 4.7,
    reviews: 4800,
    categories: ['Web Development', 'JavaScript'],
    colors: [],
  },
  {
    id: '3',
    title: 'Python for Data Science and Machine Learning Bootcamp',
    instructor: 'Jose Portilla',
    price: 159.99,
    priceSale: 119.99,
    status: 'bestseller',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7EZdDPkBaW_g-YpQoPMCl0RKr8bXURHHHUw&s',
    students: 60000,
    rating: 4.9,
    reviews: 8300,
    categories: ['Data Science', 'Python'],
    colors: [],
  },
  {
    id: '4',
    title: 'AWS Certified Solutions Architect - Associate 2024',
    instructor: 'Stephane Maarek',
    price: 149.99,
    priceSale: 99.99,
    status: 'outOfStock',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanoZ8Y_JDAqBLucAv8Q6pRHnR_1T9BdyIwg&s',
    students: 29000,
    rating: 4.6,
    reviews: 3400,
    categories: ['Cloud Computing', 'AWS'],
    colors: [],
  },
  {
    id: '5',
    title: 'The Complete SQL Bootcamp 2024: Go from Zero to Hero',
    instructor: 'Jose Portilla',
    price: 129.99,
    priceSale: 89.99,
    status: 'new',
    coverUrl: 'https://img-c.udemycdn.com/course/750x422/762616_7693_3.jpg',
    students: 41000,
    rating: 4.8,
    reviews: 4900,
    categories: ['Database', 'SQL'],
    colors: [],
  },
  {
    id: '6',
    title: 'Complete Guide to TensorFlow for Deep Learning with Python',
    instructor: 'Jose Portilla',
    price: 159.99,
    priceSale: 119.99,
    status: 'bestseller',
    coverUrl: 'https://img-c.udemycdn.com/course/750x422/762616_7693_3.jpg',
    students: 21000,
    rating: 4.7,
    reviews: 3200,
    categories: ['Data Science', 'Deep Learning'],
    colors: [],
  },
];

export default _courses;

export {
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  GENDER_OPTIONS,
  PRICE_OPTIONS,
  RATING_OPTIONS,
  _courses,
  defaultFilters,
};
