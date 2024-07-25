// components/CartItem.tsx
import styled from "styled-components";
import { CartItem as CartItemType } from "../common/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ItemContainer = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--dark);
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;
`;

const ItemImage = styled.img`
  width: var(--space-5);
  height: var(--space-5);
  aspect-ratio: 1/1;
  background: var(--dark);
  border: 1px solid var(--secondary);
  font-size: var(--font-size-small);
  height: auto;
  margin-right: 1rem;
  align-self: flex-start;
`;

const ItemTitle = styled.p`
  display: flex;
  gap: var(--space-1);
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ItemPrice = styled.data`
  font-size: var(--font-size-h4);
  text-align: right;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--danger-400);
  cursor: pointer;
  padding: 0.5em;
  border-radius: 0.5em;
  align-self: flex-start;
  justify-self: flex-end;
`;

const ItemDescription = styled.small`
  color: var(--neutral-300);
`;

interface CartItemProps {
  item: CartItemType;
  onRemove: (_id: string) => void;
  convertPrice: (_price: number, _currency: string) => number; // Add convertPrice prop
  currency: string; // Add currency prop
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, convertPrice, currency }) => {
  return (
    <ItemContainer>
      <ItemImage src={item.imageSrc} alt={item.title} />
      <ItemDetails>
        <div>
          <ItemTitle>
            {item.title}
            <RemoveButton onClick={() => onRemove(item.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </RemoveButton>
          </ItemTitle>
          <ItemDescription>{item.description}</ItemDescription>
        </div>
        <ItemPrice>
          <label>{currency}</label>
          {convertPrice(item.price, currency).toFixed(2)}
        </ItemPrice>
      </ItemDetails>
    </ItemContainer>
  );
};

export default CartItem;
