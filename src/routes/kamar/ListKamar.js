import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react'
import './ListKamar.css'
import React, { useCallback, useEffect, useState } from 'react'
import CardKamar from '../../components/cardKamar/CardKamar'
import { FaBed, FaCheck, FaSearch, FaShower, FaTemperatureLow } from 'react-icons/fa'
import { AiFillThunderbolt } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'
import axios from 'axios'
import BASE_URL from '../../config/api/Constant'
import { getUserAccessToken } from '../../config/api/Auth'

export default function ListKamar() {
  const [kos, setKos] = useState({})
  const [rooms, setRooms] = useState([])
  const [roomsToShow, setRoomsToShow] = useState([])
  const [searchBox, setSearchBox] = useState('')
  const [availFilter, setAvail] = useState('')
  const [filters, setFilters] = useState([])

  const searchBoxChanged = (event) => {
    setSearchBox(event.target.value)
  }

  const availBtnClicked = (filter) => {
    if (filter === availFilter) {
      setAvail('')
    } else {
      setAvail(filter)
    }
  }

  const filterBtnClicked = (filter) => {
    let copyFilters = [...filters]

    if (copyFilters.includes(filter)) {
      copyFilters = copyFilters.filter(item => item!== filter)
    } else {
      copyFilters.push(filter)
    }

    setFilters(copyFilters)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/kamar`,
        {
          headers: {
            Authorization: `Bearer ${getUserAccessToken()}`
          }
        }
      )

      const { listKamar, ...kos } = response.data.result
      setKos(kos)
      setRooms(listKamar)
    } catch (error) {
      
    }
  }

  const deleteBtnClicked = useCallback(
    async (id) => {
      await axios.delete(`${BASE_URL}/v1/kamar/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getUserAccessToken()}`
          }
        }
      )
      fetchData()
    },
    [],
  )

  useEffect(() => {
    let tempRoom = [...rooms]

    if (searchBox) {
      tempRoom = tempRoom.filter(room => (room.noKamar.toLowerCase()).includes(searchBox.toLowerCase()))
    }

    if (availFilter) {
      tempRoom = tempRoom.filter(room => {
        if (availFilter === 'available') {
          return room.tersedia
        } else {
          return !room.tersedia
        }
      })
    }
    if (filters) {
      for (const filter of filters) {
        tempRoom = tempRoom.filter(room => room[filter])
      }
    }
    setRoomsToShow(tempRoom)
  }, [rooms, searchBox, availFilter, filters])

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <Box w='75%' m='0 auto 5rem'>
      <Flex m='3rem 0' direction='column' textAlign='center' alignItems='center' gap='2rem' className='header-group'>
        <Box>
          <Heading>{kos.namaKos}</Heading>
          <Text color='gray'>{kos.alamatKos}</Text>
          <Text color='gray'>{kos.nomorTeleponKos}</Text>
          <Text m='1rem 0 0'>{kos.deskripsiKos}</Text>
        </Box>

        <InputGroup w='15rem'>
          <InputLeftElement
            pointerEvents='none'
            children={<FaSearch />}
          />
          <Input type='search' placeholder='Cari kamar...' onChange={searchBoxChanged} />
        </InputGroup>

        <Stack alignItems='center'>
          <Flex gap='1rem' wrap='wrap' alignItems='center'>
            <Button colorScheme='orangeChill' {...(availFilter === 'available' ? null : {variant: 'outline'})} onClick={() => availBtnClicked('available')} leftIcon={<FaCheck />}>
              Tersedia
            </Button>
            <Button colorScheme='orangeChill' {...(availFilter === 'unavailable' ? null : {variant: 'outline'})} onClick={() => availBtnClicked('unavailable')} leftIcon={<GiCancel />}>
              Tidak tersedia
            </Button>
          </Flex>

          <Flex gap='1rem' wrap='wrap' justifyContent='center'>
            <Button colorScheme='orangeChill'  {...(filters.includes('wcDalam') ? null : {variant:'outline'})} onClick={() => filterBtnClicked('wcDalam')} leftIcon={<FaShower />}>
              Kamar mandi dalam
            </Button>
            <Button colorScheme='orangeChill' {...(filters.includes('ac') ? null : {variant:'outline'})} onClick={() => filterBtnClicked('ac')} leftIcon={<FaTemperatureLow />}>
              AC
            </Button>
            <Button colorScheme='orangeChill' {...(filters.includes('listrik') ? null : {variant:'outline'})} onClick={() => filterBtnClicked('listrik')} leftIcon={<AiFillThunderbolt />}>
              Listrik include
            </Button>
            <Button colorScheme='orangeChill' {...(filters.includes('springBed') ? null : {variant:'outline'})} onClick={() => filterBtnClicked('springBed')} leftIcon={<FaBed />}>
              Springbed
            </Button>
          </Flex>
        </Stack>
      </Flex>

      <Flex justifyContent='center' m='0 0 1rem'>
        <Text color='gray'>{roomsToShow.length} room(s) found</Text>
      </Flex>

      <Stack justifyContent='center'>
        {roomsToShow ?
          roomsToShow.map(data => {
            return (
              <CardKamar {...data} onDelete={deleteBtnClicked} />
            )
          })
          :
          <Text>Loading...</Text>
        }
      </Stack>
    </Box>
  )
}
