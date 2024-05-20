//index.tsx//
import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  IconButton,
  useColorMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import Calendar from '@/components/Calendar';
import NFTList from '@/components/NFTList';
import ValueProposition from '@/components/ValueProposition';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Home: React.FC = () => {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [day, setDay] = useState<number>(today.getDate());
  const { colorMode, toggleColorMode } = useColorMode();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="xl" mb={4}>
          {t('find_birthday')}
        </Heading>
        <Box>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            mr={2}
          />
          <Menu>
            <MenuButton as={Button}>
              Language
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
              <MenuItem onClick={() => changeLanguage('es')}>Español</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Text mb={4}>
        {t('buy_gift')}
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
                <Calendar month={month} year={year} day={day} />
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <ValueProposition />
      <NFTList />
      <Box mt={8} p={4} bg="teal.500" color="white" textAlign="center">
        <Heading as="h3" size="lg">
          {t('gift_experience')}
        </Heading>
        <Button mt={4} colorScheme="white" variant="outline">
          {t('gift_now')}
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
