// Creates a controller action called "home"
export const home = (_, res) => {
    // Renders our home page view
    res.render("pages/home");
};

// Creates a controller action called "error"
export const error = (_, res) => {
    // Renders our error page view
    res.render("errors/404");
};
