import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleHandler = () => {
    const toggledIsDarkMode = !isDarkMode;
    setIsDarkMode(toggledIsDarkMode);
    if (toggledIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="w-36 p-2 justify-between flex items-center fixed bottom-2 bg-gray-100 bg-opacity-15 backdrop-blur-sm left-3 rounded-full z-10">
      <Switch 
          checked={isDarkMode}
          onChange={toggleHandler}
          className='group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center bg-gray-200 bg-opacity-60 rounded-full border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
          <span className="sr-only">Enable dark mode</span>
          <span
            className={`${
              isDarkMode ? 'translate-x-4 bg-blue-300' : 'translate-x-0 bg-white'
            } pointer-events-none inline-block h-4 w-4 rounded-full  shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
        <label as="span" className="label text-sm cursor-pointer ml-3">
          <span className="text-gray-400">Dark Mode</span>
        </label>
    </div>
  );
};

export default ThemeToggle;
