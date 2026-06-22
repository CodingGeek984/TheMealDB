import React, { useState, useEffect } from "react";
import FavoriteSection from "../favorites/Favorite";

const FAVORITES_KEY = "favorites";

const Main = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [ingredient, setIngredient] = useState("");

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(res => res.json())
      .then(data =>
        setCategories(data.meals.map(c => c.strCategory))
      );

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => res.json())
      .then(data =>
        setCountries(data.meals.map(a => a.strArea))
      );
  }, []);

  useEffect(() => {
    if (!category) {
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          setRecipes(data.meals);
          setFilteredRecipes(data.meals);
        } else {
          setRecipes([]);
          setFilteredRecipes([]);
        }
      });
  }, [category]);

  const applyFilters = () => {
    let result = recipes;

    if (search) {
      result = result.filter(r =>
        r.strMeal.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (country) {
      result = result.filter(r => r.strArea === country);
    }

    if (ingredient) {
      result = result.filter(r =>
        Array.from({ length: 20 }, (_, i) => r[`strIngredient${i + 1}`])
          .filter(Boolean)
          .some(ing =>
            ing.toLowerCase().includes(ingredient.toLowerCase())
          )
      );
    }

    setFilteredRecipes(result);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (!value) {
      setRecipes([]);
      setFilteredRecipes([]);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCountry("");
    setIngredient("");
    setFilteredRecipes(recipes);
  };

  const addToFavorites = (item) => {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    if (saved.some(f => f.id === item.idMeal)) return;

    const updated = [
      { id: item.idMeal, name: item.strMeal, type: "recipes" },
      ...saved,
    ];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">Быстрый поиск рецептов</span>
          <h2>Найди блюдо под настроение</h2>
          <p>Выбирай категорию, фильтруй по названию и сохраняй любимые рецепты в избранное.</p>
        </div>
      </section>

      <section className="home-section" id="home">
        <div className="filters">
          <input
            type="text"
            placeholder="Поиск рецепта"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select value={category} onChange={e => handleCategoryChange(e.target.value)}>
            <option value="">Категория</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select value={country} onChange={e => setCountry(e.target.value)}>
            <option value="">Страна</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

         <input 
            type="text" 
            placeholder="Ингредиент"
            value={ingredient}
            onChange={e => setIngredient(e.target.value)}
          />

          <button className="apply-btn" onClick={applyFilters}>
            Применить
          </button>
          <button className="clear-btn" onClick={clearFilters}>
            Сбросить
          </button>
        </div>

        <div className="recipes-list">
          {!category ? (
            <p className="no-recipes">Выберите категорию блюд</p>
          ) : filteredRecipes.length === 0 ? (
            <p className="no-recipes">Рецепты не найдены</p>
          ) : (
            filteredRecipes.map(r => (
              <div key={r.idMeal} className="recipe-card">
                <img src={r.strMealThumb} alt={r.strMeal} />
                <h3>{r.strMeal}</h3>
                <button
                  className="add-fav-btn"
                  onClick={() => addToFavorites(r)}
                >
                  Добавить в избранное
                </button>
              </div>
            ))
          )}
        </div>

      </section>

    </main>

  );
};

export default Main;
