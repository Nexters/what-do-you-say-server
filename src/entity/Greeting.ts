import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

export class Greeting extends BaseEntity {
  @PrimaryGeneratedColumn()
  greetingId!: number

  @Column('varchar', { default: '', comment: '상황' })
  state!: string

  @Column('varchar', { default: '', comment: '존대 정도' })
  honorific!: string

  @Column('varchar', { default: '', comment: '문장 길이' })
  sentenceLength!: string

  @Column('text', { default: '', comment: '인사말' })
  contents!: string
}
