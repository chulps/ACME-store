# ACME Store

This is a front-end technical assignment for Autify, implementing an online store with the following features:
- View products
- Paginate / search for products
- Add products to cart
- Remove products from cart
- See a list of products in cart
- See the total price of the items in cart
- Change the currency
- Check out

## Tech Stack

- **React**
- **TypeScript**
- **Next.js**
- **Styled-components**
- **FontAwesome**

## Getting Started

### Prerequisites

- Node.js
- Yarn (recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/chulps/ACME-store.git
cd ACME-store
```

2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

4. Open the application in your browser
[localhost](http://localhost:3000)
<a href="http://localhost:3000">localhost:3000</a>


### Build the project
1. Run the 'build' command

```bash
yarn build
```

2. Start the production server:

```bash
yarn start
```

### Linting and Testing

1. To run the linter:

```bash
yarn lint
```

2. To run tests:

```bash
yarn test
```

## Project Structure

- `components/`: Contains the React components used in the application.
  - `Cart.tsx`: Component for the shopping cart.
  - `CartItem.tsx`: Component for individual cart items.
  - `CurrencySelector.tsx`: Component for selecting currency.
  - `Footer.tsx`: Component for the footer.
  - `Header.tsx`: Component for the header.
  - `Pagination.tsx`: Component for pagination.
  - `ProductCard.tsx`: Component for individual product cards.
  - `ProductList.tsx`: Component for listing products.
  - `Search.tsx`: Component for the search bar.
- `pages/`: Contains the Next.js pages.
  - `index.tsx`: Main page component.
  - `_app.tsx`: Custom App component that came with the starter code.
  - `_document.tsx`: Custom Document required for styled-components
- `common/`: Contains shared types and utilities.
  - `types.ts`: Type definitions for the project.
  - `data.ts`: Sample data for the project.
- `public/`: Contains static assets.
  - `images/`: Directory for image files.
- `styles/`: Contains global styles.
  - `globals.css`: Global CSS styles. All other CSS styles are scoped to the components.
- `api/`: Contains API routes.
  - `items.ts`: API route for fetching items.
  - `currencies.ts`: API route for fetching currencies.


## Features

### View Products
- The main screen displays a list of products fetched from the API.

### Search Products
- Products can be searched for by their title

### Change the Currency
- A currency selector allows changing the currency displayed for product prices and the total price in the cart.

### Paginate / Search for Products
- Pagination is implemented to navigate through pages of products.
- A search bar allows filtering products by their titles.

### Add / Remove Products to/from Cart
- Each product card has an "Add to Cart" button.
- Products in the cart can be removed using the "Remove" button.

### View Cart
- The cart can be hidden or shown by clicking the cart icon in the header

### See a List of Products in Cart
The cart view shows a list of products added to the cart, along with their details and a total price.

### Check Out
- Clicking the "Checkout" button shows a success message.
- The order details are logged to the console.



## API Endpoints

### GET /api/currencies

#### Request
Fetches the supported currencies.

#### Response
- **200 OK**
  - **Content:** An array of currency objects.
  
#### Example Response
```json
[
  { "key": "usd", "symbol": "$", "usdCoef": 1 },
  { "key": "eur", "symbol": "€", "usdCoef": 0.87534666 },
  { "key": "gbp", "symbol": "£", "usdCoef": 0.7386999 },
  { "key": "cad", "symbol": "$", "usdCoef": 1.2671499 },
  { "key": "jpy", "symbol": "¥", "usdCoef": 115.52954 }
]
```

### GET /api/items
- Request: Fetches a list of items.

#### Parameters
- limit (number, optional, default: 10): The number of items to return.
- offset (number, optional, default: 0): The number of items to skip before starting to collect the result set.
- query (string, optional): A search query to filter items by title.

#### Response
- 200 OK
  - Content: An object containing total number of items, items per page, and an array of item objects.
  - Example Response:
```json
  {
  "total": 2,
  "perPage": 10,
  "items": [
    {
      "id": "0ba77542-6821-4124-b014-60a892309a8e",
      "title": "Explosive tennis balls",
      "description": "Tickle your friends! Surprise your opponent!",
      "imageSrc": "https://...",
      "price": 4.99,
      "priceCurrency": "usd",
      "createdAt": "2022-01-10T10:39:39.607Z",
      "updatedAt": "2020-02-28T09:06:27.298Z"
    },
    {
      "id": "98024716-6ca5-49ac-bbd6-a733a47f97a9",
      "title": "Dehydrated Boulders",
      "description": "Just add water",
      "imageSrc": "https://...",
      "price": 7.49,
      "priceCurrency": "eur",
      "createdAt": "2022-01-10T10:39:39.607Z",
      "updatedAt": "2020-02-28T09:06:27.298Z"
    }
  ]
}
```

## Author
Charles (Chuck) Howard

### Contact
- Email: chuckoward@gmail.com
- LinkedIn: Charles Howard
- Portfolio: www.chuck-howard.com
- License
- This project is licensed under the MIT License - see the LICENSE file for details.