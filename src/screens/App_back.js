import React from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import store from "./store";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <a href="/">React Shopping Cart</a>
            </header>
            <main>
              <div className="content">
                <div className="main">
                  <Filter></Filter>
                  <Products />
                  {/* <Products addToCart={this.addToCart}></Products> */}
                  {/* <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                /> */}

                  {/* <Products
                  products={this.state.products}
                  addToCart={this.addToCart}
                /> */}
                </div>
                <div className="sidebar">
                  <Cart />
                  {/* <Cart
                  createOrder={this.createOrder}
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                /> */}
                </div>
              </div>
              Product List
            </main>
            <footer>All right is reserved</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
  // constructor() {
  //   super();
  //   this.state = {
  //     products: data.products,
  //     cartItems: localStorage.getItem("cartItems")
  //       ? JSON.parse(localStorage.getItem("cartItems"))
  //       : [],
  //     size: "",
  //     sort: "",
  //   };
  // }

  // createOrder = (order) => {
  //   alert("Implement order");
  // };
  // removeFromCart = (product) => {
  //   const cartItems = this.state.cartItems.slice();
  //   this.setState({
  //     cartItems: cartItems.filter((item) => item._id !== product._id),
  //   });
  //   localStorage.setItem(
  //     "cartItems",
  //     JSON.stringify(cartItems.filter((item) => item._id !== product._id))
  //   );
  // };
  // addToCart = (product) => {
  //   const cartItems = this.state.cartItems.slice();
  //   let alreadyInCart = false;
  //   cartItems.forEach((item) => {
  //     if (item._id === product._id) {
  //       item.count++;
  //       alreadyInCart = true;
  //     }
  //   });
  //   if (!alreadyInCart) {
  //     cartItems.push({ ...product, count: 1 });
  //   }
  //   this.setState({ cartItems });
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // };
  // sortProducts = (event) => {
  //   console.log(event.target.value);
  //   const sort = event.target.value;
  //   this.setState((state) => ({
  //     sort: sort,
  //     products: this.state.products
  //       .slice()
  //       .sort((a, b) =>
  //         sort === "lowest"
  //           ? a.price > b.price
  //             ? 1
  //             : -1
  //           : sort === "highest"
  //           ? a.price < b.price
  //             ? 1
  //             : -1
  //           : a._id > b._id
  //           ? 1
  //           : -1
  //       ),
  //   }));
  // };
  // filterProducts = (event) => {
  //   console.log(event.target.value);
  //   if (event.target.value === "") {
  //     this.setState({ size: event.target.value, product: data.products });
  //   } else {
  //     this.setState({
  //       size: event.target.value,
  //       products: data.products.filter(
  //         (product) => product.availableSizes.indexOf(event.target.value) >= 0
  //       ),
  //     });
  //   }
  // };
}
