import { HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Item({Title,Value}) {
  return (
    <>
    <HStack w={'full'} justifyContent={'space-between'}>
        <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'} >{Title}</Text>
        <Text>{Value}</Text>
    </HStack>
    </>
  )
}
