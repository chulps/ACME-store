// components/Header.tsx
import styled from "styled-components";
import Image from "next/image";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Currency } from "../common/types";
import FlickeringText from "./FlickeringText"; // Import the new component

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2);
  grid-area: header;
  margin: 0 var(--space-2);
  
  @media screen and (min-width: 992px) {
    flex-direction: row;
    border-bottom: 1px solid var(--secondary);
  }
`;

const Title = styled.h4`
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: normal;
  background: var(--danger);
  box-shadow: 0 0 var(--space-1) var(--danger);
  padding: 1rem;
  font-weight: bold;
  color: var(--white);
  font-style: italic;
  text-shadow: 0 0 6px var(--white);
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: var(--space-2);
  position: relative;
`;

const UserIcon = styled.div`
  width: var(--space-3);
  height: var(--space-3);
  border-radius: 50%;
  background: var(--dark);
  font-size: var(--font-size-small);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  outline: 1px solid var(--secondary);
`;

const Cart = styled(FontAwesomeIcon)`
  font-size: var(--font-size-h3);
  cursor: pointer;
  position: relative;
`;

const Badge = styled.data`
  position: absolute;
  height: var(--space-2);
  min-width: var(--space-2);
  top: 0;
  left: 100%;
  text-shadow: 0 0 6px var(--success-900);
  transform: translate(-50%, -50%);
  background: var(--success);
  text-align: right;
  color: white;
  border-radius: 50%;
  padding: 0.25em;
  font-size: var(--font-size-small);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartButtonContainer = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  align-items: flex-end;
`;

const Middle = styled.div`
  display: none;

  @media screen and (min-width: 992px) {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
`;

const ProfileImg = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
`;

interface HeaderProps {
  toggleCartVisibility: () => void;
  cartItemCount: number;
  currencies: Currency[];
  onCurrencyChange: (_currency: string) => void;
  currentCurrency: string;
  onSearch: (_query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleCartVisibility,
  cartItemCount,
  currencies,
  onCurrencyChange,
  currentCurrency,
  onSearch,
}) => {
  return (
    <HeaderContainer>
      <span style={{display: "flex", color: "var(--danger)"}}>
        <Title>
          <FlickeringText />
        </Title>
      </span>
      <Middle>
        <Search
          onSearch={onSearch}
          currencies={currencies}
          onCurrencyChange={onCurrencyChange}
          currentCurrency={currentCurrency}
        />
      </Middle>
      <IconsContainer>
        <UserIcon>
          <ProfileImg src="/order.jpeg" alt="User" width={40} height={40} />
        </UserIcon>
        <CartButtonContainer>
          <Cart
            icon={faCartShopping}
            size="2x"
            onClick={toggleCartVisibility}
          />
          {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
        </CartButtonContainer>
      </IconsContainer>
    </HeaderContainer>
  );
};

export default Header;
