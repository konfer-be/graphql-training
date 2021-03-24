import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Book extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({
        length: 64,
        unique: true
    })
    title: string;

    @Field(() => String)
    @Column({
        length: 32
    })
    author: string;

    @Field(() => Boolean)
    @Column({
        default: false
    })
    isPublished: boolean
}