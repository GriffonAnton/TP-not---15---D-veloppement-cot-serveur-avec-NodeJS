exports.findById = (users, id) =>
    users.find(u => u.id === id);

exports.getFavorite = (user, recipes) =>
    recipes.find(r => r.id === user.favoriteRecipeId);

exports.setFavorite = (user, recipeId) => {
    user.favoriteRecipeId = recipeId;
    return user;
};
