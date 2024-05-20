//Calendar.tsx componente//
import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import {
  Box, Button, Grid, GridItem, Text, useDisclosure, Tag, useBreakpointValue
} from '@chakra-ui/react';
import NFTModal from './NFTModal';
import { daysInMonth, formatDate, isPast } from '@/utils/dateUtils';

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

interface CalendarProps {
  month: number;
  year: number;
}

const Calendar: React.FC<CalendarProps> = memo(({ month, year }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate());
  const [selectedFullDate, setSelectedFullDate] = useState<string>(formatDate(today));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPastDate, setIsPastDate] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const tagSize = useBreakpointValue({ base: "xs", md: "sm" });
  const tagFontSize = useBreakpointValue({ base: "xx-small", md: "xs" });
  const tagPadding = useBreakpointValue({ base: "1px", md: "4px" });

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    setCurrentMonth(month);
    setCurrentYear(year);
    setSelectedDate(today.getDate());
    setSelectedFullDate(formatDate(today));
  }, [month, year, today]);

  const days = useMemo(() => daysInMonth(currentMonth, currentYear), [currentMonth, currentYear]);
  const firstDay = useMemo(() => new Date(currentYear, currentMonth - 1, 1).getDay(), [currentYear, currentMonth]);

  const products = useMemo(() => [
    { id: 1, title: "NFT 1", description: "Descripción del NFT 1", image: "/nft1.png", available: 10, total: 20, type: "Arte", price: "100 USDT", artist: "Artista 1", benefits: ["Acceso VIP", "Descuento en eventos"] },
    { id: 2, title: "NFT 2", description: "Descripción del NFT 2", image: "/nft2.png", available: 5, total: 10, type: "Música", price: "2 ETH", artist: "Artista 2", benefits: ["Acceso a contenido exclusivo", "Descuento en mercancía"] },
    { id: 3, title: "NFT 3", description: "Descripción del NFT 3", image: "/nft3.png", available: 3, total: 5, type: "Coleccionable", price: "3 ETH", artist: "Artista 3", benefits: ["Acceso a meet & greet", "Descuento en futuras compras"] },
  ], []);

  const handleClick = useCallback((day: number) => {
    const selectedDate = new Date(currentYear, currentMonth - 1, day);
    setSelectedDate(day);
    setSelectedFullDate(formatDate(selectedDate));
    setIsPastDate(isPast(selectedDate, today));
    onOpen();
  }, [currentMonth, currentYear, today, onOpen]);

  const handleTagClick = useCallback((isPast: boolean) => {
    setIsPastDate(isPast);
    onOpen();
  }, [onOpen]);

  const handleDateChange = useCallback((date: string) => {
    const selectedDate = new Date(date);
    setSelectedFullDate(date);
    setSelectedDate(selectedDate.getDate());
    setCurrentMonth(selectedDate.getMonth() + 1);
    setCurrentYear(selectedDate.getFullYear());
  }, []);

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
              colorScheme={selectedDate === i + 1 ? "teal" : isPast(new Date(currentYear, currentMonth - 1, i + 1), today) ? "red" : "gray"}
              size={{ base: "sm", md: "md" }}
              w="100%"
            >
              {i + 1}
            </Button>
            {!isPast(new Date(currentYear, currentMonth - 1, i + 1), today) && (
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
                {products[i % products.length].available} de {products[i % products.length].total}
              </Tag>
            )}
            {isPast(new Date(currentYear, currentMonth - 1, i + 1), today) && (
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
                Vencido
              </Tag>
            )}
          </GridItem>
        ))}
      </Grid>

      {isClient && (
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
