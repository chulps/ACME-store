import styled, { keyframes } from "styled-components";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "../common/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faDollarSign,
  faEuroSign,
  faYenSign,
  faPoundSign,
} from "@fortawesome/free-solid-svg-icons";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

interface CartContainerProps {
  $isVisible: boolean;
}

interface CartTitleProps {
  $items: CartItemType[];
}

// Animations
const widthIn = keyframes` // Animation for when the cart is opened on desktop
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: calc(var(--space-6) + var(--space-4));
    opacity: 1;
  }
`;

const widthOut = keyframes` // Animation for when the cart is closed on desktop
  from {
    width: calc(var(--space-6) + var(--space-4));
    opacity: 1;
  }
  to {
    width: 0;
    opacity: 0;
  }
`;

const slideIn = keyframes` // Animation for when the cart is opened on mobile
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes` // Animation for when the cart is closed on mobile
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const CartContainer = styled.div<CartContainerProps>`
  grid-area: cart;
  padding: var(--space-2) 0;
  height: 100vh; // fallback in case browser doesn't support dvh
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
  transform-origin: left;
  width: ${({ $isVisible }) =>
    $isVisible
      ? "calc(var(--space-6) + var(--space-4))"
      : "0"}; // Adjust the width based on the $isVisible prop
  opacity: ${({ $isVisible }) =>
    $isVisible ? "1" : "0"}; // Adjust the opacity based on the $isVisible prop
  transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;

  @media (max-width: 991px) {
    width: 100vw; // fallback in case browser doesn't support dvw
    width: 100dvw;
    animation: ${({ $isVisible }) => ($isVisible ? slideIn : slideOut)} 0.3s
      forwards; // Animate the cart on mobile
  }

  @media (min-width: 992px) {
    position: relative;
    border-left: 1px solid var(--dark);
    flex-grow: 1;
    animation: ${({ $isVisible }) => ($isVisible ? widthIn : widthOut)} 0.3s
      forwards; // Animate the cart on desktop
  }
`;

const CartTitle = styled.data<CartTitleProps>`
  margin-top: 0;
  color: ${({ $items }) =>
    $items.length > 0 ? "var(--success)" : "var(--white)"};
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--secondary);
  padding: var(--space-1) 0 var(--space-2) var(--space-2);
  margin: 0 var(--space-2);
`;

const EmptyState = styled.div`
  max-width: var(--space-6);
  margin: 0 auto;
  padding: 0;
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

const CartItemList = styled.ul<{ $isVisible: boolean }>`
  list-style: none;
  padding: var(--space-2);
  flex: 1 0 auto;
  overflow-y: auto;
  height: calc(100dvh - 300px);
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
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
  color: white;
  cursor: pointer;

  &:disabled {
    background: var(--neutral-300);
    cursor: not-allowed;
  }

  &:hover {
    background: var(--success-400);
  }
`;

const TotalPriceLeftContent = styled.span`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const OKButton = styled.button`
  width: 100%;
  background: var(--success);
  margin-top: var(--space-1);

  &:hover {
    background: var(--success-400);
  }
`;

const SuccessState = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--space-6);
  margin: 0 auto;
`;

const SuccessHeader = styled.h4`
  color: var(--success);
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: var(--success);
`;

const SuccessEmoji = styled.h3`
  color: var(--white);
  text-align: center;
  margin-bottom: var(--space-1);
`;

const currencyIcons = {
  usd: faDollarSign,
  eur: faEuroSign,
  jpy: faYenSign,
  gbp: faPoundSign,
  cad: faCanadianMapleLeaf,
};

interface CartProps {
  items: CartItemType[];
  onRemove: (_id: string) => void;
  totalPrice: number;
  isVisible: boolean;
  onClose: () => void;
  onCheckout: () => void;
  currentCurrency: string;
  convertPrice: (_price: number, _currency: string) => number;
}

const Cart: React.FC<CartProps> = ({
  items,
  onRemove,
  totalPrice,
  isVisible,
  onClose,
  onCheckout,
  currentCurrency,
  convertPrice,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckout = () => {
    const order = {
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        price: convertPrice(item.price, currentCurrency).toFixed(2),
        currency: currentCurrency,
      })),
      totalPrice: totalPrice.toFixed(2),
      currency: currentCurrency,
    };
    console.log("Order:", JSON.stringify(order, null, 2)); // log the order to the console on checkout
    onCheckout();
    setShowConfirmation(true);
    setIsCheckedOut(true);
  };

  // resets the cart after checkout
  const handleOkClick = () => {
    setShowConfirmation(false);
    setIsCheckedOut(false);
  };

  return (
    <CartContainer $isVisible={isVisible}>
      <CartHeader>
        <CartTitle $items={items}>
          <label>shopping cart</label>
          {items.length} Item{items.length === 1 ? "" : "s"}
        </CartTitle>

        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </CloseButton>
      </CartHeader>
      {showConfirmation ? (
        <SuccessState>
          <SuccessEmoji>٩( ᐛ )و</SuccessEmoji>
          <SuccessHeader>Success!</SuccessHeader>
          <SuccessMessage>
            You have successfully checked out. Thank you for shopping at ACME!
          </SuccessMessage>
          <OKButton onClick={handleOkClick}>OK</OKButton>
        </SuccessState>
      ) : items.length > 0 ? (
        <CartItemList $isVisible={isVisible}>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              convertPrice={convertPrice}
              currency={currentCurrency}
            />
          ))}
        </CartItemList>
      ) : (
        <EmptyState>
          <EmptyStateHeader>Your ACME Store Cart is empty.</EmptyStateHeader>
          <EmptyStateMessage>
            Your Shopping Cart lives to serve. You can freely place and remove
            items, move them to Buy Later, or add them to your Wish List.
            Continue shopping on ACME.co.jp homepage, learn about today&apos;s
            deals, or visit your Wish List.
          </EmptyStateMessage>
        </EmptyState>
      )}
      <TotalPriceContainer>
        <TotalPriceLeftContent>
          <label>Total ({currentCurrency.toUpperCase()}):</label>
          <TotalPrice>
            <FontAwesomeIcon
              icon={
                currencyIcons[currentCurrency as keyof typeof currencyIcons]
              }
            />
            {totalPrice.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TotalPrice>
        </TotalPriceLeftContent>
        <CheckoutButton
          disabled={items.length === 0 || isCheckedOut}
          onClick={handleCheckout}
        >
          Checkout
        </CheckoutButton>
      </TotalPriceContainer>
    </CartContainer>
  );
};

export default Cart;
