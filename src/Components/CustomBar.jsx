import React from 'react'
import { VStack,Progress,HStack,Badge,Text } from '@chakra-ui/react'
export default function CustomBar({low,high}) {
  return (
    <>
    <VStack w={'full'}  > 
        <Progress value={50} colorScheme='teal' w={'full'} />
        <HStack justifyContent={'space-between'} w={'full'} >
    <Badge children={low} colorScheme='red' />
    <Text fontSize={'small'}>24H Range</Text>
    <Badge children={high} colorScheme='green' />
        </HStack>
    </VStack>
    </>
  )
}
