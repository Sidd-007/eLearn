const multer = require('multer')
//setting up the multer engine  
const storage = multer.diskStorage({})
const upload = multer({ storage: storage })

module.exports = upload