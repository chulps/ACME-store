import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Pagination from "../components/Pagination";
import { Product, CartItem, Currency } from "../common/types";

// Styled-component for the page container using CSS grid layout
const PageContainer = styled.div`
  display: grid;
  grid-template-rows: fit-content fit-content 1fr fit-content;
  grid-template-columns: 1fr;
  height: 100dvh;

  grid-template-areas:
    "header"
    "search"
    "productlist"
    "pagination";

  @media screen and (min-width: 992px) {
    grid-template-rows: fit-content 1fr fit-content;
    grid-template-columns: 1fr 3fr auto;
    grid-template-areas:
      "header header cart"
      "productlist productlist cart"
      "pagination pagination cart";
  }
`;

// Home component
const Home = () => {
  // State variables for the cart items, currency, filtered items, search query, and cart visibility
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState("usd");
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCartVisible, setIsCartVisible] = useState(false);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // State variables for currencies and total items
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch currencies from the API when the component mounts
  useEffect(() => {
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

  // Fetch items from the API when search query, current page, or items per page change
  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items with", {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
          query: searchQuery,
        });
        const response = await axios.get("/api/items", {
          params: {
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage,
            query: searchQuery,
          },
        });
        console.log("Items fetched:", response.data.items);
    
        const itemsWithImages = response.data.items.map((item: any) => ({
          ...item,
          imageSrc: `https://picsum.photos/300/200?random=${item.id}`,
        }));
    
        setFilteredItems(itemsWithImages);
        setTotalItems(response.data.total);
        setItemsPerPage(response.data.perPage);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    

    fetchItems();
  }, [searchQuery, currentPage, itemsPerPage]);

  // Handle search input change
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  // Add item to cart
  const handleAddToCart = (item: Product) => {
    setCartItems([...cartItems, item]);
    console.log("Item added to cart:", item);
  };

  // Remove item from cart
  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    console.log("Item removed from cart:", id);
  };

  // Handle currency change
  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
    console.log("Currency changed:", currency);
  };

  // Convert price based on the selected currency
  const convertPrice = (price: number, currency: string) => {
    const currencyData = currencies.find((c) => c.key === currency);
    if (!currencyData) return price;
    return price * currencyData.usdCoef;
  };

  // Calculate the total price of the items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + convertPrice(item.price, currency),
    0
  );

  // Toggle the visibility of the cart
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
    console.log("Cart visibility toggled:", !isCartVisible);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Current page updated:", page);
  };

  // Handle checkout and clear the cart
  const handleCheckout = () => {
    setCartItems([]);
    console.log("Checkout completed, cart cleared.");
    console.log("Autify! Thank you for giving me a chance to work with you! I hope my solution is good enough for you to consider me for this opportunity! 🙏");
  };

  return (
    <PageContainer>
      {/* Head component to set the page title */}
      <Head>
        <title>Acme Store</title>
      </Head>

      {/* Header component with props */}
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cartItemCount={cartItems.length}
        currencies={currencies}
        onCurrencyChange={handleCurrencyChange}
        currentCurrency={currency}
        onSearch={handleSearch}
      />

      {/* Search component for mobile */}
      <div className="search-component-mobile">
        <Search
          onSearch={handleSearch}
          currencies={currencies}
          onCurrencyChange={handleCurrencyChange}
          currentCurrency={currency}
        />
      </div>

      {/* ProductList component to display the products */}
      <ProductList
        products={filteredItems}
        onAddToCart={handleAddToCart}
        cartItems={cartItems} // Pass cart items to ProductList
        convertPrice={convertPrice}
        currency={currency}
      />

      {/* Pagination component to navigate through pages */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Cart component to display the cart items */}
      <Cart
        items={cartItems}
        onRemove={handleRemoveFromCart}
        totalPrice={totalPrice}
        isVisible={isCartVisible}
        onClose={toggleCartVisibility}
        onCheckout={handleCheckout}
        currentCurrency={currency}
        convertPrice={convertPrice}
      />

      {/* Styles hack for search component visibility on mobile */}
      <style>{`
        .search-component-mobile {
          display: flex;
        }
        @media (min-width: 992px) {
          .search-component-mobile {
            display: none;
          }
        }
      `}</style>
    </PageContainer>
  );
};

export default Home;
