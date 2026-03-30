import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { product, productDocument } from './schema/product';
import { JwtService } from '@nestjs/jwt';
import { CreateProductDto } from './dto/createproductdto';

@Injectable()
export class ProductService {
   constructor(
     @InjectModel(product.name) private productModel: Model<productDocument>,
     private jwtService: JwtService
   ) {}

   async createProduct(dto: CreateProductDto) {
        const createproduct= new this.productModel(dto);
        return createproduct.save();
    }

    async getAllProducts() {
        const products= await this.productModel.find();
        return products;
    }

    async getproductById(id: string) {
        const product= await this.productModel.findById(id);

        if (!product) {
        throw new NotFoundException('Product not found');
  }
        return product;

    }

    async updateproduct(id: string, dto: CreateProductDto) {
         if (!Types.ObjectId.isValid(id)) {
  throw new BadRequestException('Invalid Product Id');
}
        const updatedproduct= await this.productModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updatedproduct) {
        throw new NotFoundException('Product not found');
  }
        return updatedproduct;
    }

}
