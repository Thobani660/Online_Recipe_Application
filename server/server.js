const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite3 with Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define a Recipe model
const Recipe = sequelize.define('Recipe', {
  name: Sequelize.STRING,
  category: Sequelize.STRING,
  ingredients: Sequelize.TEXT,
  instructions: Sequelize.TEXT
});

// Sync the database
sequelize.sync().then(() => console.log('Database synced'));

// Routes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Error fetching recipes');
  }
});

// Add a recipe (POST request)
app.post('/recipes', async (req, res) => {
  const { name, category, ingredients, instructions } = req.body;
  try {
    const newRecipe = await Recipe.create({ name, category, ingredients, instructions });
    res.json(newRecipe);
  } catch (err) {
    res.status(500).send('Error adding recipe');
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
