import { Role } from "src/modules/roles/entities/role.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 150, nullable: false})
  completeName: string;

  @Column('varchar', {length: 150, unique: true, nullable: false})
  email: string;

  @Column('varchar', {select: false, length: 255, nullable: false})
  password: string;

  @Column('varchar', {length: 255, default: ''})
  img: string;

  @Column('boolean', {default: false})
  isGoogleUser: boolean;

  @Column('boolean', {default: true})
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
