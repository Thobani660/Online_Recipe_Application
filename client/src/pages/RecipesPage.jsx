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
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recipes', newRecipe);
      setRecipes([...recipes, response.data]);
      setNewRecipe({
        name: '',
        picture: '',
        ingredients: '',
        instructions: '',
        category: '',
        prepTime: '',
        cookTime: '',
        servings: ''
      });
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Recipe Manager</h1>

      <form onSubmit={handleAddRecipe} className="mb-6 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Recipe</h2>
        <input
          type="text"
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          className="block w-full mb-3 p-2 border rounded shadow-sm"
          required
        />
        <input
          type="text"
          placeholder="Picture URL"
          value={newRecipe.picture}
          onChange={(e) => setNewRecipe({ ...newRecipe, picture: e.target.value })}
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <textarea
          placeholder="Ingredients"
          value={newRecipe.ingredients}
          onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
          className="block w-full mb-3 p-2 border rounded shadow-sm"
          required
        />
        <textarea
          placeholder="Instructions"
          value={newRecipe.instructions}
          onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
          className="block w-full mb-3 p-2 border rounded shadow-sm"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newRecipe.category}
          onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <input
          type="number"
          placeholder="Prep Time (mins)"
          value={newRecipe.prepTime}
          onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <input
          type="number"
          placeholder="Cook Time (mins)"
          value={newRecipe.cookTime}
          onChange={(e) => setNewRecipe({ ...newRecipe, cookTime: e.target.value })}
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <input
          type="number"
          placeholder="Servings"
          value={newRecipe.servings}
          onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
          className="block w-full mb-3 p-2 border rounded shadow-sm"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Add Recipe
        </button>
      </form>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <li key={recipe.id} className="bg-white rounded shadow-lg p-4">
            <h2 className="text-xl font-bold">{recipe.name}</h2>
            {recipe.picture && (
              <img src={recipe.picture} alt={recipe.name} className="w-full h-32 object-cover rounded mb-2" />
            )}
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <button
              onClick={() => handleDeleteRecipe(recipe.id)}
              className="bg-red-500 text-white py-1 px-2 mt-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipesPage;
