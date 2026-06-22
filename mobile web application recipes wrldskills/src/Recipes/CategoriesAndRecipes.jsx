import React, { useState, useEffect } from "react";
import { applyTheme } from "../utils/theme";

const CategoriesAndRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
      })
      .catch(err => {
        console.error("Ошибка загрузки рецептов:", err);
        setRecipes([]);
      });
  }, []);

  const toggleRecipe = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const getIngredients = (recipe) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} ${measure}`);
      }
    }

    return ingredients;
  };


  const savedTheme = localStorage.getItem('theme') || 'system';

  const [selectedTheme, setSelectedTheme] = useState(savedTheme);
  const [appliedTheme, setAppliedTheme] = useState(savedTheme);

  useEffect(() => {
    applyTheme(appliedTheme);
  }, [appliedTheme]);

  const handleApply = () => {
    setAppliedTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  return (
    <main className="page">
      <section className="faq-recipes">

        <h2>Блюда и рецепты</h2>
        <p className="section-subtitle">Нажмите на блюдо, чтобы увидеть ингредиенты и способ приготовления.</p>

        <div className="faq-list">
          {recipes.map(recipe => (
            <div key={recipe.idMeal} className="faq-item">

              <button
                className="faq-title"
                onClick={() => toggleRecipe(recipe.idMeal)}
              >
                {recipe.strMeal}
                <span>{activeId === recipe.idMeal ? "−" : "+"}</span>
              </button>
              
              {activeId === recipe.idMeal && (
                <div className="faq-content">

                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="faq-image"
                  />

                  <h4>Ингредиенты</h4>
                  <ul className="ingredients-list">
                    {getIngredients(recipe).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h4>Рецепт</h4>
                  <p className="recipe-text">
                    {recipe.strInstructions}
                  </p>

                </div>
              )}

            </div>
          ))}
        </div>

      </section>

      
      <section id="settings">

          <div className="settings">
              <h2>Настройки</h2>

              <div className="settings-card">
                <p className="settings-title">Тема оформления</p>

                <label className="radio">
                    <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={selectedTheme === "light"}
                        onChange={() => setSelectedTheme("light")} 
                    />
                    Светлая
                </label>

                <label className="radio">
                    <input 
                      type="radio" 
                      name="theme"
                      value="dark"
                      checked={selectedTheme === 'dark'}
                      onChange={() => setSelectedTheme('dark')}
                    />
                    Темная
                </label>

                <label className="radio">
                    <input 
                      type="radio"
                      name="theme"
                      value="system"
                      checked={selectedTheme === 'system'}
                      onChange={() => setSelectedTheme('system')} 
                    />
                    Как в системе
                </label>
                <button className="apply-btn" onClick={handleApply}>
                  Применить
                </button>
              </div>
          </div>

      </section>
    </main>
  );
};

export default CategoriesAndRecipes;
