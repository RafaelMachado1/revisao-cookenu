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
    Textarea,
    ScaleFade
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { BASE_URL } from "../../constants/url"
  import { goToHomePage } from '../../routes/coordinator';
  
  const CreateRecipePage = () => {
    const navigate = useNavigate()
  
    const [isLoading, setIsLoading] = useState(false)
  
    const [form, setForm] = useState({
      title: "",
      imageUrl: "",
      description: ""
    })
  
    const onChangeForm = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  
    //Requisição para criar nova Receita
    const createRecipe = async () => {
      try {
        setIsLoading(true)
        const config = {
          headers: {
            Authorization: window.localStorage.getItem("cookenu-token")
          }
        }
        const body = {
          title: form.title,
          imageUrl: form.imageUrl,
          description: form.description
        }
        await axios.post(
          `${BASE_URL}/recipe`, body, config
        )
        setIsLoading(false)
        setForm({
          title: "",
          imageUrl: "",
          description: ""
        })
        window.alert("Receita criada com sucesso")
      }
      catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  
    return (
      <ScaleFade initialScale={0.9} in={true}>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} w={"800px"} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Crie uma nova receita</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                para compartilhar com a galera ✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="title" isRequired>
                  <FormLabel>Título</FormLabel>
                  <Input
                    type="text"
                    value={form.title}
                    onChange={onChangeForm}
                    name="title"
                    autoComplete='off'
                    placeholder='Nome da receita'
                  />
                </FormControl>
                <FormControl id="imageUrl" isRequired>
                  <FormLabel>Link URL da imagem</FormLabel>
                  <Input
                    type="text"
                    value={form.imageUrl}
                    onChange={onChangeForm}
                    name="imageUrl"
                    autoComplete='off'
                    placeholder='https://exemplo.com/imagem1.jpg'
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel>Descrição</FormLabel>
                  <Textarea
                    borderColor="gray.300"
                    _hover={{
                      borderRadius: "gray.300"
                    }}
                    type="text"
                    value={form.description}
                    onChange={onChangeForm}
                    name="description"
                    placeholder='Descreva o passo a passo da receita'
                    minH="300px"
                  />
                </FormControl>
  
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={createRecipe}
                  >
                    {isLoading ? <Spinner /> : "Criar"}
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    <Link onClick={() => goToHomePage(navigate)} color={'blue.400'}>Voltar</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </ScaleFade>
    )
  }
  export default CreateRecipePage 