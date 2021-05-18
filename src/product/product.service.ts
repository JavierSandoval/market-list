import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, EditProductDto } from './dtos';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: string) {
        const product = await this.productRepository.findOne(id);
        if(!product) throw new NotFoundException('No se encuentra el producto solicitado');

        return product;
    }

    async create(dto: CreateProductDto){
        const productExist = await this.productRepository.findOne({ id: dto.id });
        if(productExist) throw new BadRequestException(`El producto ${dto.id} ya se encuentra registrado`);

        const newProduct = this.productRepository.create(dto);
        const product = await this.productRepository.save(newProduct);

        return product;
    }

    async editOne(id: string, dto: EditProductDto){
        const product = await this.productRepository.findOne(id);

        if(!product) throw new NotFoundException('No se encuentra el producto solicitado');

        const editProduct = Object.assign(product, dto);
        return await this.productRepository.save(editProduct);
    }

    async deleteOne(id: string){
        return await this.productRepository.delete(id);
    }
}
