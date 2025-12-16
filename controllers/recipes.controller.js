const url = require("url");
const service = require("../services/recipes.service");
const { sendJson, parseBody } = require("../utils/utils");

exports.getAll = (res, recipes) =>
    sendJson(res, 200, service.findAll(recipes));

exports.getOne = (req, res, recipes) => {
    const id = parseInt(req.url.split("/").pop());
    if (isNaN(id)) return sendJson(res, 400, { message: "ID invalide" });

    const recipe = service.findById(recipes, id);
    if (!recipe) return sendJson(res, 404, { message: "Introuvable" });

    sendJson(res, 200, recipe);
};

exports.create = (req, res, recipes) => {
    if (req.headers["content-type"] !== "application/json")
        return sendJson(res, 400, { message: "Content-Type application/json requis" });

    parseBody(req, (err, data) => {
        if (err) return sendJson(res, 400, { message: "JSON invalide" });

        const { name, difficulty, ingredients, isVegetarian } = data;
        if (!name || !difficulty || !Array.isArray(ingredients) || typeof isVegetarian !== "boolean")
            return sendJson(res, 400, { message: "Données invalides" });

        sendJson(res, 201, service.create(recipes, data));
    });
};

exports.update = (req, res, recipes) => {
    const id = parseInt(req.url.split("/").pop());
    if (isNaN(id)) return sendJson(res, 400, { message: "ID invalide" });

    parseBody(req, (err, data) => {
        if (err) return sendJson(res, 400, { message: "JSON invalide" });

        const updated = service.update(recipes, id, data);
        if (!updated) return sendJson(res, 404, { message: "Introuvable" });

        sendJson(res, 200, updated);
    });
};

exports.remove = (req, res, recipes) => {
    const id = parseInt(req.url.split("/").pop());
    if (isNaN(id)) return sendJson(res, 400, { message: "ID invalide" });

    if (!service.remove(recipes, id))
        return sendJson(res, 404, { message: "Introuvable" });

    res.writeHead(204);
    res.end();
};

exports.search = (req, res, recipes) => {
    const query = url.parse(req.url, true).query;
    sendJson(res, 200, service.search(recipes, query));
};
