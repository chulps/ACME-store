// components/ProductList.tsx
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { Product } from "../common/types";

const ProductListMain = styled.main`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  grid-area: productlist;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--space-6), 1fr));
  gap: var(--space-4);
  height: 100%;
  overflow-y: auto;
  padding: 0 var(--space-2);
  margin-right: -1rem;
  padding-top: var(--space-3);
`;

interface ProductListProps {
    products: Product[];
    onAddToCart: (_product: Product) => void;
    convertPrice: (_price: number, _currency: string) => number; // Add convertPrice prop
    currency: string; // Add currency prop
  }

  const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, convertPrice, currency }) => {
    return (
      <ProductListMain>
        <ListGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              priceCurrency={product.priceCurrency}
              price={product.price}
              imageSrc={product.imageSrc}
              description={product.description}
              onAddToCart={() => onAddToCart(product)}
              convertPrice={convertPrice} // Pass convertPrice prop
              currency={currency} // Pass currency prop
            />
          ))}
        </ListGrid>
      </ProductListMain>
    );
  };
  
  export default ProductList;
  
