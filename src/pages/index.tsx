//index.tsx//
import { useState } from 'react';
import { Box, Heading, Text, Select, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';
import Calendar from '@/components/Calendar';
import NFTList from '@/components/NFTList';
import ValueProposition from '@/components/ValueProposition';

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const Home: React.FC = () => {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Encuentra un Cumpleaños
      </Heading>
      <Text mb={4}>
        Puedes comprar un regalo para la persona que está de cumpleaños el día seleccionado.
      </Text>
      <Select
        mb={4}
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
        width={{ base: "100%", md: "50%", lg: "25%" }}
      >
        {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Tabs
        variant="soft-rounded"
        colorScheme="teal"
        index={month - 1}
        onChange={(index) => setMonth(index + 1)}
      >
        <TabList flexWrap="wrap">
          {months.map((month, index) => (
            <Tab key={index} fontSize={{ base: "sm", md: "md" }}>{month}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {months.map((_, index) => (
            <TabPanel key={index}>
              <Heading as="h2" size="md" mb={4}>
                {months[index]}
              </Heading>
              <Box overflowX="auto">
                <Calendar month={month} year={year} />
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Box mt={8} p={4} bg="teal.500" color="white" textAlign="center">
        <Heading as="h3" size="lg">
          Regala una experiencia y recuerdo para toda la vida
        </Heading>
        <Button mt={4} colorScheme="white" variant="outline">
          Regalar ahora
        </Button>
      </Box>
      <NFTList />
      <ValueProposition />
    </Box>
  );
};

export default Home;