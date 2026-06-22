import React from "react";

import { FaHome } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

const Navbar = ({show}) => {
    
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        };
    };

    return (
        <section className="page">
            <div className={show ? 'div active' : 'div'}>
                <div className="sidenav">

                    <ul>
                        <li>
                            <button onClick={() => scrollToSection("home")}><FaHome /> Главная</button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("Recipes")}><MdRestaurantMenu />Рецепты и ингредиенты</button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("favorite")}><MdFavoriteBorder /> Избранное</button>
                        </li>
                    </ul>

                </div>
            </div>
        </section>
        
    );
};

export default Navbar;  
