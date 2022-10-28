import React, {useEffect, useState} from "react";


const App = () => {
  const [ingredient, setIngredients] = useState([]);
  useEffect(() => {
     fetch('http://localhost:3000/api/v1/pos')
        .then((response) => response.json())
        .then((response) => {console.log(response.body)})
        .then((data) => {
           console.log(data);
           setIngredients(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

   return (
      <div className="ingredients-container">
        {ingredient.map((ingredient) => {
         return (
               <div className="ingredient-id" key={ingredient.id}>
               <h2 className="ingredient-name">{ingredient.name}</h2>
               <h3 className="ingredient-price">{ingredient.price}</h3>
               <h3 className="ingredient-calories">{ingredient.calories}</h3>
               <h4 className="ingredient-inventory">{ingredient.inventory}</h4>
               <div className="button">
                  <div className="delete-btn">Delete</div>
               </div>
            </div>
         );
      })}
   </div>
   );
}
/*
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pos" element={<POSPage />} />
      </Routes>
    </Router>
  );
}*/

export default App;
