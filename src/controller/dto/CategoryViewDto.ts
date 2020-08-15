import { Category, Property } from '@entity/Category'

export default class CategoryViewDto {
  private property: Property = Property.SITUATION

  private value: string = ''

  public setproperty(value: Property): CategoryViewDto {
    this.property = value
    return this
  }

  public setValue(value: string): CategoryViewDto {
    this.value = value
    return this
  }

  public getProperty(): Property {
    return this.property
  }

  public getValue(): string {
    return this.value
  }

  public static of(category: Category): CategoryViewDto {
    return new CategoryViewDto().setproperty(category.property).setValue(category.value)
  }
}
