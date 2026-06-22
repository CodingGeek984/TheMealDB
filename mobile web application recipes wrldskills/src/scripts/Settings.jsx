import React from "react";
import { useState, useEffect } from "react";
import { applyTheme } from "../utils/theme";


const Settings = () => {
    const savedTheme = localStorage.getItem("theme") || "system";

    const [selectedTheme, setSelectedTheme] = useState(savedTheme);
    const [appliedTheme, setAppliedTheme] = useState(savedTheme);

    useEffect(() => {
        applyTheme(appliedTheme);
    }, [appliedTheme]);

    const handleApply = () => {
        setAppliedTheme(selectedTheme);
        localStorage.setItem("theme", selectedTheme);
    };

    return (
        <section className="page" id="settings">
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
        
    );
};

export default Settings;