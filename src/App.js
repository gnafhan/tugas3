import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Center,
  Input,
  Button,
  Flex,
  Text,
  Heading,
  Tag,
  TagLabel,
  TagCloseButton,
  FormControl,
  FormLabel,
  useToast,
  Select,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';

function App() {
  const [value, setValue] = React.useState("");
  const [text, setText] = React.useState([]);
  const [option1, setOption1] = React.useState("");
  const [option2, setOption2] = React.useState("");
  const toast = useToast();
  const [selectedIndex1, setSelectedIndex1] = React.useState(0);
  const [selectedIndex2, setSelectedIndex2] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    if (text.includes(value)) {
      toast({
        title: 'Value tidak boleh sama dengan di dalam array',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }else{
      setText([...text, value]);

    }
  };

  const handleClear = () => {
    setText([]);
  };

  const tagClose = (index) => {
    return () => {
      const temp = [...text];
      temp.splice(index, 1);
      setText(temp);
    };
  };

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      if (text.includes(value)) {
        toast({
          title: 'Value tidak boleh sama dengan di dalam array',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top'
        });
      }else{
        setText([...text, value]);
  
      }
    }
  };

  const handleOption1 = (event) => {
    const selectedIndex1 = event.target.selectedIndex;
    setOption1(event.target.value)
    setSelectedIndex1(selectedIndex1)
  }
  const handleOption2 = (event) => {
    const selectedIndex2 = event.target.selectedIndex;
    setOption2(event.target.value)
    setSelectedIndex2(selectedIndex2)
  }

  const handleOptionClick = () => {
    //switch the index option 1 to index option2
    const temp = text[selectedIndex1-1];
    text[selectedIndex1-1] = text[selectedIndex2-1];
    text[selectedIndex2-1 ] = temp;
    setText([...text])

  }



  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="">
        <ColorModeSwitcher/>
        <Box textAlign="center">  
          <Heading marginTop={20}>Dynamic Switcher</Heading>
          <Box textAlign="center" marginTop={10}>
          <Center>
            <Box w={{ base: "80%", sm: "50%", md: "40%" }}>
              <Card>
                <CardBody>
              <Text>List:</Text>
          {text.map((item, index) => <Tag key={index} fontSize={17} size="lg" borderRadius='full' variant='solid' colorScheme='purple' margin={1}><TagLabel>{item}</TagLabel><TagCloseButton onClick={tagClose(index)} /></Tag>)}

             

                </CardBody>
              </Card>

            </Box>
            </Center>
          </Box>
        </Box>
      <Center h="50vh">
        <Box w={{ base: "80%", sm: "50%", md: "40%" }}>
          <FormControl >
            <Flex>
              <Input onKeyDown={handleKey} onChange={handleChange} placeholder="Enter something" flexGrow="1" mr={{ base: "0", sm: "2" }} />
              <Button marginRight={1} onClick={handleClick} ml={{ base: "0", sm: "0" }} mt={{ base: "0", sm: "0" }}>
                Submit
              </Button>
              
              <Button onClick={handleClear} ml={{ base: "0", sm: "0" }} mt={{ base: "0", sm: "0" }}>
                Clear
              </Button>
            </Flex>
            <FormLabel mt={5}>Switch array</FormLabel>
            <Flex>
            <Select onChange={handleOption1} mx={1} placeholder='From'>
              {text.map((item, index)=><option>{item + ` (${index + 1})`}</option>)}
            </Select>
            <Select onChange={handleOption2} mx={1} placeholder='To'>
              {text.map((item, index)=><option>{item + ` (${index + 1})`}</option>)}
            </Select>
            <Button onClick={handleOptionClick} >Switch</Button>

            </Flex>
          </FormControl>
            
        </Box>
       </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;
