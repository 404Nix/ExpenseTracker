export const updateBudget = (req, res) => {
    const userId = req.user.id;
    res.json({
        ok:true,
        userId: userId
    })
}