import styled from 'styled-components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2);
  grid-area: header;
`;

const Title = styled.h1`
  font-size: var(--font-size-h4);
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: normal;
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

interface HeaderProps {
  toggleCartVisibility: () => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ toggleCartVisibility, cartItemCount }) => {
  return (
    <HeaderContainer>
      <Title>
        <h4 style={{ background: 'var(--danger)', padding: '0.25em' }}>ACME</h4>
      </Title>
      <IconsContainer>
        <UserIcon>
          <Image src="/user-icon.png" alt="User" width={40} height={40} />
        </UserIcon>
        <CartButtonContainer>
          <Cart icon={faCartShopping} size="2x" onClick={toggleCartVisibility} />
          {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
        </CartButtonContainer>
      </IconsContainer>
    </HeaderContainer>
  );
};

export default Header;
