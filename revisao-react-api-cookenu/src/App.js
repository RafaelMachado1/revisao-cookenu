import React, { useEffect, useState } from 'react'
import Router from './routes/Router'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalStyle } from './GlobalStyle.style'
import { GlobalContext } from './contexts/GlobalContext'

const App = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(()=>{
    const token = window.localStorage.getItem("cookenu-token")
    if(token){
      setIsAuth(true)
    }
  },[])

  const context = {
    isAuth: isAuth,
    setIsAuth: setIsAuth
  }

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>
        <GlobalStyle/>
        <Router />
      </ChakraProvider>
    </GlobalContext.Provider>
  )
}

export default App
