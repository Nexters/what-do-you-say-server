import { getRepository } from 'typeorm'
import { LoginType, Member } from '@entity/Member'

export const MemberFactory = {
  build: (attrs: Partial<Member> = {}) => {
    const memberAttr: Partial<Member> = {
      email: 'email',
      key: 'key',
      type: LoginType.APPLE,
      ...attrs,
    }
    return getRepository(Member).create(memberAttr)
  },

  create: async (attrs: Partial<Member> = {}) => {
    const member = MemberFactory.build(attrs)
    return getRepository(Member).save(member)
  },

  deleteAll: async () => getRepository(Member).query('TRUNCATE TABLE member'),
}
