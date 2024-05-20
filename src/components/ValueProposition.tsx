//ValueProposition.tsx//
import React from 'react';
import { Box, Text, Icon, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { FaGift, FaClock, FaStar } from 'react-icons/fa';

const ValueProposition: React.FC = () => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(26, 32, 44, 0.1)');
  const borderColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box mt={8} p={4} bg={bgColor} borderRadius="lg" border={`1px solid ${borderColor}`}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        <Box textAlign="center">
          <Icon as={FaGift} w={10} h={10} color="teal.500" mb={2} />
          <Text fontWeight="bold" fontSize="xl" color={textColor}>Regalos Únicos</Text>
          <Text color={textColor}>Ofrecemos NFTs exclusivos que no encontrarás en ningún otro lugar.</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={FaClock} w={10} h={10} color="teal.500" mb={2} />
          <Text fontWeight="bold" fontSize="xl" color={textColor}>Disponible 24/7</Text>
          <Text color={textColor}>Compra y regala NFTs en cualquier momento y desde cualquier lugar.</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={FaStar} w={10} h={10} color="teal.500" mb={2} />
          <Text fontWeight="bold" fontSize="xl" color={textColor}>Alta Calidad</Text>
          <Text color={textColor}>Todos nuestros NFTs son creados por artistas reconocidos y ofrecen una gran calidad.</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ValueProposition;
