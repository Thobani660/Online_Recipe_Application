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
  const [expandedRecipes, setExpandedRecipes] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // State to track which recipe is being edited

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

  const handleEditRecipe = (e) => {
    e.preventDefault();

    const updatedRecipes = [...recipes];
    updatedRecipes[editIndex] = newRecipe; // Update the recipe at editIndex

    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    // Clear form and reset states
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
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe, index) => index !== id);

    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const toggleRecipeDetails = (index) => {
    setExpandedRecipes((prevState) => ({
      ...prevState,
      [index]: !prevState[index] // Toggle the expansion for the clicked recipe
    }));
  };

  const startEditRecipe = (index) => {
    setNewRecipe(recipes[index]); // Set the newRecipe state to the recipe being edited
    setEditIndex(index);
    setIsEditing(true); // Set editing mode to true
    setShowForm(true); // Show the form
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Recipe Manager</h1>

      <button
        onClick={() => {
          setShowForm(true);
          setIsEditing(false); // Reset editing state
        }}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition mb-4"
      >
        Create New Recipe
      </button>

      {showForm && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</h2>
          <div style={{width:"400px"}}>
          <form onSubmit={isEditing ? handleEditRecipe : handleAddRecipe} className="flex flex-col items-center">
           <div style={{display:'flex'}}>
           <div>
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
            </div>
            <div>
            {/* <input
              type="text"
              placeholder="Category"
              value={newRecipe.category}
              onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
              className="block w-full mb-3 p-2 border rounded shadow-sm"
            /> */}
            {/* <input
              type="number"
              placeholder="Prep Time (mins)"
              value={newRecipe.prepTime}
              onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
              className="block w-full mb-3 p-2 border rounded shadow-sm"
            /> */}
            {/* <input
              type="number"
              placeholder="Cook Time (mins)"
              value={newRecipe.cookTime}
              onChange={(e) => setNewRecipe({ ...newRecipe, cookTime: e.target.value })}
              className="block w-full mb-3 p-2 border rounded shadow-sm"
            /> */}
            {/* <input
              type="number"
              placeholder="Servings"
              value={newRecipe.servings}
              onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
              className="block w-full mb-3 p-2 border rounded shadow-sm"
            /> */}
            </div>
           </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              {isEditing ? 'Update Recipe' : 'Add Recipe'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </form>
          </div>
        </div>
      )}

      <ul className="flex space-x-4 overflow-x-auto justify-center">
        <h1>Recipes List</h1>
        {recipes.map((recipe, index) => (
          <li
            key={index}
            className="bg-white rounded shadow-lg p-4 cursor-pointer"
            onClick={() => toggleRecipeDetails(index)}
            style={{
              width: expandedRecipes[index] ? "400px" : "80px",
              transition: "width 0.3s ease",
              border: '3px solid grey',
              borderRadius: "10px",
              padding: expandedRecipes[index] ? "10px" : "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h2 className="text-xl font-bold text-center">{recipe.name}</h2>
            {expandedRecipes[index] && (
              <div className="text-center">
                {recipe.picture && (
                  <img src={recipe.picture} alt={recipe.name} className="w-full h-32 object-cover rounded mb-2" />
                )}
                <p><strong>Ingredients:</strong><br /> {recipe.ingredients}</p>
                <p><strong>Instructions:</strong><br /> {recipe.instructions}</p>
                <p><strong>Category:</strong><br /> {recipe.category}</p>
                <p><strong>Prep Time:</strong><br /> {recipe.prepTime} mins</p>
                <p><strong>Cook Time:</strong><br /> {recipe.cookTime} mins</p>
                <p><strong>Servings:</strong><br /> {recipe.servings}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from toggling details again
                      startEditRecipe(index); // Start editing the selected recipe
                    }}
                    className="bg-blue-500 text-white py-1 px-2 mt-2 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from toggling details again
                      handleDeleteRecipe(index);
                    }}
                    className="bg-red-500 text-white py-1 px-2 mt-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipesPage;
