//libs
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// types
import { Currency } from "../common/types";

// components
import CurrencySelector from "./CurrencySelector";

const SearchContainer = styled.header`
  margin: 0 var(--space-2);
  gap: var(--space-2);
  border-bottom: 1px solid var(--secondary);
  grid-area: search;
  display: flex;
  padding-bottom: var(--space-2);

  @media (min-width: 992px) {
    flex-direction: row-reverse;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  justify-content: space-between;
  
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  margin-left: var(--space-2);
  color: var(--secondary);
  z-index: 1;
  opacity: 1;
  transition: opacity 0.3s ease-out;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: var(--space-7);
  border: 1px solid var(--secondary);
  border-radius: var(--space-3);
  padding-left: var(--space-3);

  &:focus {
    padding-left: var(--space-2);
  }

  &:focus + ${SearchIcon} {
    opacity: 0;
  }
`;

const CurrencySelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;

interface SearchProps {
  onSearch: (_query: string) => void;
  currencies: Currency[];
  onCurrencyChange: (_currency: string) => void;
  currentCurrency: string;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  currencies,
  onCurrencyChange,
  currentCurrency,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <SearchContainer>

      <SearchInputContainer>

        <SearchInput
          id="search-input"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
        />
        <SearchIcon icon={faSearch} />


      </SearchInputContainer>
        <CurrencySelectorContainer>
          <CurrencySelector
            currencies={currencies}
            onCurrencyChange={onCurrencyChange}
            currentCurrency={currentCurrency}
          />
        </CurrencySelectorContainer>
    </SearchContainer>
  );
};

export default Search;
