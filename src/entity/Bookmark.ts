import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('bookmark')
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: bigint

  @Column('boolean', { default: false, comment: '인사말을 해당 회원이 북마크 했는지 판별하기 위함' })
  isOn!: boolean

  @Column('bigint', { default: 0, comment: '회원 ID' })
  memberId!: bigint

  @Column('bigint', { default: 0, comment: '인사말 ID' })
  greetingId!: bigint
}
