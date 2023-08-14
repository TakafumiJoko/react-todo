import { createContext } from 'react'

const TextFieldsContext = createContext({ newTitle: '', newContent: '', newDeadline: '' })

export { TextFieldsContext }