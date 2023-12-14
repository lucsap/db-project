import { createContext } from 'react'

const booksContext = createContext({ books: [], setBooks: () => {} })

export default { booksContext }
