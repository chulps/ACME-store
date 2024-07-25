import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck, faDollarSign, faEuroSign, faYenSign, faPoundSign } from "@fortawesome/free-solid-svg-icons";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";

const Card = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  background: var(--dark);
  aspect-ratio: 16/9;
  border-radius: var(--space-1);
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
  color: var(--neutral-300);
  min-height: 4.5em; // Ensure description has a minimum height
  margin-bottom: var(--space-1);
  height: 3em;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid var(--dark);
  padding: var(--space-1) 0;
  margin-top: 1em;
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
    box-shadow: 0 0 0 transparent;
  }
  50% {
    background-color: var(--success);
    color: white;
    box-shadow: 0 0 var(--space-1) var(--success-600);

  }
  100% {
    background-color: var(--background-color);
    color: var(--success);
    box-shadow: 0 0 0 transparent;
  }
`;

const Button = styled.button<{ $added: boolean }>`
  margin-top: 1rem;
  width: fit-content;
  align-self: flex-end;
  justify-self: flex-end;
  background-color: ${({ $added }) => ($added ? "var(--success)" : "var(--primary)")};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1em;
  gap: var(--space-1);
  animation: ${({ $added }) => $added && addButtonAnimation} 1s ease-in-out forwards;
  pointer-events: ${({ $added }) => ($added ? 'none' : 'auto')}; // Disable pointer events when added

  &:hover {
    background-color: ${({ $added }) => ($added ? "var(--success-dark)" : "var(--royal-400)")};
  }
`;

interface ProductCardProps {
  title: string;
  price: number;
  imageSrc: string;
  description: string;
  priceCurrency: string;
  onAddToCart: () => void;
  isInCart: boolean; // Add isInCart prop
  convertPrice: (_price: number, _currency: string) => number;
  currency: string;
}

const currencyIcons = {
  usd: faDollarSign,
  eur: faEuroSign,
  jpy: faYenSign,
  gbp: faPoundSign,
  cad: faCanadianMapleLeaf,
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageSrc,
  description,
  onAddToCart,
  isInCart,
  convertPrice,
  currency,
}) => {
  const [added, setAdded] = useState(isInCart);

  useEffect(() => {
    setAdded(isInCart);
  }, [isInCart]);

  const handleAddToCart = () => {
    onAddToCart();
    setAdded(true);
  };

  const convertedPrice = convertPrice(price, currency);

  return (
    <Card>
      <Image src={imageSrc} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <BottomRow>
          <PriceContainer>
            <label>
              <FontAwesomeIcon icon={currencyIcons[currency as keyof typeof currencyIcons]} /> {currency.toUpperCase()}
            </label>
            <Price>
              {convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Price>
          </PriceContainer>
          <Button $added={added} onClick={handleAddToCart}>
            <FontAwesomeIcon icon={added ? faCheck : faCartPlus} />
             {added ? "Added to cart" : "Add to cart"}
          </Button>
        </BottomRow>
      </Content>
    </Card>
  );
};

export default ProductCard;
