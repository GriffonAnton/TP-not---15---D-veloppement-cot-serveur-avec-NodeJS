const http = require("http");
const recipesRoutes = require("./routes/recipes.routes");
const usersRoutes = require("./routes/users.routes");
const { sendJson } = require("./utils/utils");

let recipes = [
    { id: 1, name: "Pâtes bolo", difficulty: "moyenne", ingredients: ["pâtes", "tomate", "viande"], isVegetarian: false },
    { id: 2, name: "Salade César", difficulty: "facile", ingredients: ["salade", "poulet"], isVegetarian: false }
];

let users = [
    { id: 1, firstName: "Romain", lastName: "DINEL", favoriteRecipeId: 1 }
];


const server = http.createServer((req, res) => {
    let handled = false;
    handled = recipesRoutes(req, res, recipes) || handled;
    handled = usersRoutes(req, res, users, recipes) || handled;
    if (!handled) {
        sendJson(res, 404, { message: "Route introuvable" });
    }
});

server.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
0