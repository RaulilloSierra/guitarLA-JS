import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import db from "./data/db.js";

function App() {
  // Verificar si existe algo en localStorage
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  //Estados locales
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialCart);

  // cargar datos
  useEffect(() => {
    setData(db);
  }, []);

  // Items mínimos y máximos en el carrito de compras
  const maxItems = 3;
  const minItems = 1;

  // Almacenar en LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar al carrito
  const addToCart = (obj) => {
    const objExist = cart.findIndex((guitar) => guitar.id === obj.id);
    if (objExist >= 0) {
      if (cart[objExist].quantity >= maxItems) return;
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
      if (item.id === id && item.quantity < maxItems) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(increaseQ);
  };

  // Reducir cantidades
  const reduceQuantity = (id) => {
    const reduceQ = cart.map((item) => {
      if (item.id === id && item.quantity > minItems) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(reduceQ);
  };

  // Limpiar el carrito de compras
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Fragment>
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        increaseQuantity={increaseQuantity}
        reduceQuantity={reduceQuantity}
        clearCart={clearCart}
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
