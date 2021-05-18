import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Buy } from 'src/buy/entities/buy.entity'; 
import { List } from 'src/list/entities/list.entity';

@Entity('products')
export class Product {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false})
    name: string;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'boolean' })
    available: boolean;

    @ManyToMany(type => Buy, buy => buy.products)
    buys: Buy[];

    @ManyToMany(type => List, list => list.products)
    lists: List[];
}
