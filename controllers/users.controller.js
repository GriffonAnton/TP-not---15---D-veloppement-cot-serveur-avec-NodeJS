const service = require("../services/users.service");
const { sendJson } = require("../utils/utils");

exports.getFavorite = (req, res, users, recipes) => {
    const id = parseInt(req.url.split("/")[3]);
    if (isNaN(id)) return sendJson(res, 400, { message: "ID invalide" });

    const user = service.findById(users, id);
    if (!user) return sendJson(res, 404, { message: "Utilisateur introuvable" });

    sendJson(res, 200, service.getFavorite(user, recipes));
};

exports.setFavorite = (req, res, users, recipes) => {
    const parts = req.url.split("/");
    const userId = parseInt(parts[3]);
    const recipeId = parseInt(parts[5]);

    if (isNaN(userId) || isNaN(recipeId))
        return sendJson(res, 400, { message: "ID invalide" });

    const user = service.findById(users, userId);
    const recipe = recipes.find(r => r.id === recipeId);

    if (!user || !recipe)
        return sendJson(res, 404, { message: "Introuvable" });

    sendJson(res, 200, service.setFavorite(user, recipeId));
};
