// components/Cart.tsx
import styled from "styled-components";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "../common/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTimes } from "@fortawesome/free-solid-svg-icons";

interface CartContainerProps {
  isVisible: boolean;
}

const CartContainer = styled.div.attrs<CartContainerProps>((props) => ({
  style: {
    display: props.isVisible ? "flex" : "none",
  },
}))`
  grid-area: cart;
  padding: var(--space-2) 0;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 0;
  background: var(--background-color);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (min-width: 992px) {
    position: relative;
    border-left: 1px solid var(--dark);
    flex-grow: 1;
    height: 100%;
    width: calc(var(--space-6) + var(--space-4));
  }
`;

const CartTitle = styled.data`
  margin-top: 0;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--secondary);
  padding-bottom: var(--space-1);
  padding-left: var(--space-1);
  margin: 0 var(--space-2);
`;

const EmptyState = styled.div`
  padding: var(--space-3);
`;

const EmptyStateHeader = styled.h4`
  color: var(--neutral-700);
`;

const EmptyStateMessage = styled.p`
  color: var(--neutral-700);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--text-color);
  padding: 1em;

  &:hover {
    background: var(--dark);
  }
`;

const CartItemList = styled.ul`
  list-style: none;
  padding: var(--space-2);
  flex: 1 0 auto;
  overflow-y: auto;
  height: calc(100dvh - 300px);
`;

const TotalPriceContainer = styled.p`
  text-align: right;
  border-top: 1px solid var(--secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) var(--space-1) 0;
  margin: 0 var(--space-2);
`;

const TotalPrice = styled.data`
  font-size: var(--font-size-h4);
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  background: var(--success);
`;

const TotalPriceLeftContent = styled.span`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

interface CartProps {
  items: CartItemType[];
  onRemove: (_id: string) => void;
  totalPrice: number;
  isVisible: boolean;
  onClose: () => void;
  currentCurrency: string;
  convertPrice: (_price: number, _currency: string) => number;
}

const Cart: React.FC<CartProps> = ({
  items,
  onRemove,
  totalPrice,
  isVisible,
  onClose,
  currentCurrency,
  convertPrice,
}) => {
  return (
    <CartContainer isVisible={isVisible}>
      <CartHeader>
        <CartTitle>
          <FontAwesomeIcon icon={faCartShopping} />
          &nbsp;{items.length} Items
        </CartTitle>

        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </CloseButton>
      </CartHeader>
      {items.length > 0 ? (
        <CartItemList>
          {items.map((item) => (
            <CartItem key={item.id} item={item} onRemove={onRemove} convertPrice={convertPrice} currency={currentCurrency} />
          ))}
        </CartItemList>
      ) : (
        <EmptyState>
          <EmptyStateHeader>Your ACME Store Cart is empty.</EmptyStateHeader>
          <EmptyStateMessage>
            Your Shopping Cart lives to serve. You can freely place and remove
            items, move them to Buy Later, or add them to your Wish List.
            Continue shopping on the Amazon.co.jp homepage, learn about
            today&apos;s deals, or visit your Wish List.
          </EmptyStateMessage>
        </EmptyState>
      )}
      <TotalPriceContainer>
        <TotalPriceLeftContent>
          <label>Total ({currentCurrency.toUpperCase()}):</label>
          <TotalPrice>{totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotalPrice>
        </TotalPriceLeftContent>
        <CheckoutButton disabled={items.length === 0}>Checkout</CheckoutButton>
      </TotalPriceContainer>
    </CartContainer>
  );
};

export default Cart;
