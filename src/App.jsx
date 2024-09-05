import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import db from "../data/db.js";

function App() {
  //Estados locales
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  // cargar datos
  useEffect(() => {
    setData(db);
  }, []);

  // Agregar al carrito
  const addToCart = (obj) => {
    const objExist = cart.findIndex((guitar) => guitar.id === obj.id);
    if (objExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[objExist].quantity++;
      setCart(updatedCart);
    } else {
      obj.quantity = 1;
      setCart([...cart, obj]);
    }
  };

  // Eliminar del carrito
  const deleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  // Incrementar cantidades
  const increaseQuantity = (id) => {
    const increaseQ = cart.map((item) => {
      if (item.id === id && item.quantity < 10) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(increaseQ);
  };

  return (
    <Fragment>
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        increaseQuantity={increaseQuantity}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((g) => {
            return (
              <Guitar
                key={g.id}
                guitar={g}
                setCart={setCart}
                addToCart={addToCart}
              />
            );
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
