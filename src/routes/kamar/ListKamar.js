import { Box, Button, Flex, Heading, HStack, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react'
import './ListKamar.css'
import React, { useEffect, useState } from 'react'
import CardKamar from '../../components/cardKamar/CardKamar'
import { FaBed, FaCheck, FaSearch, FaShower, FaTemperatureLow } from 'react-icons/fa'
import { AiFillThunderbolt } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'
import axios from 'axios'
import BASE_URL from '../../config/api/Constant'
import { getUserAccessToken } from '../../config/api/Auth'

const dummyData = [
  {
    noKamar: 'No. 123',
    wcDalam: true,
    ac: true,
    springBed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: false,
  },
  {
    noKamar: 'No. 124',
    wcDalam: false,
    ac: true,
    springBed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: true,
  },
  {
    noKamar: 'No. 125',
    wcDalam: true,
    ac: true,
    springBed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: true,
  },
  {
    noKamar: 'No. 126',
    wcDalam: true,
    ac: true,
    springBed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: true,
  },
  {
    noKamar: 'No. 127',
    wcDalam: true,
    ac: true,
    springBed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: true,
  },
]


export default function ListKamar() {
  const [kos, setKos] = useState([])
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

  useEffect(() => {
    if (rooms.length === 0) {
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
          console.log('Error while fetching data...')
          console.log(error)
        }
      }
      fetchData()
    }


    let tempRoom = [...rooms]

    if (searchBox) {
      tempRoom = tempRoom.filter(room => (room.noKamar.toLowerCase()).includes(searchBox.toLowerCase()))
    }

    if (availFilter) {
      console.log('avail filter ran')
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
    console.log(tempRoom)
    setRoomsToShow(tempRoom)
  }, [rooms, searchBox, availFilter, filters])
  

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
              <CardKamar {...data} />
            )
          })
          :
          <Text>Loading...</Text>
        }
      </Stack>
    </Box>
  )
}
