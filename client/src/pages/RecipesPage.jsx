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
  const [showForm, setShowForm] = useState(false);

  // Fetch recipes from localStorage or from server
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);

    axios.get('http://localhost:5000/recipes')
      .then(response => setRecipes([...storedRecipes, ...response.data]))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleAddRecipe = (e) => {
    e.preventDefault();

    const updatedRecipes = [...recipes, newRecipe];
    
    // Save the updated recipes to both state and localStorage
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    // Clear form and hide the form
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
    setShowForm(false); 
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe, index) => index !== id);

    // Update state and localStorage
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Recipe Manager</h1>

      {/* Create New Recipe Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition mb-4"
      >
        Create New Recipe
      </button>

      {/* Conditional Rendering of Recipe Form inside a card */}
      {showForm && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">Add New Recipe</h2>
          <form 
            onSubmit={handleAddRecipe}
            style={{
              width: '500px',
              border: '2px solid #ccc',
              padding: '20px',
              borderRadius: '8px',
              margin: '0 auto'
            }}
          >
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
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Add Recipe
            </button>
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Displaying Recipes Horizontally */}
      <div style={{display:"flex"}}></div>
      <ul className="flex space-x-4 overflow-x-auto">
        {recipes.map((recipe, index) => (
          <li style={{display:"flex",justifyContent:"space-between",borderBottom:"10px solid grey"}} key={index} className="bg-white rounded shadow-lg p-4 w-64 flex-none">
            <h2 className="text-xl font-bold">{recipe.name}</h2> 
            {recipe.picture && (
              <img src={recipe.picture} alt={recipe.name} className="w-full h-32 object-cover rounded mb-2" />
            )}
            <p><strong>Ingredients:</strong><br></br> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong><br></br>  {recipe.instructions}</p>
            <p><strong>Category:</strong> <br></br> {recipe.category}</p>
            <p><strong>Prep Time:</strong> <br></br> {recipe.prepTime} mins</p>
            <p><strong>Cook Time:</strong> <br></br> {recipe.cookTime} mins</p>
            <p><strong>Servings:</strong><br></br>  {recipe.servings}</p>
            <button
              onClick={() => handleDeleteRecipe(index)}
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
