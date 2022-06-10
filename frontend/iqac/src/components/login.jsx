import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import axios from 'axios';

export default function LoginForm() {

  function check() {
    // fetch("http://localhost:8081/users/login", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username: document.getElementById('email').value, password: document.getElementById('password').value}),
    // }).then((re) => {
    //   localStorage.setItem("login","yes")
    //   window.location.href="http://localhost:3000/user";
    // }).catch((e)=>{
    //   console.log(e);
    // })
    
    axios({
      method: 'post',
      url: "http://localhost:8081/users/login",
      headers: { "Content-Type": "application/json" },
      data: {
        username: document.getElementById('email').value,
        password: document.getElementById('password').value
      }
    }).then((re) => {
      localStorage.setItem("token",re.data.token);
      localStorage.setItem("login","yes")
      window.location.href="http://localhost:3000/user";
    }).catch((e)=>{
      console.log(e.response.data);
    });
    
    // console.log(document.getElementById('email').value,document.getElementById('password').value);
    // let params = new URLSearchParams;
    // params.append("username",document.getElementById('email').value);
    // params.append("password",document.getElementById('password').value);
    // axios.post("http://localhost:8081/users/login",params).then((results)=>{
    //   console.log(results);
    // });

    
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login Page</Heading>
          <Text fontSize={'lg'} color={'gray.600'}></Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" id="email"/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" id="password"/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              ></Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={check}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
