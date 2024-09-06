import { Fragment } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import useCart from "./hooks/useCart.js";

function App() {
  const {
    data,
    cart,
    addToCart,
    deleteFromCart,
    increaseQuantity,
    reduceQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <Fragment>
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        increaseQuantity={increaseQuantity}
        reduceQuantity={reduceQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((g) => {
            return <Guitar key={g.id} guitar={g} addToCart={addToCart} />;
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </Fragment>
  );
}

export default App;
