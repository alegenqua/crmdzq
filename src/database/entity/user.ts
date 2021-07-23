import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";

@Entity({ name: 'user' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  refreshToken: string;

  @Column()
  activated: boolean;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  password: string;

}