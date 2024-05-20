//NFTList.tsx//
import React, { useState, useCallback } from 'react';
import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import NFTCard from './NFTCard';
import { nfts as initialNfts } from '@/config/nfts';

const NFTList: React.FC = () => {
  const [nfts, setNfts] = useState(initialNfts);

  const handleGift = useCallback((id: number, newAvailable: number) => {
    setNfts(prevNfts =>
      prevNfts.map(nft =>
        nft.id === id ? { ...nft, available: newAvailable } : nft
      )
    );
    console.log(`NFT ${id} new available: ${newAvailable}`);
  }, []);

  console.log('Rendering NFTList, handleGift:', handleGift);

  return (
    <Box mt={8}>
      <Heading as="h3" size="lg" mb={4}>Explora Nuestros NFTs</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {nfts.map(nft => (
          <NFTCard key={nft.id} nft={nft} showGiftOption={true} onGift={handleGift} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default NFTList;
