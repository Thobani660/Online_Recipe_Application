import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    picture: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/recipes', newRecipe);
      setRecipes([...recipes, newRecipe]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl">Recipes</h1>
      <form onSubmit={handleAddRecipe}>
        {/* Form fields for new recipe */}
        <input
          type="text"
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          className="block mb-2"
        />
        {/* Other fields for picture, ingredients, instructions, etc. */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4">Add Recipe</button>
      </form>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h2>{recipe.name}</h2>
            <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
            {/* Add update functionality here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipesPage;
