import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date
}