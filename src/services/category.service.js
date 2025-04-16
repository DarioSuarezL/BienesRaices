import Category from '../models/category.model.js';

const getCategories = async () => {
    return await Category.findAll();
}


export {
    getCategories,
}