import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { goToCreateRecipePage, goToLoginPage } from '../../routes/coordinator'
import axios from 'axios'
import { BASE_URL } from '../../constants/url'
import { Button, Flex, Heading } from '@chakra-ui/react'
import RecipeCard from './RecipeCard'
import { GlobalContext } from '../../contexts/GlobalContext'

const HomePage = () => {
  const context = useContext(GlobalContext)
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState([])

  // useEffect(()=>{
  //   const token = window.localStorage.getItem("cookenu-token")
  //   if(!token){
  //     goToLoginPage(navigate)
  //   }
  // },[])

  useEffect(() => {
    if (!context.isAuth) {
      goToLoginPage(navigate)
    }
  }, [])

  useEffect(()=>{
    fetchRecipes()
  },[])

  //Requisição para buscar dados da API e armazenar no localStorage
  //e renderizar na tela através do map
  const fetchRecipes = async () => {
    try {
      const config = {
        headers: {
          Authorization: window.localStorage.getItem("cookenu-token")
        }
      }
      const response = await axios.get(`${BASE_URL}/recipe/all`, config)
      setRecipes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <Flex flexDir="column" paddingTop={12}>
        <Flex justifyContent="space-between">
          <Heading>Receitas Cookenu</Heading>
          <Button onClick={() => goToCreateRecipePage(navigate)} colorScheme="blue">Criar nova receita</Button>
        </Flex>
        <Flex wrap="wrap" justifyContent="space-between">
          {recipes.map((recipe) => { //Map para renderizar receitas na tela
            return <RecipeCard key={recipe.id} recipe={recipe} />
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default HomePage