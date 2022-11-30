import React, { useState } from 'react';
import TextInput from '../../components/textInput/TextInput.js';
import PasswordInput from '../../components/passwordInput/PasswordInput.js';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { connect } from 'unistore/react';
import { actions } from '../../config/store/Store.js';
import axios from 'axios';
import BASE_URL from '../../config/api/Constant.js';
import { setUserAccessToken, setUserRefreshToken } from '../../config/api/Auth.js';
import { useNavigate } from 'react-router-dom';
import ROUTE from '../../config/api/Route.js';

const Login = connect('user', actions)( 
    ({ setUser }) =>{
    const [responseMessage, setResponseMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const isRegistered = (new URL(document.location)).searchParams.get("isRegistered") ? true : false

    const navigate = useNavigate();
        
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await axios.post(`${BASE_URL}/v1/user/login`, data)
            .then((response) => {
                response = JSON.parse(JSON.stringify(response))
                setResponseMessage('')
                setUserAccessToken(response['data']['accessToken'])
                setUserRefreshToken(response['data']['refreshToken'])
                setUser(response['data']['username'])
                navigate(ROUTE.DASHBOARD)
            })
        } catch(error) {
            if (error['response']['data']['trace'].includes("java.util.NoSuchElementException")) {
                setResponseMessage("Pastikan akun telah terdaftar")
            }
            setIsLoading(false)
        }
    };
    return (
        <Flex
            minH='100vh'
            backgroundRepeat='no-repeat'
            justify='center'
            align='center'
        >   
            <Grid w='full' h='full' px='49px' templateColumns='repeat(10, 1fr)' gap={40} 
            >
                <GridItem colSpan={5}>
                    <Text fontSize='64px' fontWeight='semibold' color='black' >
                        Layanan Ketersedian dan Informasi Kos
                    </Text>
                </GridItem>
                <GridItem colSpan={4} 
                alignSelf='center'
                >
                    <Box verticalAlign='center'>
                    {isRegistered && (
                    <Text color='green'>
                        Akun berhasil dibuat!
                    </Text>
                    )}
                        <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Masuk
                        </Text>
                        <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-login">
                            <TextInput 
                                id="username"
                                title='Username' 
                                placeholder='myusername' 
                                errors={errors}
                                rules={{
                                    required: 'Required',
                                    minLength: { value: 1, message: 'Minimum length should be 1' },
                                }}
                                register={register}
                            />
                            <Box mb='20px' />
                            
                            <PasswordInput
                                id="password"
                                register={register}
                                errors={errors}
                                title="Password"
                                placeholder='mypassword123'
                                rules={{
                                    required: 'Required',
                                    minLength: { value: 8, message: 'Minimum length should be 8' },
                                }}
                            />
                            <Box mb='10px' />
                            {responseMessage !== '' && <Text fontSize='14px' color='red.500'>{responseMessage}</Text>}
                            <Box mb={responseMessage ? '10px' : '20px'} />

                            <Button form="form-login" id='signInButton' colorScheme='orangeChill' type='submit' width='8em' borderRadius={10}>
                                {isLoading ? <Spinner /> : "Masuk"}
                            </Button>
                            
                        </Box>
                        
                        <Box mb='20px' />
                        <Text as='span'>atau </Text>
                        <Text as='span' fontWeight='600'>    
                            <Text as='span' onClick={()=>navigate(ROUTE.REGISTER)} color='#FF884B' style={{cursor:'pointer', textDecoration: 'underline'}}>daftar</Text> untuk membuat akun baru
                        </Text>
                    </Box>
                                        
                </GridItem>
            </Grid>
        </Flex>
    );        
}
)

export default Login;