import React, { useState } from 'react';
import TextInput from '../../components/textInput/TextInput.js';
import TextAreaInput from '../../components/textAreaInput/TextAreaInput.js';
import PasswordInput from '../../components/passwordInput/PasswordInput.js'
import { Button, Text, Spinner,Box, Flex, Grid, GridItem, Spacer  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ROUTE from '../../config/api/Route.js';
import { isAuthenticate } from '../../config/middleware/Middleware.js';
import BASE_URL from '../../config/api/Constant.js';
import axios from "axios";

function Register() {
    const [errl, setErrl] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    const navigate = useNavigate();

    const {
    handleSubmit,
    register,
    formState: { errors },
    } = useForm({
        defaultValue: {
            deskripsiKos: "",
        }
    });

    if (isAuthenticate()) {
        navigate(ROUTE.DASHBOARD);
        return;
    }

    const onSubmit = (data) => {
        setIsLoading(true)

        axios.post(`${BASE_URL}/v1/user/register`, data)
        .then(() => {
            navigate(ROUTE.LOGIN + "?isRegistered=true")
            setIsLoading(false)
        }) 
        .catch((error) => {
            let error_logs = []
            if (error.response.data.response) {
                error_logs = error_logs.concat(error.response.data.response)
            }
            if (error.response.data.email) {
                const email_error = error.response.data.email
                error_logs = error_logs.concat(email_error)
            }
            if (error.response.data.password) {
                let password_error = error.response.data.password
                if (password_error[0].startsWith('[')){
                    password_error = error.response.data.password[0].split("', '")
                    password_error[0] = password_error[0].slice(2);
                    password_error[password_error.length - 1] = password_error[password_error.length - 1].slice(0, -2);
                }
                error_logs = error_logs.concat(password_error)
            }
            setErrl(error_logs)
            setIsLoading(false)
        });

        return data
    }

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
                        <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                            Register
                        </Text>
                        <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                            <Box>
                                <Grid justify="start" w='50vw' h='full' templateColumns='repeat(4, 1fr)' gap="20px" >
                                    <GridItem colSpan={1}>
                                        <Text onClick={() => setSelectedTab(0)} textAlign="center" color={selectedTab == 0 ? '#FF884B' : "black"} fontWeight={selectedTab == 0 ? "700" : "500"} cursor='pointer'>
                                            Akun
                                        </Text>
                                    </GridItem>

                                    <GridItem colSpan={1}>
                                        <Text onClick={() => setSelectedTab(1)} textAlign="center"  color={selectedTab == 1 ? '#FF884B' : "black"} fontWeight={selectedTab == 1 ? "700" : "500"} cursor='pointer'>
                                            Data Kos
                                        </Text>
                                    </GridItem>
                                </Grid>
                            </Box>
                            <Box mb='20px' />

                            {selectedTab == 0 &&
                            <Box>
                                <TextInput 
                                    id="email"
                                    title='Email' 
                                    placeholder='name@example.com'
                                    errors={errors}
                                    register={register}
                                    rules = {{
                                        required: "Required",
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                />
                                <Box mb='20px' />
                                
                                <PasswordInput
                                    id="password"
                                    title="Password"
                                    placeholder='mypassword123'
                                    errors={errors}
                                    register={register}
                                    rules = {{
                                        required: "Required",
                                        minLength: { value: 8, message: 'Minimal 8 karakter' },
                                    }}
                                />
                                <Box mb='20px' />

                                <PasswordInput
                                    id="password2"
                                    title="Confirm Password"
                                    placeholder='mypassword123'
                                    errors={errors}
                                    register={register}
                                    rules = {{
                                        required: "Required",
                                        minLength: { value: 8, message: 'Minimal 8 karakter' },
                                    }}
                                />
                                <Box mb='20px' />
                                <Button onClick={() => setSelectedTab(1)} colorScheme='orangeChill' width='8em' borderRadius={10}>
                                    Next
                                </Button>
                            </Box>
                            }

                            {selectedTab == 1 &&
                            <Box>
                                <TextInput 
                                    id="namaKos"
                                    title='Nama Kos' 
                                    placeholder='Masukkan nama kos'
                                    errors={errors}
                                    register={register}
                                    rules = {{
                                        required: "Required",
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                />
                                <Box mb='20px' />

                                <TextInput 
                                    id="noTeleponKos"
                                    title='Nomor Telepon Kos' 
                                    placeholder='Masukkan no telepon yang dapat dihubungi'
                                    errors={errors}
                                    register={register}
                                    rules = {{
                                        required: "Required",
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                    />
                                <Box mb='20px' />

                                <TextAreaInput 
                                    id='alamatKos'
                                    title='Alamat Kos'
                                    placeholder='Masukkan alamat kos'
                                    errors={errors}
                                    register={register}
                                    rules = {{
                                        required: "Required",
                                        minLength: { value: 1, message: 'Required' },
                                    }}
                                />
                                <Box mb='20px' />

                                <TextAreaInput 
                                    id='deskripsiKos'
                                    title='Deskripsi Kos'
                                    placeholder='Masukkan deskripsi kos'
                                    errors={errors}
                                    register={register}
                                />
                                <Box mb='20px' />

                                <Flex minWidth='max-content' alignItems='center' gap='2'>
                                    <Button onClick={() => setSelectedTab(0)} colorScheme='orangeChill' width='8em' borderRadius={10}>
                                        Back
                                    </Button>
                                    <Spacer />
                                    <Button id='signInButton' colorScheme='orangeChill' type='submit' width='8em' borderRadius={10}>
                                    {isLoading ? <Spinner /> : "Sign Up"}
                                    </Button>
                                </Flex>
                            </Box>
                            }

                            {errl.length !== 0 && (
                                <div>
                                <Text color='red'>Error:</Text>
                                <ul data-testid='errl'>
                                    {errl.map((e,i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                                </div>
                            )}
                            <Box mb='20px' />
                        </Box>
                        
                        <Box mb='20px' />
                        <Text as='span'>Already have an account? </Text>
                        <Text as='u' fontWeight='600'>    
                            <Text as='span' cursor="pointer" onClick={()=>navigate(ROUTE.LOGIN)} color='#FF884B'>Sign in</Text>
                        </Text>
                    </Box>
                                        
                </GridItem>
            </Grid>
        </Flex>
    );
}

export default Register;