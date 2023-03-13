const { Router } = require("express")
const axios = require('axios')

const router = Router();

router.get('/', (req, res) => {
    //req tiene un titulo, header, y body.
    console.log(req.body)
    const title = "página con Express"
    res.render('index',  {title})
})

router.get('/About', (req, res) => {
    res.render('about')
})

router.get('/posts', async (req, res) => {


   const response =  await axios.get('https://jsonplaceholder.typicode.com/posts')



    res.render('posts', {
        posts: response.data
    })
})

module.exports = router;