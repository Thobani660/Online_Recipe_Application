import React, { useState, useEffect } from "react";
import axios from "axios";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    picture: "",
    ingredients: "",
    instructions: "",
    category: "",
    prepTime: "",
    cookTime: "",
    servings: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [expandedRecipes, setExpandedRecipes] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);

    axios
      .get("http://localhost:5000/recipes")
      .then((response) => setRecipes([...storedRecipes, ...response.data]))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleAddRecipe = (e) => {
    e.preventDefault();

    const updatedRecipes = [...recipes, newRecipe];

    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    setNewRecipe({
      name: "",
      picture: "",
      ingredients: "",
      instructions: "",
      category: "",
      prepTime: "",
      cookTime: "",
      servings: "",
    });
    setShowForm(false);
  };

  const handleEditRecipe = (e) => {
    e.preventDefault();

    const updatedRecipes = [...recipes];
    updatedRecipes[editIndex] = newRecipe;

    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    setNewRecipe({
      name: "",
      picture: "",
      ingredients: "",
      instructions: "",
      category: "",
      prepTime: "",
      cookTime: "",
      servings: "",
    });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe, index) => index !== id);

    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const toggleRecipeDetails = (index) => {
    setExpandedRecipes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const startEditRecipe = (index) => {
    setNewRecipe(recipes[index]);
    setEditIndex(index);
    setIsEditing(true);
    setShowForm(true);
  };
  const [shareOptionsVisible, setShareOptionsVisible] = useState(
    recipes.map(() => false)
  );

  // Toggle share options dropdown for the recipe
  const toggleShareOptions = (index) => {
    const newShareOptionsVisible = [...shareOptionsVisible];
    newShareOptionsVisible[index] = !newShareOptionsVisible[index];
    setShareOptionsVisible(newShareOptionsVisible);
  };

  // WhatsApp Sharing
  const shareOnWhatsApp = (recipe) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `Check out this recipe: ${recipe.name} - ${window.location.href}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Facebook Sharing
  const shareOnFacebook = (recipe) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&quote=${encodeURIComponent(`Check out this recipe: ${recipe.name}`)}`;
    window.open(facebookUrl, "_blank");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 style={{ color: "white" }}>Recipe Manager</h1>
      <button
        onClick={() => {
          setShowForm(true);
          setIsEditing(false);
        }}
        style={{
          backgroundColor: "yellow",
          padding: "10px",
          borderRadius: "10px",
          border: "2px solid #dc262671",
          boxShadow: "2px 2px gold",
        }}
      >
        Create New Recipe
      </button>
      {showForm && (
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            backgroundImage: `url(${require("../img/360_F_457345607_dW85bYfV9OlN5I2nVveYGib1t1MbrZts.jpg")})`,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            width: "100%",
            margin: "0 auto", // Center the form,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "16px",
              textAlign: "center",
              color: "#4F46E5", // Indigo color
            }}
          >
            {isEditing ? "Edit Recipe" : "Add New Recipe"}
          </h2>
          <div
            style={{
              width: "400px",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <form
              onSubmit={isEditing ? handleEditRecipe : handleAddRecipe}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px", // Space between columns,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Recipe Name"
                    value={newRecipe.name}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, name: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #D1D5DB", // Light gray border
                      borderRadius: "4px",
                      marginBottom: "16px",
                      fontSize: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "border-color 0.3s", // Smooth transition for border color
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Picture URL"
                    value={newRecipe.picture}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, picture: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      marginBottom: "16px",
                      fontSize: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <textarea
                    placeholder="Ingredients"
                    value={newRecipe.ingredients}
                    onChange={(e) =>
                      setNewRecipe({
                        ...newRecipe,
                        ingredients: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      marginBottom: "16px",
                      fontSize: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    required
                  />
                  <textarea
                    placeholder="Instructions"
                    value={newRecipe.instructions}
                    onChange={(e) =>
                      setNewRecipe({
                        ...newRecipe,
                        instructions: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      marginBottom: "16px",
                      fontSize: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Category"
                    value={newRecipe.category}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, category: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      marginBottom: "16px",
                      fontSize: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      marginLeft: "80px",
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Prep Time (mins)"
                    value={newRecipe.prepTime}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, prepTime: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      marginBottom: "16px",
                      fontSize: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      marginLeft: "80px",
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Servings"
                    value={newRecipe.servings}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, servings: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      marginBottom: "16px",
                      fontSize: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      marginLeft: "80px",
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#4F46E5", // Indigo color
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background-color 0.3s",
                  marginLeft: "150px",
                }}
              >
                {isEditing ? "Update Recipe" : "Add Recipe"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  padding: "12px",
                  backgroundColor: "#EF4444", // Red color
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background-color 0.3s",
                  marginLeft: "150px",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <div style={{ color: "white" }}>
        <h1>Recipes List</h1>
      </div>
      <ul className="flex space-x-4 overflow-x-auto justify-center">
        {recipes.map((recipe, index) => (
          <li
            key={index}
            className="bg-white rounded shadow-lg p-4 cursor-pointer"
            onClick={() => toggleRecipeDetails(index)}
            style={{
              width: expandedRecipes[index] ? "400px" : "100px",
              height: expandedRecipes[index] ? "500px" : "100px", // Set height for the expanded state
              transition: "width 0.3s ease, height 0.3s ease", // Add height transition
              border: "3px solid",
              borderRadius: "10px",
              padding: expandedRecipes[index] ? "10px" : "0px",
              display: "flex",
              flexDirection: "column",
              color: "white",
              backgroundColor: "grey",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${require("../img/360_F_816228114_BQsMoU6mKBjkWqvz3cuZZaP6x7iTcaA7.jpg")})`,
                width: "100%",
                height: "100%", // Take half the height
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                borderRadius: "10px",
              }}
            >
              <h2 className="text-xl font-bold text-center">{recipe.name}</h2>
            </div>

            {expandedRecipes[index] && (
              <div
                style={{
                  height: "90%",
                  overflowY: "auto",
                  paddingTop: "0px",
                  justifyContent: "flex-start",
                  fontSize: "bolder",
                }}
              >
                <p>
                  <strong>Ingredients :</strong>
                  <br /> {recipe.ingredients}
                </p>
                <p>
                  <strong>Instructions :</strong>
                  <br /> {recipe.instructions}
                </p>
                <p>
                  <strong>Category :</strong>
                  <br /> {recipe.category}
                </p>
                <p>
                  <strong>Prep Time :</strong>
                  <br /> {recipe.prepTime} mins
                </p>
                <p>
                  <strong>Cook Time :</strong>
                  <br /> {recipe.cookTime} mins
                </p>
                <p>
                  <strong>Servings :</strong>
                  <br /> {recipe.servings}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditRecipe(index);
                    }}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "lightgreen",
                      width: "100px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRecipe(index);
                    }}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "red",
                      width: "100px",
                    }}
                  >
                    Delete
                  </button>
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShareOptions(index); // Show share options
                    }}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "blue",
                      color: "white",
                      width: "100px",
                    }}
                  >
                    Share
                  </button>
                  {/* Show Share Options if active */}
                  {/* Show Share Options if active */}
                  {shareOptionsVisible[index] && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        onClick={() => shareOnWhatsApp(recipe)}
                        style={{
                          marginBottom: "8px",
                          padding: "5px",
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Share on WhatsApp
                      </button>
                      <button
                        onClick={() => shareOnFacebook(recipe)}
                        style={{
                          padding: "5px",
                          backgroundColor: "#3b5998",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Share on Facebook
                      </button>
                    </div>
                  )}
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
