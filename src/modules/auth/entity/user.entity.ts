import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Connect } from '../../connect/entities/connect.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: string;

  @OneToMany(() => Connect, (connect) => connect.user)
  connects: Connect[];
}
