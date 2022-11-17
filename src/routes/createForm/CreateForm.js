import React, { useState } from 'react';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem, Checkbox, CheckboxGroup, Textarea, Stack  } from '@chakra-ui/react';
import TextInput from '../../components/textInput/TextInput.js';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  nomorKamar: yup.number().positive().integer().required(),
  lantai: yup.number().positive().integer().required(),
  keterangan: yup.string(),
  tersedia: yup.boolean(),
  wc: yup.boolean(),
  ac: yup.boolean(),
  listrik: yup.boolean(),
  springBed: yup.boolean()
})

const CreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
  handleSubmit,
  register,
  formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (res) => {
    console.log(res);
    navigate("/");
  }

  return (
    <Flex
      minH='100vh'
      backgroundRepeat='no-repeat'
      justify='center'
      align='center'
    >   
      <Grid w='40vw' h='full' px='49px' templateColumns='repeat(1, 1fr)' >
        <GridItem colSpan={1}>
          <Box verticalAlign='center' boxShadow='md' padding='5'>
            <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                Create Kamar
            </Text>
            <Box as='form' onSubmit={handleSubmit(onSubmit)}>
              <TextInput 
                  id="nomorKamar"
                  title='Nomor Kamar' 
                  placeholder='Nomor Kamar'
                  errors={errors}
                  register={register}
              />
              <Box mb='20px' />
              
              <TextInput 
                  id="lantai"
                  title='Lantai' 
                  placeholder='Lantai'
                  errors={errors}
                  register={register}
              />
              <Box mb='20px' />

              <CheckboxGroup colorScheme='green' >
                <Stack spacing={5} direction='row'>
                  <Checkbox colorScheme='green' {...register('tersedia')}>
                    Tersedia
                  </Checkbox>
                  <Checkbox colorScheme='green' {...register('wc')}>
                    WC
                  </Checkbox>
                  <Checkbox colorScheme='green' {...register('ac')}>
                    AC
                  </Checkbox>
                  <Checkbox colorScheme='green' {...register('listrik')}>
                    Listrik
                  </Checkbox>
                  <Checkbox colorScheme='green' {...register('springBed')}>
                    Spring Bed
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
              <Box mb='20px' />
              <Textarea 
                  id="keterangan"
                  title='Keterangan' 
                  placeholder='Keterangan...'
                  {...register('keterangan')}
              />
              <Box mb='20px' />



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

export default CreateForm