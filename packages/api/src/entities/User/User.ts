import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  discordId: string;

  @Column()
  username: string;

  @Column({
    nullable: true
  })
  avatar: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
