import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Stack,
    Image,
    ScaleFade,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { goToDetailsPage } from '../../routes/coordinator';


const RecipeCard = (props) => {
    const { recipe } = props

    const navigate = useNavigate()
    
    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Center py={12}>
                <Box
                    onClick={()=>goToDetailsPage(navigate, recipe.id)}
                    cursor="pointer"
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    _hover={{
                        transform: "scale(1.1)",
                        transition: "all .3s ease"
                    }}
                    >
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={recipe.imageUrl}
                    />

                    <Stack pt={10} align={'center'}>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            {recipe.title}
                        </Heading>
                    </Stack>
                </Box>
            </Center>
        </ScaleFade>
    );
}
export default RecipeCard