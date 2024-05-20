//NFTModal.tsx//
import React from 'react';
import {
  Box, Text, Modal, ModalOverlay, ModalContent,
  ModalFooter, ModalBody, ModalCloseButton, useColorModeValue
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import NFTCard from './NFTCard';
import { nfts } from '@/config/nfts';

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPastDate: boolean;
  selectedFullDate: string;
}

const NFTModal: React.FC<NFTModalProps> = ({ isOpen, onClose, isPastDate, selectedFullDate }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const modalBg = useColorModeValue("var(--modal-bg-color)", "var(--modal-bg-color-dark)");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={modalBg} backdropFilter="blur(10px)" borderRadius="lg" p={4}>
        <ModalCloseButton />
        <ModalBody>
          {isPastDate ? (
            <Text>El día seleccionado ya ha pasado. Por favor, selecciona un día disponible.</Text>
          ) : (
            <>
              <Text fontSize="lg" fontWeight="bold">{selectedFullDate}</Text>
              <Slider {...settings}>
                {nfts.map(product => (
                  <NFTCard key={product.id} nft={product} showGiftOption={true} />
                ))}
              </Slider>
            </>
          )}
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            <FacebookShareButton url={window.location.href} quote="NFTs Recomendados">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href} title="NFTs Recomendados">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={window.location.href} title="NFTs Recomendados">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NFTModal;
