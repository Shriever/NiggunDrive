import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Niggun } from './Niggun';
import { User } from './User';

@Entity()
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  @PrimaryColumn()
  niggunId: number;

  @ManyToOne(() => Niggun, niggun => niggun.likes, { onDelete: 'CASCADE' })
  niggun: Niggun;
}
