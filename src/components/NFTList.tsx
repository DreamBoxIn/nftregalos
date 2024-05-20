//NFTList.tsx//
import React, { useMemo } from 'react';
import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import NFTCard from './NFTCard';
import { nfts } from '@/config/nfts';

const NFTList: React.FC = () => {
  const memoizedNFTs = useMemo(() => nfts, []);

  return (
    <Box mt={8}>
      <Heading as="h3" size="lg" mb={4}>Explora Nuestros NFTs</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {memoizedNFTs.map(nft => (
          <NFTCard key={nft.id} nft={nft} showGiftOption={true} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default NFTList;
