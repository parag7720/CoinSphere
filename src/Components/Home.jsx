import React from "react"
import { Box,Image,Text } from "@chakra-ui/react"
import btc from '../Assets/btc.png'
export default function Home() {
  return (
  <>
<Box  w={'full'} h={'90vh'} >

  <Image w={'full'} h={'full'} objectFit={"contain"} src={btc} />
  <Text fontSize={'6xl'} textAlign={"center"} fontWeight={'thin'} color={"white"} mt={-20}>XCRYPTO</Text>
</Box>
 
  </>
  )
}
