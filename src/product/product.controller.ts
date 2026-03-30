import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createproductdto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('create')
    createproduct(@Body() dto:CreateProductDto) {
        return this.productService.createProduct(dto);
    }  
    
    @Get('all')
    getproducts() {
        const products= this.productService.getAllProducts();
        return products;
    }

    @Get(':id')
    getproductById(@Param('id') id: string) {
        return this.productService.getproductById(id);
    }

    @Put('update/:id')
    updateproduct(@Param('id') id: string, @Body() dto: CreateProductDto) {
        console.log("PARAM ID 👉", id);
        return this.productService.updateproduct(id, dto);
    }

}    
