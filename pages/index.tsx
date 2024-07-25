import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import Search from "../components/Search";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Pagination from "../components/Pagination";
import { Product, CartItem, Currency } from "../common/types";

const PageContainer = styled.div`
  display: grid;
  grid-template-rows: fit-content fit-content auto fit-content;
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
      "productlist productlist cart"
      "pagination pagination cart";
  }
`;

const Home = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState("usd");
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [totalItems, setTotalItems] = useState(0);

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

  useEffect(() => {
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
        setItemsPerPage(response.data.perPage);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [searchQuery, currentPage, itemsPerPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
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
    if (!currencyData) return price;
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
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cartItemCount={cartItems.length}
        currencies={currencies}
        onCurrencyChange={handleCurrencyChange}
        currentCurrency={currency}
        onSearch={handleSearch}
      />
      <div className="search-component-mobile">
        <Search
          onSearch={handleSearch}
          currencies={currencies}
          onCurrencyChange={handleCurrencyChange}
          currentCurrency={currency}
        />
      </div>
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
      <style jsx>{`
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
