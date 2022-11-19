import React from 'react'

import NotFoundIcon from './NotFound.svg'

import { Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'

import { TbError404 } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Box h='100vh' w='100vw'>
      <Flex 
        flexDir='column'
        alignItems='center'
        justifyContent='center'
        h='100%'
      >
        <Image w='25rem' src={NotFoundIcon} />
        <VStack m='0 0 1rem'>
          <Heading textAlign='center'>
            Page Not Found
          </Heading>
          <Text>
            Kayaknya kita nyasar deh 😰
          </Text>
        </VStack>
        <Button colorScheme='orangeChill' onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Flex>
    </Box>
  )
}
