import React from "react";
import Carousol from "./Elements/Carousol";
const Shop = () => {

  return (
    <div className="container">
      <div className="p-3">
        <h1 className="text-center">Jay Pavansut Kirana Stores</h1>
        <div className="text-muted text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
          veritatis a mollitia corrupti, laudantium enim incidunt fugit
          perferendis eum, magnam necessitatibus ipsa quam corporis quos atque
          magni nobis quibusdam optio.
        </div>
        <div>
          <Carousol data={["arr", "obj", "hello"]} /> 
          {/* Here we pass those images array */}
        </div>

        <div>

        </div>
      </div>
    </div>
  );
};

export default Shop;
