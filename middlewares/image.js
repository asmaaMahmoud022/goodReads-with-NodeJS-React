const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

function validateImage(file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        validateImage(file, cb)
    }
}).single('image')

module.exports = upload
