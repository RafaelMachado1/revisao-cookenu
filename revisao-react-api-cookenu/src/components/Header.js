import { Button, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'
import { goToLoginPage } from '../routes/coordinator'

const Header = () => {
  const context = useContext(GlobalContext)
  const navigate = useNavigate()

  const logout = () => {
    window.localStorage.removeItem("cookenu-token")
    context.setIsAuth(false)
    goToLoginPage(navigate)
  }

  return (
    <Flex
      h={20}
      bg={"blue.50"} j
      justifyContent={"end"}
      alignItems={"center"}
      paddingRight={8}
    >
      <Button onClick={logout} colorScheme={"red"}>Deslogar</Button>
    </Flex>
  )
}

export default Header