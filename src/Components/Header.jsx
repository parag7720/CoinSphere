import React from 'react'
import { HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
export default function Header() {
  return (
    <>
    <HStack  p={5} bgColor={'blackAlpha.900'} gap={10} >
   <Button variant={'link'} colorScheme='red'>
    <Link to={"/"}>Home</Link>

   </Button>
   <Button  variant={'link'} colorScheme='red'>
    <Link to={"/Exchanges"}>Exchanges</Link>
   </Button>
   <Button variant={'link'} colorScheme='red'>
    <Link to={"/Coins"}>Coins</Link>
   </Button>
    </HStack>
    </>
  )
}
