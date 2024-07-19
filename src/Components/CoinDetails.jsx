import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomBar from './CustomBar';
import { Container,Box,Radio,RadioGroup,Stack,VStack,HStack,Image,Text,Stat,StatLabel,StatNumber,StatHelpText,StatArrow,Badge,Button } from '@chakra-ui/react';
import Error from './Error';
import Loader from './Loader';
import Item from './Item';
import Chart from './Chart';
export default function CoinDetails() {
  const [coin,setCoin]=useState([]);
  const [loading,setLoading]=useState(true);
  const [currency,setCurrency]=useState("inr");
  const [error, setError] = useState(false);
  const [arrow,setArrow]=useState('increase');

  const [days,setDays]=useState("24h")
  const [chartarr,setChartarr]=useState([])

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
  
  
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const params=useParams();
  let percent="";
  useEffect(()=>{
    
    const getCoinData=async()=>{
      try{
        
        const {data}= await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
        const {data: chartData} = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setChartarr(chartData.prices);
        setLoading(false);
        setCoin(data);
       
        percent=data.market_data.price_change_percentage_24h;
        if(percent<0)setArrow('decrease')
      }
      catch(error){
        setLoading(false);
        setError(true);
      }
    }
    
    getCoinData();
  },[params.id,currency,days])
  

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };
  const name=coin.id;
  function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

if(error) return <Error Message={ `Error While Fetching ${params.id}`}/>


  return (
    <>
    <Container maxW={'container.xl'}>

      {
         loading ? <Loader Message={`Fetching ${params.id}`}/> : <>


        <Box w={'full'} borderWidth={1} >
        <Chart arr={chartarr} days={days} currency={currencySymbol} />
        </Box>
       
        <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>

         <Box shadow={'dark-lg'}>
         <HStack>
          <RadioGroup onChange={setCurrency} value={currency}>
      <Stack direction='row' margin={4} >
        <Radio  marginRight={2} colorScheme='red' value='inr'>{"INR"}</Radio>
        <Radio marginRight={2} value='usd'>{"USD"}</Radio>
        <Radio value='eur'>{"EUR"}</Radio>
      </Stack>
    </RadioGroup>
          </HStack>

          <VStack display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  w={'full'}>
            <Text fontSize={'small'} alignSelf={'center'}>
              Last Updated On {Date(coin.last_updated).split('G')[0]}
            </Text>
            <Box boxSize={'150px'}>
          <Image  src={coin.image.large} />
            </Box>
            <Stat>
    <StatLabel>
      {capitalizeFirstLetter(name)}</StatLabel>
    <StatNumber>{`${currencySymbol}${coin.market_data.current_price[currency]}`}</StatNumber>
    <StatHelpText>
      <StatArrow type={arrow}/>
        {coin.market_data.price_change_percentage_24h}
    </StatHelpText>
  </Stat>



<Badge fontSize={'xl'}>
  {`#${coin.market_cap_rank}`}
</Badge>


<CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />
          
          
<Box w={'full'} p={4}>
<Item Title={"Max Supply"} Value={coin.market_data.max_supply} />
<Item Title={"Circulating Supply"} Value={coin.market_data.circulating_supply} />
<Item Title={"Market Capital"} Value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`} />
<Item Title={"All Time Low"} Value={`${currencySymbol} ${coin.market_data.atl[currency]}`} />
<Item Title={"All Time High"} Value={`${currencySymbol} ${coin.market_data.ath[currency]}`} />

</Box>

          </VStack>
         </Box>
         </>
      }
    </Container>
    </>
  )
}


