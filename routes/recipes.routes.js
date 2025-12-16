const controller = require("../controllers/recipes.controller");

module.exports = (req, res, recipes) => {
    if (req.url === "/api/recipes" && req.method === "GET") { controller.getAll(res, recipes); return true; }
    if (req.url.match(/^\/api\/recipes\/\d+$/) && req.method === "GET") { controller.getOne(req, res, recipes); return true; }
    if (req.url === "/api/recipes" && req.method === "POST") { controller.create(req, res, recipes); return true; }
    if (req.url.match(/^\/api\/recipes\/\d+$/) && req.method === "PUT") { controller.update(req, res, recipes); return true; }
    if (req.url.match(/^\/api\/recipes\/\d+$/) && req.method === "DELETE") { controller.remove(req, res, recipes); return true; }
    if (req.url.startsWith("/api/recipes/search") && req.method === "GET") { controller.search(req, res, recipes); return true; }

    return false;
};

