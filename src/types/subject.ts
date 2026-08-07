export interface Subject {
  id: string
  name: string
  color: string
  createdAt: string
}

export type SubjectInput = Pick<Subject, 'name' | 'color'>
