exports.findAll = recipes => recipes;

exports.findById = (recipes, id) => recipes.find(r => r.id === id);

exports.create = (recipes, data) => {
    const recipe = { id: recipes.length + 1, ...data };
    recipes.push(recipe);
    return recipe;
};

exports.update = (recipes, id, data) => {
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) { return null };
    recipes[index] = { id, ...data };
    return recipes[index];
};

exports.remove = (recipes, id) => {
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) { return false };
    recipes.splice(index, 1);
    return true;
};

exports.search = (recipes, query) => {
    let result = recipes;

    if (query.vegetarian !== undefined) {
        result = result.filter(r => r.isVegetarian === (query.vegetarian === "true"));
    }
    if (query.ingredient) {
        result = result.filter(r => r.ingredients.includes(query.ingredient));
    }
    return result;
};
