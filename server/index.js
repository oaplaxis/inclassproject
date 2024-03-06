import app from "./app.js";

const port = process.env.PORT || 3000;

// Middleware to handle 404 errors and redirect
app.use((req, res, next) => {
    res.status(404).render("errors/404"); // Load a specific page for 404 errors
  });

// Starts the Express server
const server = app.listen(port, () => console.log(`API listening on http://localhost:${port}`));

export default server;
