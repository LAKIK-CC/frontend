import React, { useState } from "react";
import { useParams } from "react-router-dom";

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

const mockApi = {
    nomorKamar: 1,
    lantai: 2,
    keterangan: "aku suka kamar luthfi",
    tersedia: true,
    wc: true,
    ac: true,
    listrik: false,
    springBed: true
}

const UpdateForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();

    const checked = Object.fromEntries(Object.entries(mockApi).filter(([key, val]) => val === true));

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
                    Update Kamar {id}
                </Text>
                <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                    <TextInput 
                        id="nomorKamar"
                        title='Nomor Kamar' 
                        placeholder='Nomor Kamar'
                        errors={errors}
                        register={register}
                        defaultValue={mockApi.nomorKamar}
                        isDisabled
                    />
                    <Box mb='20px' />
                    
                    <TextInput 
                        id="lantai"
                        title='Lantai' 
                        placeholder='Lantai'
                        errors={errors}
                        register={register}
                        defaultValue={mockApi.lantai}
                    />
                    <Box mb='20px' />

                    <CheckboxGroup colorScheme='green' defaultValue={Object.keys(checked)}>
                    <Stack spacing={5} direction='row'>
                        <Checkbox value="tersedia" colorScheme='green' {...register('tersedia')}>
                        Tersedia
                        </Checkbox>
                        <Checkbox value="wc" colorScheme='green' {...register('wc')}>
                        WC
                        </Checkbox>
                        <Checkbox value="ac" colorScheme='green' {...register('ac')}>
                        AC
                        </Checkbox>
                        <Checkbox value="listrik" colorScheme='green' {...register('listrik')}>
                        Listrik
                        </Checkbox>
                        <Checkbox value="springBed"colorScheme='green' {...register('springBed')}>
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
                        defaultValue={mockApi.keterangan}
                    />
                    <Box mb='20px' />

                    <Button id='signInButton' colorScheme='orangeChill' type='submit' width='12em' borderRadius={10}>
                        {isLoading ? <Spinner /> : "Update"}
                    </Button>
                    <Box mb='20px' />
                </Box>
                </Box>
            </GridItem>
            </Grid>
        </Flex>
      )
}

export default UpdateForm