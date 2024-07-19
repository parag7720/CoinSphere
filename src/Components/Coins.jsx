import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Box,HStack,VStack,Image,Heading,Text,Container,RadioGroup,Radio,Stack } from '@chakra-ui/react'
import Loader from './Loader';
import { Button } from '@chakra-ui/react'
import Error from './Error'
import { Link } from 'react-router-dom'
export default function Coins() {

  const [coins,setCoins]=useState([]);
  const [loading,setLoading]=useState(true);
  const [currency,setCurrency]=useState("inr");
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

const btns=new Array(132).fill(1);

let currencySymbol="₹"
  if(currency==='inr'){
    currencySymbol="₹"
  }
  else if(currency==='usd'){
    currencySymbol="$"
  }
  else{
    currencySymbol="€"
  }

  


  useEffect(()=>{
    const getC=async()=>{
      try{
  const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${currentPage}`)
     
      setLoading(false);
      setCoins(data);
      }
      catch(error){
        setError(true);
        setLoading(false);
      }
    }


    getC();
  },[currency,currentPage])
  
  

  if(error) return <Error Message={'Error While Fetching Exchanges'}/>


  return (
   <>
    <Container maxW={'container.xl'} >
      {
        loading ? <Loader Message={'Fetching Coins'}/> : <>
        <Box>
          <HStack>
          <RadioGroup onChange={setCurrency} value={currency}>
      <Stack direction='row' margin={4} >
        <Radio  marginRight={2} colorScheme='red' value='inr'>{"INR"}</Radio>
        <Radio marginRight={2} value='usd'>{"USD"}</Radio>
        <Radio value='eur'>{"EUR"}</Radio>
      </Stack>
    </RadioGroup>
          </HStack>
          <HStack wrap={'wrap'} display={'flex'} justifyContent={'space-evenly'}>
            {
              coins.map((i)=>{
                return <Link to={`/Coins/${i.id}`} key={i.id}>
                <VStack  shadow={'dark-lg'} p={8} m={4} w={52} transition={'all 0.3s'} css={{
                  "&:hover":{
                    transform:'scale(1.1)'
                  }
                }}>
                  <Image h={20} w={20} src={i.image} alt={i.name} />
                  <Heading size={5}>
                    {i.symbol}
                  </Heading>
                  <Heading size={5} noOfLines={1} textAlign={'center'} >{i.name}</Heading>
                  <Text>{i.current_price ?  `${currencySymbol} ${i.current_price}` :'NA'}</Text>
                </VStack>
            </Link>
              })
            }
          </HStack>
            <HStack w={'full'} overflowX={'auto'} gap={5} marginTop={4} marginBottom={2} p={1}>
            {
              btns.map((item,index)=>{
                return <Button key={index+1} bgColor={'blackAlpha.900'} color={'white'} shadow={'dark-lg'} p={2} onClick={()=>{setCurrentPage(index+1)}} marginBottom={2} transition={'all 0.3s'} css={{
                  "&:hover":{
                    color:'black',
                    transform:'scale(1.1)'
                  }
                }}>
                  {index+1}
                </Button>
              })
            }
            </HStack>
        
        </Box>
        </>
      }
    </Container>

   </>
  )
}
