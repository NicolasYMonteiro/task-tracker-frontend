"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = (
    <ul className="flex flex-col md:items-center mt-4 space-y-2 text-lg md:mt-0 md:flex-row md:space-y-0 md:space-x-6 uppercase">
      <li>
        <a href="/task" className="hover:text-gray-400">
          Tarefas
        </a>
      </li>
      <hr className="border-t border-gray-500/70 w-full" />

      <li>
        <a href="/study" className="hover:text-gray-400">
          Estudos
        </a>
      </li>
      <hr className="border-t border-gray-500/70 w-full" />

      <li>
        <a href="/profille" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faCircleUser} className="hidden md:block ml-2 fa-2xl" />
          <span className="md:hidden">Perfil</span>
        </a>
      </li>
    </ul>
  );

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 p-2 md:p-4 text-zinc-200 transition-colors duration-300 shadow-md bg-zinc-800"
    >
      <div className="flex items-center justify-between px-2 py-2">
        <a
          href="/home"
          className="text-2xl md:text-3xl text-blue-400 font-semibold whitespace-nowrap"
        >
          Atlas Desenvolvimento
        </a>

        <button
          className="flex items-center text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:border-2 px-3 py-1 rounded-md text-lg md:hidden"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu <FontAwesomeIcon icon={faBars} className="ml-2 fa-xs" />
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex md:items-center">{navLinks}</div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">{navLinks}</div>
      )}
    </header>
  );
}

export default Header;