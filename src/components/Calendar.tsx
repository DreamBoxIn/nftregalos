//Calendar.tsx componente//
import React, { useState, useEffect, memo } from 'react';
import {
  Box, Button, Grid, GridItem, Text, useDisclosure, Tag, useBreakpointValue
} from '@chakra-ui/react';
import NFTModal from './NFTModal';

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarProps {
  month: number;
  year: number;
}

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const Calendar: React.FC<CalendarProps> = memo(({ month, year }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedFullDate, setSelectedFullDate] = useState<string>('');
  const days = daysInMonth(currentMonth, currentYear);
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPastDate, setIsPastDate] = useState(false);

  const tagSize = useBreakpointValue({ base: "xs", md: "sm" });
  const tagFontSize = useBreakpointValue({ base: "xx-small", md: "xs" });
  const tagPadding = useBreakpointValue({ base: "1px", md: "4px" });

  useEffect(() => {
    setCurrentMonth(month);
    setCurrentYear(year);
  }, [month, year]);

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth - 1, day);
    return date < today && date.toDateString() !== today.toDateString();
  };

  const handleClick = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth - 1, day);
    setSelectedDate(day);
    setSelectedFullDate(formatDate(selectedDate));
    setIsPastDate(isPast(day));
    onOpen();
  };

  const handleTagClick = (isPast: boolean) => {
    setIsPastDate(isPast);
    onOpen();
  };

  const handleDateChange = (date: string) => {
    const selectedDate = new Date(date);
    setSelectedFullDate(date);
    setSelectedDate(selectedDate.getDate());
    setCurrentMonth(selectedDate.getMonth() + 1);
    setCurrentYear(selectedDate.getFullYear());
  };

  const products = [
    { id: 1, title: "NFT 1", description: "Description of NFT 1", image: "/nft1.png", available: 10, total: 20, type: "Art", price: "100 USDT", artist: "Artist 1", benefits: ["VIP Access", "Event Discount"] },
    { id: 2, title: "NFT 2", description: "Description of NFT 2", image: "/nft2.png", available: 5, total: 10, type: "Music", price: "2 ETH", artist: "Artist 2", benefits: ["Exclusive Content Access", "Merchandise Discount"] },
    { id: 3, title: "NFT 3", description: "Description of NFT 3", image: "/nft3.png", available: 3, total: 5, type: "Collectible", price: "3 ETH", artist: "Artist 3", benefits: ["Meet & Greet Access", "Future Purchase Discount"] },
  ];

  return (
    <Box>
      <Grid templateColumns="repeat(7, 1fr)" gap={1} w="100%">
        {dayNames.map((dayName, index) => (
          <GridItem key={index} textAlign="center">
            <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{dayName}</Text>
          </GridItem>
        ))}
        {Array.from({ length: firstDay }).map((_, index) => (
          <GridItem key={index} />
        ))}
        {Array.from({ length: days }).map((_, i) => (
          <GridItem key={i} w="100%" textAlign="center" position="relative">
            <Button
              onClick={() => handleClick(i + 1)}
              colorScheme={selectedDate === i + 1 ? "teal" : isPast(i + 1) ? "red" : "gray"}
              size={{ base: "sm", md: "lg" }}
              w="100%"
              h={{ base: "50px", md: "70px" }}
              style={{
                backgroundColor: isPast(i + 1) ? 'rgba(255, 0, 0, 0.4)' : '',
                fontSize: '1.2rem',
              }}
            >
              {i + 1}
            </Button>
            {!isPast(i + 1) && (
              <Tag
                size={tagSize}
                colorScheme="blue"
                position="absolute"
                bottom={0}
                right={0}
                fontSize={tagFontSize}
                px={tagPadding}
                opacity={0.7}
                onClick={() => handleTagClick(false)}
              >
                {products[i % products.length].available} left
              </Tag>
            )}
            {isPast(i + 1) && (
              <Tag
                size={tagSize}
                colorScheme="red"
                position="absolute"
                bottom={0}
                right={0}
                fontSize={tagFontSize}
                px={tagPadding}
                opacity={0.7}
                onClick={() => handleTagClick(true)}
              >
                Expired
              </Tag>
            )}
          </GridItem>
        ))}
      </Grid>

      {isOpen && (
        <NFTModal
          isOpen={isOpen}
          onClose={onClose}
          isPastDate={isPastDate}
          selectedFullDate={selectedFullDate}
          products={products}
          onDateChange={handleDateChange}
        />
      )}
    </Box>
  );
});

export default Calendar;
