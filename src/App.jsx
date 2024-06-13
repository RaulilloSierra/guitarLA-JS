import { Fragment, useState } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db.js";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(e) {
    const guitarExist = cart.findIndex((guitar) => guitar.id === e.id);
    console.log(guitarExist);
    setCart([...cart, e]);
  }

  return (
    <Fragment>
      <Header />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
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
