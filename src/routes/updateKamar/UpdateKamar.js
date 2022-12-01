import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from '../../config/api/Constant.js';
import { getUserAccessToken } from '../../config/api/Auth.js';
import ROUTE from "../../config/api/Route.js";

import { FaArrowLeft } from 'react-icons/fa'
import { Button, Spinner, Text,Box, Flex, Grid, GridItem, Checkbox, Stack, Tooltip, IconButton  } from '@chakra-ui/react';
import TextInput from '../../components/textInput/TextInput.js';
import TextArea from '../../components/textInput/TextArea';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

const schema = yup.object().shape({
    noKamar: yup.string(),
    keterangan: yup.string(),
    tersedia: yup.boolean(),
    wcDalam: yup.boolean(),
    ac: yup.boolean(),
    listrik: yup.boolean(),
    springBed: yup.boolean()
})
const UpdateKamar = () => {

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(
                    `${BASE_URL}/v1/kamar/${id}`
                )
                .then( async (response) => {
                    const fields = ["noKamar", "keterangan", "tersedia", "wcDalam", "ac", "listrik", "springBed"]
                    fields.forEach((field) => {
                        setValue(field, response.data.result[field])
                    })
                    setResponseMessage('')
                    
                })
              } catch(error) {
                  setResponseMessage(error['response']['data']['response'])
                  setIsLoading(false)
              }
        }
        fetchData()
    }, [id])    

    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('')
    const navigate = useNavigate();

    const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (res) => {
        setIsLoading(true);
        try {
          await axios.put(`${BASE_URL}/v1/kamar/${id}`, res, {
            headers: {
              Authorization: `Bearer ${getUserAccessToken()}`
            }
          })
          .then((response) => {
              setResponseMessage('')
              navigate(ROUTE.DASHBOARD)
          })
        } catch(error) {
            setResponseMessage(error['response']['data']['response'])
            setIsLoading(false)
        }
        navigate(ROUTE.DASHBOARD);
      }
    return (
        <Flex
            minH='100vh'
            backgroundRepeat='no-repeat'
            justify='center'
            align='center'
        >   
        <Link to={ROUTE.DASHBOARD}>
            <Tooltip hasArrow label='Kembali' fontSize='md'>
                <Box left='80px' top='50px' position='fixed'>
                    <IconButton
                    size={'lg'}
                    icon={<FaArrowLeft />}
                    colorScheme='orangeChill'
                    variant='solid'>
                    </IconButton>
                </Box>
            </Tooltip>
        </Link>
            <Grid w='40vw' h='full' px='49px' templateColumns='repeat(1, 1fr)' >
            <GridItem colSpan={1}>
                <Box verticalAlign='center' boxShadow='md' padding='5'>
                <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                    Update Kamar {id}
                </Text>
                <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                    <TextInput 
                        id="noKamar"
                        title='Nomor Kamar' 
                        placeholder='Masukkan nomor kamar...'
                        errors={errors}
                        register={register}
                        rules={{
                            required: 'Required'
                        }}
                        
                    />
                    <Box mb='20px' />

                    <Stack spacing={5} direction='row'>
                        <Controller name="tersedia" control={control} render={({ field: { onChange, value } }) => (
                            <Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='orangeChill'>Tersedia</Checkbox>
                            )}
                        />
                        <Controller name="wcDalam" control={control} render={({ field: { onChange, value } }) => (
                            <Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='orangeChill'>WC</Checkbox>
                            )}
                        />
                        <Controller name="ac" control={control} render={({ field: { onChange, value } }) => (
                            <Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='orangeChill'>AC</Checkbox>
                            )}
                        />
                        <Controller name="listrik" control={control} render={({ field: { onChange, value } }) => (
                            <Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='orangeChill'>Listrik</Checkbox>
                            )}
                        />
                        <Controller name="springBed" control={control} render={({ field: { onChange, value } }) => (
                            <Checkbox onChange={(e) => onChange(e)} isChecked={value} colorScheme='orangeChill'>Spring Bed</Checkbox>
                            )}
                        />
                    </Stack>
                    <Box mb='20px' />
                    <TextArea
                        id="keterangan"
                        title="Keterangan"
                        placeholder='Masukkan keterangan...'
                        errors={errors}
                        register={register}
                    />
                    <Box mb='20px' />
                    <Tooltip hasArrow label='Update Kamar' fontSize='md'>
                        <Button id='signInButton' colorScheme='orangeChill' type='submit' width='12em' borderRadius={10}>
                            {isLoading ? <Spinner /> : "Update"}
                        </Button>
                    </Tooltip>
                    <Box mb='20px' />
                </Box>
                </Box>
            </GridItem>
            </Grid>
        </Flex>
      )
}

export default UpdateKamar