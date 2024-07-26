// components/Search.tsx
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Currency } from "../common/types";
import CurrencySelector from "./CurrencySelector";

const SearchContainer = styled.header`
  margin: 0 var(--space-2);
  gap: var(--space-2);
  grid-area: search;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  border-bottom: 1px solid var(--secondary);
  padding-bottom: var(--space-2);

  @media (min-width: 576px) {
    flex-direction: row-reverse;
  }

  @media (min-width: 992px) {
    padding-bottom: 0;
    border: none;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  justify-content: space-between;
  flex-grow: 1;
  max-width: var(--space-7);

  @media (min-width: 992px) {
    max-width: var(--space-6);
  }
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
`;

interface SearchProps {
  onSearch: (_query: string) => void;
  currencies: Currency[];
  onCurrencyChange: (_currency: string) => void;
  currentCurrency: string;
}

// Define the Search component with the specified props
const Search: React.FC<SearchProps> = ({
  onSearch,
  currencies,
  onCurrencyChange,
  currentCurrency,
}) => {
  // Define a state variable for the search query
  const [query, setQuery] = useState("");

  // Debounced search function to avoid triggering search on every keystroke
  const debouncedSearch = useCallback(
    (query) => {
      
      // Set a timeout to delay the search function
      const handler = setTimeout(() => {
        console.log("Search query from useEffect:", query);
        onSearch(query);
      }, 1000);

      // Clear the timeout if the component is unmounted or the query changes before the timeout completes
      return () => {
        clearTimeout(handler);
      };
    },
    [onSearch]
  );

  // Trigger the debounced search function whenever the query changes
  useEffect(() => {
    console.log("Search useEffect triggered with query:", query);
    return debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Update the query state when the input value changes
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
