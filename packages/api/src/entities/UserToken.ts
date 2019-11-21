import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import User from "./User";

@Entity()
export default class UserToken extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
