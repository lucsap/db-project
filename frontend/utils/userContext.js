import { createContext } from 'react'

const userContext = createContext({ user: {}, setUser: () => {} })

export default { userContext }
