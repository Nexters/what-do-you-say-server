import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Bookmark } from './Bookmark'

@Entity('greeting')
@Index(['situation', 'sentenceLength', 'honorific', 'isDeleted'])
export class Greeting extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: bigint

  @Column('varchar', { default: '', comment: '상황' })
  situation!: string

  @Column('varchar', { default: '', comment: '존대 정도' })
  honorific!: string

  @Column('varchar', { default: '', comment: '문장 길이' })
  sentenceLength!: string

  @Column('text', { default: '', comment: '인사말' })
  contents!: string

  @Column('int', { default: 0, comment: '북마크 카운트' })
  bookmarkCount!: number

  @Column('boolean', { default: false, comment: '삭제 여부' })
  isDeleted!: boolean

  @CreateDateColumn({ name: 'created_at', comment: '등록 날짜' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', comment: '수정 날짜' })
  updatedAt!: Date

  @ManyToMany(() => Bookmark, { cascade: true })
  @JoinTable({ name: 'greeting_bookmark' })
  bookmarks!: Bookmark[]
}
