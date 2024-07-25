// components/Footer.tsx
import styled from 'styled-components';
import CurrencySelector from './CurrencySelector';
import { Currency } from '../common/types';

const FooterContainer = styled.footer`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  border-top: 1px solid var(--dark);
  grid-area: footer;

  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CheckoutButton = styled.button`
  font-size: var(--font-size-default);
`;

interface FooterProps {
  currencies: Currency[];
  currentCurrency: string;
  onCurrencyChange: (_currency: string) => void;
}

const Footer: React.FC<FooterProps> = ({ currencies, currentCurrency, onCurrencyChange }) => {
  return (
    <FooterContainer>
      <CurrencySelector currencies={currencies} onCurrencyChange={onCurrencyChange} currentCurrency={currentCurrency} />
      <CheckoutButton>Checkout</CheckoutButton>
    </FooterContainer>
  );
};

export default Footer;
