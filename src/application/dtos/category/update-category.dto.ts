import { IdentifierDTO } from '@application/dtos/common'
import { Field } from '@domain/enums'
import { CreateCategory } from '@domain/interfaces/category'
import { IsStringValidator } from '@presentation/validators'

export class UpdateCategoryDTO extends IdentifierDTO {
  name?: string
  description?: string

  constructor(id: string, fields: Partial<CreateCategory>) {
    super(id)
    if (fields.name) {
      this.name = IsStringValidator(fields.name, Field.Name)
    }
    if (fields.description) {
      this.description = IsStringValidator(
        fields.description,
        Field.Description
      )
    }
  }
}
