const controller = require("../controllers/users.controller");

module.exports = (req, res, users, recipes) => {
    if (req.url.match(/^\/api\/users\/\d+\/favoriteRecipe$/) && req.method === "GET") { controller.getFavorite(req, res, users, recipes); return true; }
    if (req.url.match(/^\/api\/users\/\d+\/favoriteRecipe\/\d+$/) && req.method === "PUT") { controller.setFavorite(req, res, users, recipes); return true; }

    return false;
};

