import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  VStack,
  Card,
  HStack,
  RadioGroup,
  Radio,
  Button,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

let questions = [
  { qn: 'Teacher comes to the class in time', no: 1, id: 1 },
  { qn: 'Teaching is well planned', no: 2, id: 2 },
  { qn: 'Aims/ Objectives made clear', no: 3, id: 3 },
  { qn: 'Subject matter organized in logical sequence', no: 4, id: 4 },
  { qn: 'Teacher comes well prepared in the subject', no: 5, id: 5 },
  { qn: 'Teacher speaks clearly and audibly', no: 6, id: 6 },
  { qn: 'Teacher draws and writes neatly', no: 7, id: 7 },
  {
    qn: 'Teacher provides examples of concepts/principles, explanations are clearly and effective',
    no: 8,
    id: 8,
  },
  {
    qn: "Teacher's pace and level of instruction are suited to the attainment of students",
    no: 9,
    id: 9,
  },
  {
    qn: 'Teacher offers assistance and counselling to needy students',
    no: 10,
    id: 10,
  },
];

let count = 0;



export default function FeedBackForm() {
  let result = {}

  function handleSubmit() {
    console.log(Object.keys(result).length);
    if(Object.keys(result).length == 10){
      result["faculty_id"] = localStorage.getItem("token");
      axios({
        method: 'post',
        url: "http://localhost:8081/users/submit",
        headers: { "Content-Type": "application/json" },
        data: {
          result : result
        }
      }).then((re) => {
        window.location.href="http://localhost:3000/";
      }).catch((e)=>{
        console.log(e.response.data);
      });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("login")!="yes") {
      window.location.href="http://localhost:3000/";
    }
  }, [])
  
  return (
    <Center py={6}>
      <Box
        maxW={'60%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'2xl'}
            letterSpacing={1.1}
            textAlign={'center'}
          >
            FeedBack Form
          </Text>
        </Stack>
        <br />
        <br />
        {questions.map(question => {
          return (
            <VStack>
              <Text>
                {question.no + '.' + '    '}&nbsp;{question.qn}
              </Text>
              <Text>
                <i>Mark only one option</i>
              </Text>
              <RadioGroup name="radios" onChange={()=>{
                let forms = document.getElementsByName("radios");
                let val = 0;
                for (let i = 0; i < forms.length; i++) {
                  if(forms[i].checked)
                    val = forms[i].value;
                  
                }
                result["q"+question.no]  = val;
                console.log(result);
                // console.log({"no": question.no, "selected" : val});
              }
              }>
                <Stack spacing={5} direction="row">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                </Stack>
              </RadioGroup>
              <br />
              <p>
                {
                  '_________________________________________________________________________________________________________________'
                }
              </p>
              <br />
            </VStack>
          );
        })}
        <Button onClick={handleSubmit} style={{ color: 'blue', marginLeft: '80%' }}>Submit</Button>
      </Box>
    </Center>
  );
}
