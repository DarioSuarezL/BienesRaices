import Category from "../models/category.model.js"

const seedCategories = async () => {
    try {
        const categories = [
            { name: 'Terrenos' },
            { name: 'Departamentos' },
            { name: 'Casas' },
            { name: 'Cabañas' }
        ]
        await Category.bulkCreate(categories)
        console.log("Categories seeded successfully")
    } catch (error) {
        console.error("Error seeding categories: ", error)
    }
}

const truncateCategories = async () => {
    try {
        await Category.destroy({ where: {}, truncate: true })
        console.log("Categories truncated successfully")
    } catch (error) {
        console.error("Error truncating categories: ", error)
    }
}

export {
    seedCategories,
    truncateCategories
}
