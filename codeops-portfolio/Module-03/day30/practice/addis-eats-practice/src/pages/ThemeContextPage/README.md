# ThemeContextPage

**Exercise 1.** Create a ThemeContext holding "light" or "dark" and read it from a deeply nested component.

- `ThemeProvider` holds the theme and a `toggleTheme` function.
- `NestedPanel` nests four levels deep and passes no theme props.
- `ThemeReadout`, at the bottom, calls `useTheme()` and changes when you press the toggle.
