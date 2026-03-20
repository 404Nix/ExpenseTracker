import { Category } from "../models/category.model.js";

export const listCategories = async (req, res) => {
    const userId = req.user.id;
    const categories = await Category.find({userId}).sort({name: 1}).lean();

    res.status(200).json({ categories: categories.map((c) => ({ id: String(c._id), name: c.name })) });
};

export const createCategories = async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;

    try {
        const cat = await Category.create({ userId, name: name });
        res.status(201).json({ category: { id: String(cat._id), name: cat.name } });
    } catch (e) {
        if (e.code === 11000) return res.status(409).json({ message: 'Category already exists' });
        throw e;
    }
};

export const deleteCategories = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await Category.findOneAndDelete({ _id: id, userId });
    if (!deleted)
        return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ ok: true });
};
