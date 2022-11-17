import { Box, Button, Flex, Heading, HStack, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react'
import './ListKamar.css'
import React, { useEffect, useState } from 'react'
import CardKamar from '../../components/cardKamar/CardKamar'
import { FaBed, FaCheck, FaSearch, FaShower, FaTemperatureLow } from 'react-icons/fa'
import { AiFillThunderbolt } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

const dummyData = [
  {
    no_kamar: 'No. 123',
    wc_dalam: true,
    ac: true,
    springbed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: false,
  },
  {
    no_kamar: 'No. 123',
    wc_dalam: false,
    ac: true,
    springbed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: true,
  },
  {
    no_kamar: 'No. 123',
    wc_dalam: true,
    ac: true,
    springbed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: true,
  },
  {
    no_kamar: 'No. 123',
    wc_dalam: true,
    ac: true,
    springbed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: true,
  },
  {
    no_kamar: 'No. 123',
    wc_dalam: true,
    ac: true,
    springbed: true,
    listrik: true,
    keterangan: 'Ex incididunt ut consectetur exercitation enim anim. Magna exercitation proident id nisi pariatur. Non nostrud fugiat eiusmod ex consequat voluptate aliqua sint ut minim labore ut in excepteur. Laborum veniam reprehenderit nulla non qui reprehenderit mollit. Sit aliquip officia cupidatat laboris duis minim officia proident commodo laboris amet enim. Cillum esse ea ut in laboris labore labore excepteur velit anim incididunt. Ad ea qui et ea tempor esse consequat anim ut enim deserunt.',
    tersedia: true,
  },
]


export default function ListKamar() {
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
      console.log('ROOM INITIALIZED')
      setRooms(dummyData)
    }

    let tempRoom = [...rooms]

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
    if (filters.length > 0) {
      for (const filter of filters) {
        tempRoom = tempRoom.filter(room => room[filter])
      }
    }
    console.log(tempRoom)
    setRoomsToShow(tempRoom)
  }, [rooms, searchBox, availFilter, filters])
  

  return (
    <Box w='75%' m='0 auto'>
      <Flex m='3rem 0' direction='column' textAlign='center' alignItems='center' gap='2rem' className='header-group'>
        <Box>
          <Heading>Kos Mihana Performance</Heading>
          <Text color='gray'>Jl. Mandor Goweng No. 87, Mantap mantap mantap, Kec bla bla</Text>
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
            <Button colorScheme='orangeChill'  {...(filters.includes('wc_dalam') ? null : {variant:'outline'})} onClick={() => filterBtnClicked('wc_dalam')} leftIcon={<FaShower />}>
              Kamar mandi dalam
            </Button>
            <Button colorScheme='orangeChill' {...(filters.includes('ac') ? null : {variant:'outline'})} onClick={() => filterBtnClicked('ac')} leftIcon={<FaTemperatureLow />}>
              AC
            </Button>
            <Button colorScheme='orangeChill' {...(filters.includes('listrik') ? null : {variant:'outline'})} onClick={() => filterBtnClicked('listrik')} leftIcon={<AiFillThunderbolt />}>
              Listrik include
            </Button>
            <Button colorScheme='orangeChill' {...(filters.includes('springbed') ? null : {variant:'outline'})} onClick={() => filterBtnClicked('springbed')} leftIcon={<FaBed />}>
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
