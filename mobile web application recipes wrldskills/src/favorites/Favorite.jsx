import React, { useState, useEffect } from "react";
import { applyTheme } from "../utils/theme";

const FAVORITES_KEY = "favorites";

const getSavedFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

const FavoriteSection = () => {
  const [favorites, setFavorites] = useState(getSavedFavorites);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const update = () => {
      setFavorites(getSavedFavorites());
    };
    window.addEventListener("favoritesUpdated", update);
    return () => window.removeEventListener("favoritesUpdated", update);
  }, []);

  const handleDelete = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const handleFilter = (type) => setFilter(type);

  const filteredFavorites = favorites.filter(item => filter === "all" ? true : item.type === filter);


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
    <main>

        <section className="page" id="favorite">

          <div className="favorite-section">
            <h2>Избранное</h2>
            <p className="section-subtitle">Все блюда, которые хочется приготовить снова.</p>

            <div className="filter-buttons">
              {["all","recipes","ingredients"].map(type => (
                <button
                  key={type}
                  onClick={()=>handleFilter(type)}
                  className={filter === type ? "active" : ""}
                >
                  {type==="all"?"Все":type==="recipes"?"Рецепты":"Ингредиенты"}
                </button>
              ))}
            </div>

            <div className="favorite-list">
              {filteredFavorites.length===0 && <p className="empty-text">Нет избранных элементов</p>}
              {filteredFavorites.map(item => (
                <div key={item.id} className="favorite-item">
                  <span>{item.name}</span>
                  <button className="delete-btn" onClick={()=>handleDelete(item.id)}>
                    Удалить 
                  </button>
                </div>
              ))}
            </div>
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
                        checked={selectedTheme === "dark"}
                        onChange={() => setSelectedTheme("dark")}
                    />
                    Тёмная
                    </label>

                    <label className="radio">
                    <input
                        type="radio"
                        name="theme"
                        value="system"
                        checked={selectedTheme === "system"}
                        onChange={() => setSelectedTheme("system")}
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

export default FavoriteSection;
