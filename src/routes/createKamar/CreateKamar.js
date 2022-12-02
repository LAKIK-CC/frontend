import React, { useState } from 'react';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem, Checkbox, CheckboxGroup, Stack, Tooltip, IconButton  } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa'
import TextInput from '../../components/textInput/TextInput.js';
import TextArea from '../../components/textInput/TextArea';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import BASE_URL from '../../config/api/Constant.js';
import ROUTE from '../../config/api/Route.js';
import { getUserAccessToken } from '../../config/api/Auth.js';

import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

const schema = yup.object().shape({
  noKamar: yup.string().required(),
  keterangan: yup.string(),
  tersedia: yup.boolean(),
  wcDalam: yup.boolean(),
  ac: yup.boolean(),
  listrik: yup.boolean(),
  springBed: yup.boolean()
})

const CreateKamar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('')
  const navigate = useNavigate();

  const {
  handleSubmit,
  register,
  formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (res) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/v1/kamar`, res, {
        headers: {
          Authorization: `Bearer ${getUserAccessToken()}`
        }
      })
      .then((response) => {
          setResponseMessage('')
          navigate(ROUTE.DASHBOARD)
      })
    } catch(error) {
        setResponseMessage(error['response']['data']['message'])
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
                Create Kamar
            </Text>
            <Box as='form' onSubmit={handleSubmit(onSubmit)}>
              <TextInput 
                  id="noKamar"
                  title='Nomor Kamar' 
                  placeholder='Masukkan nomor kamar...'
                  errors={errors}
                  register={register}
                  rules={
                    {
                    required: 'Required',
                    minLength: { value: 1, message: 'Minimum length should be 1' },
                    }
                  }
              />
              <Box mb='20px' />

              <CheckboxGroup colorScheme='orangeChill' >
                <Stack spacing={5} direction='row'>
                  <Checkbox colorScheme='orangeChill' {...register('tersedia')}>
                    Tersedia
                  </Checkbox>
                  <Checkbox colorScheme='orangeChill' {...register('wcDalam')}>
                    WC
                  </Checkbox>
                  <Checkbox colorScheme='orangeChill' {...register('ac')}>
                    AC
                  </Checkbox>
                  <Checkbox colorScheme='orangeChill' {...register('listrik')}>
                    Listrik
                  </Checkbox>
                  <Checkbox colorScheme='orangeChill' {...register('springBed')}>
                    Spring Bed
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
              <Box mb='20px' />
              <TextArea
                id="keterangan"
                title="Keterangan"
                placeholder='Masukkan keterangan...'
                errors={errors}
                register={register}
              />


              <Box mb='10px' />
                {responseMessage !== '' && <Text fontSize='14px' color='red.500'>{responseMessage}</Text>}
              <Box mb={responseMessage ? '10px' : '20px'} />
                <Button id='signInButton' colorScheme='orangeChill' type='submit' width='12em' borderRadius={10}>
                    {isLoading ? <Spinner /> : "Create"}
                </Button>
              <Box mb='20px' />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default CreateKamar