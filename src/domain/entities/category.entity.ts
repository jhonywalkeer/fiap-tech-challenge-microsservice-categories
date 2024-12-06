import { BaseEntity } from '@domain/entities'

export class CategoryEntity extends BaseEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public create_at?: Date,
    public update_at?: Date
  ) {
    super(id, create_at, update_at)
  }
}
