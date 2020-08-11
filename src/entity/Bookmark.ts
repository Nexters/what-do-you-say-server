import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Greeting } from '@entity/Greeting'

@Entity('bookmark')
@Index(['memberId', 'greeting'])
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'bookmark_id', type: 'bigint' })
  id!: number

  @Column('boolean', { default: false, comment: '인사말을 해당 회원이 북마크 했는지 판별하기 위함' })
  isOn!: boolean

  @Column('bigint', { default: 0, comment: '회원 ID' })
  memberId!: number

  @ManyToOne(() => Greeting, (greeting: Greeting) => greeting.id)
  @JoinColumn({ name: 'greeting_id' })
  greeting!: Greeting
}
