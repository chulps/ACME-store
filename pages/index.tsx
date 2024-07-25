import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Pagination from "../components/Pagination"; // Import Pagination
import { Product, CartItem, Currency } from "../common/types";

const PageContainer = styled.div`
  display: grid;
  grid-template-rows: fit-content fit-content 200px fit-content;
  grid-template-columns: 1fr;
  height: 100dvh;

  grid-template-areas:
    "header"
    "search"
    "productlist"
    "pagination";

  @media screen and (min-width: 992px) {
    grid-template-rows: auto auto auto fit-content fit-content;
    grid-template-columns: 1fr 3fr auto;
    grid-template-areas:
      "header header cart"
      "search search cart"
      "productlist productlist cart"
      "pagination pagination cart";
  }
`;

const Home = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState("usd"); // Default to 'usd'
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCartVisible, setIsCartVisible] = useState(false); // Add state variable for cart visibility

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage, setItemsPerPage] = useState(9); // Items per page (default)

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Fetch supported currencies
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("/api/currencies");
        setCurrencies(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    // Fetch items based on search query and pagination
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/items", {
          params: {
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage,
            query: searchQuery,
          },
        });
        setFilteredItems(response.data.items);
        setTotalItems(response.data.total);
        setItemsPerPage(response.data.perPage); // Dynamically set items per page
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [searchQuery, currentPage, itemsPerPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleAddToCart = (item: Product) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };

  const convertPrice = (price: number, currency: string) => {
    const currencyData = currencies.find((c) => c.key === currency);
    if (!currencyData) return price; // default to the original price if currency data is not found
    return price * currencyData.usdCoef;
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + convertPrice(item.price, currency),
    0
  );

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <Head>
        <title>Acme Store</title>
      </Head>
      <Header toggleCartVisibility={toggleCartVisibility} cartItemCount={cartItems.length} />
      <Search
        onSearch={handleSearch}
        currencies={currencies}
        onCurrencyChange={handleCurrencyChange}
        currentCurrency={currency}
      />
      <ProductList
        products={filteredItems}
        onAddToCart={handleAddToCart}
        convertPrice={convertPrice}
        currency={currency}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Cart
        items={cartItems}
        onRemove={handleRemoveFromCart}
        totalPrice={totalPrice}
        isVisible={isCartVisible}
        onClose={toggleCartVisibility}
        currentCurrency={currency}
        convertPrice={convertPrice}
      />
    </PageContainer>
  );
};

export default Home;
