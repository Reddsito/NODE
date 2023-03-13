
const { Router } = require("express")

const router = Router();

router.get('/username', (req, res) => {

    const isActive = true;

    res.render('user', {
        isActive
    })
})

router.get('/profile', (req, res) => {

    res.send('Profile')
})

module.exports = router;