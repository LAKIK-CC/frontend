import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { Badge, Button, Box, Flex, Grid, Heading, Stack, Text, Tooltip } from '@chakra-ui/react'

import Alerts from '../alerts/Alerts'

import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { AiFillThunderbolt } from 'react-icons/ai'
import { FaShower, FaTemperatureLow, FaBed } from 'react-icons/fa'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CardKamar(props) {

  const {
    id,
    noKamar,
    wcDalam,
    ac,
    springBed,
    listrik,
    tersedia,
    keterangan,
    onDelete
  } = props


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const dialogOnSubmit = async (id) => {
    await onDelete(id)
    setDeleteDialogOpen(false)
  }

  return (
    <Card bgColor='' variant='outline'>
      <CardHeader className='test' overflow='hidden'>
          <Flex justifyContent='space-between'>
            <Heading fontSize={{sm: '1.5rem', md: '2rem'}}>{noKamar}</Heading>
            <Flex gap='1rem'>
              <Link to={'/' + id + '/edit'}>
                <Tooltip hasArrow label='Edit kamar' fontSize='md'>
                  <Button colorScheme='orangeChill'>
                    <FiEdit2 />
                  </Button>
                </Tooltip>
              </Link>
              <Tooltip hasArrow label='Hapus kamar' fontSize='md'>
                <Box>
                  <Alerts 
                    isButton
                    popupOpen={deleteDialogOpen}
                    setPopupOpen={setDeleteDialogOpen}
                    displayText={<FiTrash2 />} 
                    buttonRightColor='red'
                    header={<Text>Hapus kamar <Text as='b'>{noKamar}</Text>?</Text>}
                    body={<Text>
                      Kamar yang akan dihapus (<Text as='b'>{noKamar}</Text>) tidak bisa dikembalikan. Apakah anda yakin?
                    </Text>}
                    buttonRightText='Hapus'
                    buttonLeftText='Batal'
                    onSubmit={() => dialogOnSubmit(id)}
                  />
                </Box>
              </Tooltip>
            </Flex>
          </Flex>
          <Badge colorScheme={tersedia ? 'green' : 'red'} fontSize='1rem'>{tersedia ? 'Tersedia' : 'Tidak tersedia'}</Badge>
      </CardHeader>
      <CardBody>
          <Grid templateColumns={{sm: '1fr', md: '30% 70%'}} gap={{sm: '1.5rem', md: '0'}}>
          <Stack>
              <Text as='b'>Fasilitas:</Text>
              <Stack>
                {
                  wcDalam &&
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
                  springBed &&
                  <Grid templateColumns='auto 1fr' gap='1rem' alignItems='center'><FaBed/> Springbed</Grid>
                }
                { !wcDalam && !ac && !listrik && !springBed && <Text>-</Text> }
              </Stack>
          </Stack>
          <Stack>
              <Text as='b'>Keterangan:</Text>
              <Text>
                {keterangan === "" ? "-" : keterangan}
              </Text>
          </Stack>
          </Grid>
      </CardBody>
    </Card>
  )
}
