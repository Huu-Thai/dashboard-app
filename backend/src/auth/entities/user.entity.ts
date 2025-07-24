import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address_line_1?: string;

  @Column({ nullable: true })
  address_line_2?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  nok_name?: string;

  @Column({ nullable: true })
  nok_phone_number?: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    await this.hasPassword();
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    await this.hasPassword();
  }

  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
