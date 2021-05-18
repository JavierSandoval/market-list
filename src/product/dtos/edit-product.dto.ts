import { CreateProductDto } from './create-product.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class EditProductDto extends PartialType(
    OmitType(CreateProductDto, ['id'] as const)
) {}
