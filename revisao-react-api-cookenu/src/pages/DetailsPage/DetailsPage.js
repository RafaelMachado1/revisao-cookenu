import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    Button,
    Heading,
    SimpleGrid,
    useColorModeValue,
    Skeleton,
    VStack,
    StackDivider
  } from '@chakra-ui/react';
  
  import axios from 'axios'
  import React, { useEffect, useState } from 'react'
  import { useNavigate, useParams } from 'react-router-dom'
  import Header from '../../components/Header';
  import { BASE_URL } from '../../constants/url'
  import { goToHomePage } from '../../routes/coordinator';
  
  const DetailsPage = () => {
    const params = useParams()
    const navigate = useNavigate()
  
    const [details, setDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
      fetchDetails()
    }, [])
  

    //Requisição para buscar os dados da descrição de cada Receita
    const fetchDetails = async () => {
      try {
        setIsLoading(true)
  
        const config = {
          headers: {
            Authorization: window.localStorage.getItem("cookenu-token")
          }
        }
        const response = await axios.get(`${BASE_URL}/recipe/${params.recipeId}`, config)
        setDetails(response.data)
        setIsLoading(false)
      } 
      
      catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  
    return (
      <>
        <Header />
        <Container maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Skeleton isLoaded={!isLoading}>
              <Flex>
                <Image
                  rounded={'md'}
                  alt={'product image'}
                  src={details.imageUrl}
                  fit={'cover'}
                  align={'center'}
                  w={'100%'}
                  h={{ base: '100%', sm: '400px', lg: '500px' }}
                />
              </Flex>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={'header'}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                    {details.title}
                  </Heading>
                  <Text
                    color={useColorModeValue('gray.900', 'gray.400')}
                    fontWeight={300}
                    fontSize={'2xl'}>
                    enviada por {details.creatorName}
                  </Text>
                </Box>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={'column'}
                  divider={
                    <StackDivider
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                    />
                  }>
                  <VStack spacing={{ base: 4, sm: 6 }}>
                    <Text fontSize={'lg'}>
                      {details.description}
                    </Text>
                  </VStack>
                </Stack>
                <Stack>
                  <Button
                    colorScheme={"blue"}
                    onClick={() => goToHomePage(navigate)}>
                    Voltar
                  </Button>
                </Stack>
              </Stack>
            </Skeleton>
          </SimpleGrid>
        </Container>
      </>
    );
  }
  
  export default DetailsPage