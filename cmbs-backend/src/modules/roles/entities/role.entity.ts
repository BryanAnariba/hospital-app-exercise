import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {unique: true, length: 150})
  roleName: string;

  @Column('boolean', {default: true})
  isActive: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
