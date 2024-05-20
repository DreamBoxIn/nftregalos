//ValueProposition.tsx//
import React from 'react';
import { Box, Heading, Text, Icon, SimpleGrid } from '@chakra-ui/react';
import { FaGift, FaClock, FaStar } from 'react-icons/fa';

const ValueProposition: React.FC = () => {
  return (
    <Box mt={8} p={4} bg="gray.100" borderRadius="lg">
      <Heading as="h3" size="lg" mb={4} textAlign="center">Nuestra Propuesta de Valor</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        <Box textAlign="center">
          <Icon as={FaGift} w={10} h={10} color="teal.500" mb={2} />
          <Text fontWeight="bold" fontSize="xl">Regalos Únicos</Text>
          <Text>Ofrecemos NFTs exclusivos que no encontrarás en ningún otro lugar.</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={FaClock} w={10} h={10} color="teal.500" mb={2} />
          <Text fontWeight="bold" fontSize="xl">Disponible 24/7</Text>
          <Text>Compra y regala NFTs en cualquier momento y desde cualquier lugar.</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={FaStar} w={10} h={10} color="teal.500" mb={2} />
          <Text fontWeight="bold" fontSize="xl">Alta Calidad</Text>
          <Text>Todos nuestros NFTs son creados por artistas reconocidos y ofrecen una gran calidad.</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ValueProposition;

