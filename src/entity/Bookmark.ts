import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Greeting } from '@entity/Greeting'

@Entity('bookmark')
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'bookmark_id', type: 'bigint' })
  id!: number

  @Column('boolean', { default: false, comment: '인사말을 해당 회원이 북마크 했는지 판별하기 위함' })
  isOn!: boolean

  @Column('bigint', { default: 0, comment: '회원 ID' })
  memberId!: number

  @ManyToMany(() => Greeting, { cascade: true })
  @JoinTable({
    name: 'bookmark_greeting',
    joinColumn: { name: 'bookmark_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'greeting_id', referencedColumnName: 'id' },
  })
  greetings!: Array<Greeting>
}
