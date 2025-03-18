'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Create a context to store the theme.
const ThemeContext = createContext();

// Define a component called ThemeProvider to provide the theme to its children.
export function ThemeProvider({ children }) {
    // State to store the theme, initially set to 'light'.
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Only access localStorage on the client side after the component mounts.
        if (typeof window !== 'undefined') {
            // Get the stored theme from localStorage, or default to 'light' if not found.
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                setTheme(storedTheme);
            }
        }
    }, []); // Empty dependency array means this runs only once after the first render (client-side)

    // Add/remove the dark class to the body when the theme changes
    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        // Save the current theme to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]); // This runs whenever the theme changes

    // Provide the ThemeContext with the value of [theme, setTheme].
    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

// Define a custom hook useTheme to access the current theme.
export function useTheme() {
    // Use the useContext hook to access the current theme and the function to modify it.
    const [theme, setTheme] = useContext(ThemeContext);

    // Return the current theme and the function to modify it.
    return [theme, setTheme];
}
