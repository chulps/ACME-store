import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "../components/Header";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Pagination from "../components/Pagination"; // Import Pagination
import { currencies, items as initialItems } from "../common/data";
import { Product, CartItem } from "../common/types";

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
    grid-template-rows: 100px fit-content auto fit-content fit-content;
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
  const [filteredItems, setFilteredItems] = useState<Product[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCartVisible, setIsCartVisible] = useState(false); // Add state variable for cart visibility

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 15; // Items per page

  useEffect(() => {
    const filtered = initialItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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

  // Calculate items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
      <ProductList products={currentItems} onAddToCart={handleAddToCart} />
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
        currentCurrency={currency} // Pass currentCurrency prop
      />
    </PageContainer>
  );
};

export default Home;
