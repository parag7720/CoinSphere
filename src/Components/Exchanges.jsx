import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Container, Image } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import { HStack ,VStack,Heading} from '@chakra-ui/react';
export default function Exchanges() {
  const [arr,setArr]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  useEffect(()=>{
    const getD=(async()=>{
        try {
          const {data}= await axios.get('https://api.coingecko.com/api/v3/exchanges?per_page=20')
        setArr(data);
        setLoading(false);

        } 
        catch (error) {
          setError(true);
          setLoading(false);
        }
    })

    getD();
  },[])
  

if(error) return <Error Message={'Error While Fetching Exchanges'}/>


    return (
    <>
<Container maxW={'container.xl'}>

    {
        loading ? <Loader Message={'Fetching Exchanges'}/> : <>
        <HStack wrap={'wrap'} display={'flex'} justifyContent={'space-evenly'}>
       {
        arr.map((i)=>{

          return <Box>
             <a href={i.url} target='blank'>

            <VStack key={i.id} gap={3} w={52} shadow={'dark-lg'} p={8} borderRadius={'lg'} transition={'all 0.3s'} m={4} 
            css={{
              "&:hover":{
                transform:'scale(1.1)'
              }
            }}>
            <Image src={i.image} w={20} h={20} alt='Exchange'/>
            <Heading size={'md'} noOfLines={1}>
            {i.trust_score_rank}
            </Heading>
          <Heading noOfLines={1} size={5} textAlign={'center'}>{i.name}</Heading>
          </VStack>
          </a>
              </Box>
        })
       }
        </HStack>
        </> 
    }

</Container>

    </>
  )
}
