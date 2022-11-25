import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Spinner, Text,Box, Flex, Grid, GridItem, Checkbox, CheckboxGroup, Stack  } from '@chakra-ui/react';
import TextInput from '../../components/textInput/TextInput.js';
import TextArea from '../../components/textInput/TextArea';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    noKamar: yup.string().required(),
    keterangan: yup.string(),
    tersedia: yup.boolean(),
    wcDalam: yup.boolean(),
    ac: yup.boolean(),
    listrik: yup.boolean(),
    springBed: yup.boolean()
})
const UpdateKamar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();

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
                        id="noKamar"
                        title='Nomor Kamar' 
                        placeholder='Masukkan nomor kamar...'
                        errors={errors}
                        register={register}
                        isDisabled
                    />
                    <Box mb='20px' />

                    <CheckboxGroup colorScheme='green' defaultValue={Object.keys(checked)}>
                    <Stack spacing={5} direction='row'>
                        <Checkbox value="tersedia" colorScheme='green' {...register('tersedia')}>
                        Tersedia
                        </Checkbox>
                        <Checkbox value="wcDalam" colorScheme='green' {...register('wcDalam')}>
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
                    <TextArea
                        id="keterangan"
                        title="Keterangan"
                        placeholder='Masukkan keterangan...'
                        errors={errors}
                        register={register}
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

export default UpdateKamar