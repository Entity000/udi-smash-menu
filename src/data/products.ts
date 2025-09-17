import { productImages } from './images';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "burgers", name: "Hambúrgueres", icon: "🍔" },
  { id: "fries", name: "Batatas", icon: "🍟" },
  { id: "milkshakes", name: "Milkshakes", icon: "🥤" },
  { id: "drinks", name: "Bebidas", icon: "🥤" },
];

export const products: Product[] = [
  // Hambúrgueres
  {
    id: "smash-classico",
    name: "Smash Burguer Clássico",
    description: "Pão brioche, blend bovino 150g smashed, queijo cheddar, alface, tomate, cebola caramelizada e molho especial",
    price: 28.90,
    image: productImages['smash-classico'],
    category: "burgers"
  },
  {
    id: "smash-duplo",
    name: "Smash Duplo",
    description: "Pão brioche, dois blends bovinos 150g smashed, queijo cheddar duplo, alface, tomate e molho especial",
    price: 36.90,
    image: productImages['smash-duplo'],
    category: "burgers"
  },
  {
    id: "smash-bacon",
    name: "Smash Bacon",
    description: "Pão brioche, blend bovino 150g smashed, queijo cheddar, bacon crocante, alface, tomate e molho especial",
    price: 33.90,
    image: "/api/placeholder/300/200",
    category: "burgers"
  },
  {
    id: "smash-especial",
    name: "Smash Especial",
    description: "Pão brioche, blend bovino 180g smashed, queijo cheddar, bacon, cebola roxa, rúcula, tomate seco e aioli trufado",
    price: 42.90,
    image: "/api/placeholder/300/200",
    category: "burgers"
  },

  // Batatas
  {
    id: "batata-classica",
    name: "Batata Clássica",
    description: "Batatas rústicas cortadas à mão, temperadas com sal especial e ervas finas",
    price: 12.90,
    image: "/api/placeholder/300/200",
    category: "fries"
  },
  {
    id: "batata-cheddar-bacon",
    name: "Batata Cheddar & Bacon",
    description: "Batatas rústicas cobertas com molho cheddar cremoso e bacon crocante",
    price: 18.90,
    image: productImages['batata-cheddar-bacon'],
    category: "fries"
  },
  {
    id: "batata-rustica",
    name: "Batata Rústica",
    description: "Batatas com casca temperadas com alecrim, páprica e azeite trufado",
    price: 15.90,
    image: "/api/placeholder/300/200",
    category: "fries"
  },

  // Milkshakes
  {
    id: "milkshake-chocolate",
    name: "Chocolate",
    description: "Milkshake cremoso de chocolate belga com chantilly e raspas de chocolate",
    price: 16.90,
    image: productImages['milkshake-chocolate'],
    category: "milkshakes"
  },
  {
    id: "milkshake-morango",
    name: "Morango",
    description: "Milkshake de morango com pedaços de fruta fresca e chantilly",
    price: 16.90,
    image: "/api/placeholder/300/200",
    category: "milkshakes"
  },
  {
    id: "milkshake-ovomaltine",
    name: "Ovomaltine",
    description: "Milkshake de ovomaltine com cobertura crocante e chantilly",
    price: 18.90,
    image: "/api/placeholder/300/200",
    category: "milkshakes"
  },

  // Bebidas
  {
    id: "coca-cola",
    name: "Coca-Cola Lata",
    description: "Refrigerante Coca-Cola gelado 350ml",
    price: 6.90,
    image: "/api/placeholder/300/200",
    category: "drinks"
  },
  {
    id: "guarana",
    name: "Guaraná Lata",
    description: "Refrigerante Guaraná Antarctica gelado 350ml",
    price: 6.90,
    image: "/api/placeholder/300/200",
    category: "drinks"
  },
  {
    id: "sprite",
    name: "Sprite Lata",
    description: "Refrigerante Sprite gelado 350ml",
    price: 6.90,
    image: "/api/placeholder/300/200",
    category: "drinks"
  },
  {
    id: "agua-com-gas",
    name: "Água com Gás",
    description: "Água mineral com gás São Lourenço 500ml",
    price: 4.90,
    image: "/api/placeholder/300/200",
    category: "drinks"
  },
  {
    id: "agua-sem-gas",
    name: "Água sem Gás",
    description: "Água mineral natural São Lourenço 500ml",
    price: 4.90,
    image: "/api/placeholder/300/200",
    category: "drinks"
  }
];

// Dados para upsell
export const upsellOffers = [
  {
    id: "batata-upgrade",
    title: "Adicionar Batata Clássica",
    description: "Que tal uma batata para acompanhar?",
    price: 5.00,
    originalPrice: 12.90,
  },
  {
    id: "combo-milkshake",
    title: "Transformar em Combo",
    description: "Adicione um milkshake e ganhe 15% de desconto!",
    price: 10.00,
    originalPrice: 16.90,
  },
];