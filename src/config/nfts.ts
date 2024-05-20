//config/nfts.ts//
export interface NFT {
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
}

export const nfts: NFT[] = [
  { id: 1, title: "NFT 1", description: "Descripción del NFT 1", image: "/nft1.png", available: 10, total: 20, type: "Arte", price: "100", artist: "Artista 1", benefits: ["Acceso VIP", "Descuento en eventos"], sponsors: ["/nft1.png", "/nft2.png"] },
  { id: 2, title: "NFT 2", description: "Descripción del NFT 2", image: "/nft2.png", available: 5, total: 10, type: "Música", price: "500", artist: "Artista 2", benefits: ["Acceso a contenido exclusivo", "Descuento en mercancía"], sponsors: ["/nft2.png", "/nft3.png"] },
  { id: 3, title: "NFT 3", description: "Descripción del NFT 3", image: "/nft3.png", available: 3, total: 5, type: "Coleccionable", price: "1.000", artist: "Artista 3", benefits: ["Acceso a meet & greet", "Descuento en futuras compras"], sponsors: ["/nft3.png", "/nft1.png"] },
];