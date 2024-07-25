import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

const Card = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  background: var(--dark);
  aspect-ratio: 16/9;
`;

const Content = styled.div`
  padding: var(--space-1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  margin: var(--space-1) 0;
  font-weight: normal;
`;

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: calc(var(--font-size-h3) * 3);
  position: relative;
  display: block;
  color: var(--neutral-300);
`;

const BottomRow = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid var(--dark);
  padding: var(--space-1) 0;
  margin-top: var(--space-1);
`;

const Price = styled.data`
  text-align: right;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const addButtonAnimation = keyframes`
  0% {
    background-color: var(--primary);
    color: white;
  }
  50% {
    background-color: var(--success);
    color: white;
  }
  100% {
    background-color: var(--background-color);
    color: var(--success);
  }
`;

const Button = styled.button<{ added: boolean }>`
  margin-top: 1rem;
  width: fit-content;
  align-self: flex-end;
  justify-self: flex-end;
  background-color: ${({ added }) => (added ? "var(--success)" : "var(--primary)")};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-1);
  animation: ${({ added }) => added && addButtonAnimation} 0.3s ease-in-out forwards;
  pointer-events: ${({ added }) => (added ? 'none' : 'auto')}; // Disable pointer events when added

  &:hover {
    background-color: ${({ added }) => (added ? "var(--success-dark)" : "var(--primary-dark)")};
  }
`;

interface ProductCardProps {
  title: string;
  price: number;
  imageSrc: string;
  description: string;
  priceCurrency: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageSrc,
  description,
  priceCurrency,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart();
    setAdded(true);
  };

  return (
    <Card>
      <Image src={imageSrc} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <BottomRow>
          <PriceContainer>
            <label>{priceCurrency}</label>
            <Price>
              {(Math.round(price * 100) / 100)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Price>
          </PriceContainer>
          <Button added={added} onClick={handleAddToCart}>
            <FontAwesomeIcon icon={added ? faCheck : faCartPlus} />
            &nbsp;{added ? "Added to cart" : "Add to cart"}
          </Button>
        </BottomRow>
      </Content>
    </Card>
  );
};

export default ProductCard;
