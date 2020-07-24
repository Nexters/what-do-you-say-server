import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'

enum LoginType {
  APPLE = 'apple',
  KAKAO = 'kakao',
  FACEBOOK = 'facebook',
}

@Entity('member')
@Unique(['key'])
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: bigint

  @Column('varchar', { default: '', comment: '고유키 값' })
  key!: string

  @Column('enum', { enum: LoginType, default: LoginType.APPLE, comment: '로그인 타입' })
  type!: LoginType

  @CreateDateColumn({ name: 'created_at', comment: '등록 날짜' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', comment: '수정 날짜' })
  updatedAt!: Date
}
