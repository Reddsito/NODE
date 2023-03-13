
const homeController = (req,res) => {
    return res.render('index', {mode: "", errors: ""})
}

export default homeController;