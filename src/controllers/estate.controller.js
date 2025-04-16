import { getCategories } from "../services/category.service.js"

const index = async (req, res) => {
    res.render('estates/index', {
        page:'Mis propiedades',
    })
}

const create = async (req, res) => {
    const categories = await getCategories()

    res.render('estates/create', {
        page:'Publicar propiedad',
        categories
    })
}


export {
    index,
    create
}