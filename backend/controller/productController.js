const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
// create new products => /api/v1/product/new
exports.newProduct = catchAsyncErrors( async (req, res,next) => {
   
 
   req.body.user = req.user.id
   
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// get all products => /api/v1/products?keyword=Apple
exports.getProducts =catchAsyncErrors( async (req,res, next) => {

    const resPerPage = 4

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                            .search()
                            .filter()
                            .pagination(resPerPage)

    const product = await apiFeatures.query
    res.status(200).json({
        success: true,
        count: product.length,
        product
    })
})

// get single product => /api/v1/product/:id 

exports.getSingleProduct = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    console.log('28',product);

    if(!product){
        // console.log('30');
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found'
        // })
        return next(new ErrorHandler('Product not found ', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

// update product => /admin/api/product/:id
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found'
        // })
        return next(new ErrorHandler('Product not found ', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })

})

// Delete products => /admin/api//product/:id

exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found'
        // })
        return next(new ErrorHandler('Product not found ', 404))
    }
    await Product.remove()

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })

})