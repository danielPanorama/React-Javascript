import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const pieData = [
  { name: 'Stock A', value: 400 },
  { name: 'Stock B', value: 300 },
  { name: 'Stock C', value: 200 },
  { name: 'Stock D', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const response = await axios.get('https://backend.danielladd1.repl.co/api/data');

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minHeight="100vh" bgColor={useColorModeValue('gray.100', 'gray.900')}>
      {/* Header */}
      <Flex as="header" p={4} borderBottomWidth="1px" borderColor={borderColor}>
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="outline"
        />
        <Spacer />
        <Heading as="h1" size="md" textColor={textColor}>
          Dashboard
        </Heading>
        <Spacer />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? '🌙' : '☀️'}
          onClick={toggleColorMode}
          variant="outline"
        />
      </Flex>

      {/* Side Menu */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            {/* Add menu items here */}
            <Text>Menu item 1</Text>
            <Text>Menu item 2</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box
              boxShadow="md"
              p={5}
              borderRadius="md"
              bgColor={bgColor}
              borderColor={borderColor}
              borderWidth="1px"
            >
              <Heading as="h2" size="lg" mb={4} textColor={textColor}>
                response
              </Heading>
              {/* Line chart */}
              <LineChart width={400} height={300} data={data}>
                <XAxis dataKey="name" stroke={textColor} />
                <YAxis stroke={textColor} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </Box>
            <Box
              boxShadow="md"
              p={5}
              borderRadius="md"
              bgColor={bgColor}
              borderColor={borderColor}
              borderWidth="1px"
            >
              <Heading as="h2" size="lg" mb={4} textColor={textColor}>
                Portfolio Allocation
              </Heading>
              {/* Pie chart */}
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
          </SimpleGrid>

          {/* Accordion */}
          <Box
            boxShadow="md"
            p={5}
            borderRadius="md"
            bgColor={bgColor}
            borderColor={borderColor}
            borderWidth="1px"
          >
            <Heading as="h2" size="lg" mb={4} textColor={textColor}>
              Portfolio Assets
            </Heading>
            <Accordion allowToggle>
              {pieData.map((asset, index) => (
                <AccordionItem key={`asset-${index}`}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {asset.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {/* Asset details */}
                    <Text>Asset details go here...</Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;

