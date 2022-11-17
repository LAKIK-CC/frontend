import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { Badge, Grid, Heading, Stack, Text } from '@chakra-ui/react'

import { AiFillThunderbolt } from 'react-icons/ai'
import { FaShower, FaTemperatureLow, FaBed } from 'react-icons/fa'

import React from 'react'

export default function CardKamar(props) {

  const {
    no_kamar,
    wc_dalam,
    ac,
    springbed,
    listrik,
    tersedia,
    keterangan,
  } = props


  return (
    <Card bgColor='' variant='outline'>
      <CardHeader className='test' overflow='hidden'>
          <Heading fontSize={{sm: '1.5rem', md: '2rem'}}>{no_kamar}</Heading>
          <Badge colorScheme={tersedia ? 'green' : 'red'} fontSize='1rem'>{tersedia ? 'Tersedia' : 'Tidak tersedia'}</Badge>
      </CardHeader>
      <CardBody>
          <Grid templateColumns={{sm: '1fr', md: '30% 70%'}} gap={{sm: '1.5rem', md: '0'}}>
          <Stack>
              <Text as='b'>Fasilitas:</Text>
              <Stack>
                {
                  wc_dalam &&
                  <Grid templateColumns='auto 1fr' gap='1rem' alignItems='center'><FaShower/> Kamar mandi dalam</Grid>
                }
                {
                  ac &&
                  <Grid templateColumns='auto 1fr' gap='1rem' alignItems='center'><FaTemperatureLow/> AC</Grid>
                }
                {
                  listrik &&
                  <Grid templateColumns='auto 1fr' gap='1rem' alignItems='center'><AiFillThunderbolt/> Listrik include</Grid>
                }
                {
                  springbed &&
                  <Grid templateColumns='auto 1fr' gap='1rem' alignItems='center'><FaBed/> Springbed</Grid>
                }
                {/* <Grid templateColumns='auto 1fr' gap='1rem' alignItems='center'><TbDots/> etc.</Grid> */}
              </Stack>
          </Stack>
          <Stack>
              <Text as='b'>Keterangan:</Text>
              <Text>
                {keterangan}
              </Text>
          </Stack>
          </Grid>
      </CardBody>
    </Card>
  )
}
