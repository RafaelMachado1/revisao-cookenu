import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    Spinner,
    useColorModeValue,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { useContext, useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import {BASE_URL} from "../../constants/url"
  import { goToHomePage, goToLoginPage } from '../../routes/coordinator';
  import { GlobalContext } from '../../contexts/GlobalContext'
  
  const SignupPage = () => {
    const context = useContext(GlobalContext)
    const navigate = useNavigate()
  
    const [isLoading, setIsLoading] = useState(false)
  
    const [form, setForm] = useState({
      email: "",
      password: ""
    })
  
    const onChangeForm = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  
    useEffect(()=>{
      if(context.isAuth){
        goToHomePage(navigate)
      }
    })
  
    //Requisição para cadastrar usuário
    const signup = async () => {
      try {
        setIsLoading(true)
        const body = {
          name: form.name,
          email: form.email,
          password: form.password
        }
        const response = await axios.post(
          `${BASE_URL}/user/signup`, body
        )
  
        window.localStorage.setItem("cookenu-token", response.data.token)
        setIsLoading(false)
        context.setIsAuth(true)
  
        goToHomePage(navigate)
      }
      catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Cadastre sua conta</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              para aproveitar as melhores receitas Cookenu ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            <FormControl id="name">
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={form.name}
                  onChange={onChangeForm}
                  name="name"
                  autoComplete='off'
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={form.email}
                  onChange={onChangeForm}
                  name="email"
                  autoComplete='off'
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={form.password}
                  onChange={onChangeForm}
                  name="password"
                />
              </FormControl>
  
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={signup}
                >
                  {isLoading? <Spinner/> : "Cadastrar"}
                  </Button>
                <Stack 
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'center'}>
                  <Text>Já tem conta?</Text>
                  <Link onClick={()=>goToLoginPage(navigate)} color={'blue.400'}>Entre aqui!</Link>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }
  export default SignupPage 