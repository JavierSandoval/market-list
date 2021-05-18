import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { Buy } from 'src/buy/entities/buy.entity';
import { List } from 'src/list/entities/list.entity';

@Entity('users')
export class User {

    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false, select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }

    @OneToMany(type => Buy, buy => buy.user)
    buys: Buy[];

    @OneToMany(type => List, list => list.user)
    lists: List[];


}
