//NFTCard.tsx//
import React, { useState, useCallback, useMemo } from 'react';
import { Box, Text, Button, Tag, Flex, Select, Input, VStack, HStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  const toast = useToast();

  const handleCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleGift = useCallback(() => {
    if (!email) {
      toast({
        title: "Error",
        description: "Por favor, ingrese el correo del destinatario.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Regalo enviado.",
      description: `Has enviado ${nft.title} a ${email} por ${nft.price} ${selectedCurrency}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }, [email, nft, selectedCurrency, toast]);

  const memoizedBenefits = useMemo(() => (
    nft.benefits.map((benefit, index) => (
      <Tag key={index} m={1} colorScheme="teal" size="sm" fontSize="xs" px={2} py={1}>{benefit}</Tag>
    ))
  ), [nft.benefits]);

  const memoizedSponsors = useMemo(() => (
    nft.sponsors?.map((sponsor, index) => (
      <Box key={index}>
        <Image src={sponsor} alt={`Sponsor ${index + 1}`} height={30} width={100} />
      </Box>
    ))
  ), [nft.sponsors]);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">{nft.title}</Text>
          <Box position="relative" w="100%">
            <Image src={nft.image} alt={nft.title} layout="responsive" width={500} height={500} />
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
          <Flex justify="center" flexWrap="wrap">
            {memoizedBenefits}
            <Tag m={1} colorScheme="orange" size="sm" fontSize="xs" px={2} py={1}>{nft.type}</Tag>
          </Flex>
          <Text mt={2}>{nft.description}</Text>
          {showGiftOption && (
            <HStack mt={2} w="100%">
              <Input
                placeholder="Correo del destinatario"
                value={email}
                onChange={handleEmailChange}
                size="sm"
                borderRightRadius="0"
                w="70%"
                _focus={{ boxShadow: 'outline', borderColor: 'teal.500' }}
              />
              <Button colorScheme="teal" size="sm" borderLeftRadius="0" w="30%">
                Regalar
              </Button>
            </HStack>
          )}
          {nft.sponsors && (
            <Flex justifyContent="center" mt={4} gap={4}>
              {memoizedSponsors}
            </Flex>
          )}
        </VStack>
      </Box>
    </motion.div>
  );
};

export default NFTCard;
