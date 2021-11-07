module.exports = {
  mode: "jit",
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        "minus-nav": "90vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
