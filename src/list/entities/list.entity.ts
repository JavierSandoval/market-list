import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('lists')
export class List {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 100 })
    listName: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(type => User, user => user.lists)
    user: User;

    @ManyToMany(type => Product, product => product.lists)
    @JoinTable()
    products: Product[];
}
