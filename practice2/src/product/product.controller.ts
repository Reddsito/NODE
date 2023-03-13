import { Controller, Get, Post, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from "@nestjs/common";
import { CreateProductDTO } from "./dto/product.dto";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {

    constructor(private productService : ProductService){}

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products
        })
    }

    @Get('/:id')
    async getProduct(@Res() res, @Param('id') id) {
        const product = await this.productService.getProduct(id);
        if(!product) throw new NotFoundException('Product Does not exists');
        res.status(HttpStatus.OK).json({
            product
        })
    }

    @Post("/create")
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        
        const product = await this.productService.createProduct(createProductDTO)

        return res.status(HttpStatus.OK).json({
            message: "Product Successfully Created",
            product
        });
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('id') id){
        const product = await this.productService.deleteProduct(id);
        if(!product) throw new NotFoundException('Product Does not exists');

        return res.status(HttpStatus.OK).json(product);
    }
}
