import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { Currency } from '../common/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDollarSign, faEuroSign, faYenSign, faPoundSign } from '@fortawesome/free-solid-svg-icons';
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const DropdownButton = styled.button`
  padding: 0.5em 1em;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  border: 1px solid var(--secondary);
  width: fit-content;
  cursor: pointer;
  gap: 0;
  align-items: flex-end;
  z-index: 2;

  &:hover {
    background: var(--background-color);
    filter: brightness(1.2);
  }

  @media (min-width: 992px) {
    align-items: flex-start;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  background: var(--dark);
  border: 1px solid var(--secondary);
  overflow-y: auto;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  padding-top: 1em;
  transform: translateY(-1em);
  border-radius: 0 0 1em 1em;
`;

const DropdownMenuItem = styled.li`
  padding: 1em;
  cursor: pointer;
  background: var(--dark);
  &:hover {
    filter: brightness(1.2);
  }
`;

const ChevronIcon = styled(FontAwesomeIcon)`
  margin-left: 0.5em;
`;

const Text = styled.p`
  display: flex;
  justify-content: space-between;
  width: 100%;
  line-height: 1;
`;

// Define the props for the CurrencySelector component
export interface CurrencySelectorProps {
  currencies: Currency[];
  onCurrencyChange: (_currency: string) => void;
  currentCurrency: string;
}

// Mapping of currency keys to FontAwesome icons
const currencyIcons = {
  usd: faDollarSign,
  eur: faEuroSign,
  jpy: faYenSign,
  gbp: faPoundSign,
  cad: faCanadianMapleLeaf,
};

// Define the CurrencySelector component
const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies, onCurrencyChange, currentCurrency }) => {
  
  const [isOpen, setIsOpen] = useState(false); // State to track whether the dropdown is open
  const containerRef = useRef<HTMLDivElement>(null); // Ref to the container element to handle click outside

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCurrencyChange = (currency: string) => {
    onCurrencyChange(currency);
    setIsOpen(false);
  };

  // Close the dropdown menu if the user clicks outside of it while it's open
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Add event listener for click outside on mount and clean up on unmount
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SelectorContainer ref={containerRef}>

      
      <DropdownButton onClick={toggleDropdown}>
        <label>Currency</label>
        <Text>
          <FontAwesomeIcon icon={currencyIcons[currentCurrency as keyof typeof currencyIcons]} /> {currentCurrency.toUpperCase()} {/* Add the currency icon dynamicall */}
          <ChevronIcon icon={faChevronDown} />
        </Text>
      </DropdownButton>

      {isOpen && (
        <DropdownMenu>
          {currencies
            .filter(currency => currency.key !== currentCurrency) // the active currency is not visible in the dropdown menu options
            .map(currency => (
              <DropdownMenuItem key={currency.key} onClick={() => handleCurrencyChange(currency.key)}>
                <FontAwesomeIcon icon={currencyIcons[currency.key as keyof typeof currencyIcons]} /> {/* Add the currency icon */}
                &nbsp;{currency.key.toUpperCase()}
              </DropdownMenuItem>
            ))}
        </DropdownMenu>
      )}
      
    </SelectorContainer>
  );
};

export default CurrencySelector;
