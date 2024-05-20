//NFTCard.tsx//
import React, { useState, useMemo, useCallback } from 'react';
import { Box, Text, Button, Tag, Flex, Select, Input } from '@chakra-ui/react';

interface NFTCardProps {
  nft: {
    id: number;
    title: string;
    description: string;
    image: string;
    available: number;
    total: number;
    type: string;
    price: string;
    artist: string;
    benefits: string[];
    sponsors?: string[];
  };
  showGiftOption?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, showGiftOption = false }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [email, setEmail] = useState("");

  const handleCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const memoizedBenefits = useMemo(() => (
    nft.benefits.map((benefit, index) => (
      <Tag key={index} m={1} colorScheme="teal" size="sm" fontSize="xs" px={2} py={1}>{benefit}</Tag>
    ))
  ), [nft.benefits]);

  const memoizedSponsors = useMemo(() => (
    nft.sponsors?.map((sponsor, index) => (
      <Box key={index}>
        <img src={sponsor} alt={`Sponsor ${index + 1}`} style={{ height: "30px", maxWidth: "100px" }} />
      </Box>
    ))
  ), [nft.sponsors]);

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      _dark={{ bg: "gray.700" }}
      mb={4}
    >
      <Text fontSize="lg" fontWeight="bold" mb={2}>{nft.title}</Text>
      <Box position="relative">
        <img src={nft.image} alt={nft.title} style={{ margin: "auto", width: "100%" }} />
        <Tag position="absolute" top={2} left={2} colorScheme="teal" size="lg" fontSize="md" px={3} py={2} fontWeight="bold">
          {nft.price}
          <Select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            size="sm"
            ml={2}
            variant="unstyled"
          >
            <option value="USDT">USDT</option>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
          </Select>
        </Tag>
        <Tag position="absolute" top={2} right={2} colorScheme="blue" size="md" fontSize="xs" px={2} py={1}>
          {nft.available} de {nft.total}
        </Tag>
        <Tag position="absolute" bottom={2} right={2} colorScheme="purple" size="md" fontSize="xs" px={2} py={1}>
          {nft.artist}
        </Tag>
      </Box>
      <Flex justify="center" flexWrap="wrap" mt={2}>
        {memoizedBenefits}
        <Tag m={1} colorScheme="orange" size="sm" fontSize="xs" px={2} py={1}>{nft.type}</Tag>
      </Flex>
      <Text mt={2}>{nft.description}</Text>
      {showGiftOption && (
        <Flex mt={2} align="center">
          <Input
            placeholder="Correo del destinatario"
            value={email}
            onChange={handleEmailChange}
            size="sm"
            borderRightRadius="0"
          />
          <Button colorScheme="teal" size="sm" borderLeftRadius="0">
            Regalar
          </Button>
        </Flex>
      )}
      {nft.sponsors && (
        <Flex justifyContent="center" mt={4} gap={4}>
          {memoizedSponsors}
        </Flex>
      )}
    </Box>
  );
};

export default NFTCard;
