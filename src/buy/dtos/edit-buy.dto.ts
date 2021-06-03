import { CreateBuyDto } from './create-buy.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class EditBuyDto extends PartialType(
    OmitType(CreateBuyDto, ['id'] as const)
){}
