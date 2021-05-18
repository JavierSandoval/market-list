import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('buys')
export class Buy {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'timestamp'})
    date: Date;

    @Column({ type: 'int' })
    totalPrice: number;

    @Column({ type: 'int' })
    totalProducts: number;

    @Column({ type: 'boolean' })
    state: boolean;

    @ManyToOne(type => User, user => user.buys)
    user: User;

    @ManyToMany(type => Product, product => product.buys)
    @JoinTable()
    products: Product[];
}
