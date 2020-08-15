import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export enum Property {
  SITUATION = 'situation',
  HONORIFIC = 'honorific',
  SENTENCE_LENGTH = 'sentence_length',
}

@Entity('category')
@Index(['isDisplay'])
@Index(['value', 'property', 'isDisplay'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'category_id', type: 'int' })
  id!: number

  @Column('enum', { enum: Property, default: Property.SITUATION, comment: '속성' })
  property!: Property

  @Column('varchar', { default: '', comment: 'ex) 새해, 설날, 어버이날, 존댓말, 반말, 2줄, 3줄 등등...' })
  value!: string

  @Column('boolean', { default: true, comment: '활성화' })
  isDisplay!: boolean

  @CreateDateColumn({ name: 'created_at', comment: '등록 날짜' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', comment: '수정 날짜' })
  updatedAt!: Date
}
