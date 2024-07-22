import React from 'react'
import { VStack,HStack,Text,Button, Box,Stack, Heading } from '@chakra-ui/react'
import { AiOutlineSend } from 'react-icons/ai';
import { AiFillInstagram } from "react-icons/ai";

import { GrLinkedin } from "react-icons/gr";
import { ImGithub } from "react-icons/im";
export default function Footer() {
  return (

    <Box bgColor={'blackAlpha.900'} minH={'30'} p={8} color={'white'}>

    <Stack direction={['column','row']} justifyContent={'space-between'}>
   <VStack w={'full'} >
    <Heading size={'md'} textAlign={'center'}>
      WELCOME TO CRYPTO WORLD
    </Heading>
   </VStack>

   <VStack w={'full'}  borderLeft={['none', '1px solid white']}
          borderRight={['none', '1px solid white']}>
     <Text  textAlign={'center'}>COPYRIGHT © 2024 Parag Mahajan
    
</Text>
<Text textAlign={'center'}>
     ALL RIGHTS RESERVED.
</Text>
    </VStack>

    <VStack w={'full'} >
            <HStack spacing={4}>
<Button  fontSize={24} w={10} borderRadius={'50%'}>
   <a href="https://github.com/parag7720" target='blank'>
    <ImGithub />
    </a> 
    </Button>
<Button   fontSize={22} w={10} borderRadius={'50%'}>
    <a href="https://www.linkedin.com/in/parag-mahajan-b05991223" target='blank'>
        <GrLinkedin />
        </a>
        </Button>

<Button  fontSize={30} width={10} borderRadius={'50%'}>
    <a href="https://www.instagram.com/__parag__77/" target='blank'>

<AiFillInstagram />
    </a>
</Button>
            </HStack>
        </VStack>
    </Stack>
    </Box>
  )
}
