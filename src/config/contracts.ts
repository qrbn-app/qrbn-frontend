// Minimal ABI for ERC20 tokens (USDT/USDC)
export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  
  // Authenticated Functions
  'function transfer(address to, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  
  // Events
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
] as const;

// USDT ABI (can be the same as ERC20 for most cases)
export const USDT_ABI = ERC20_ABI;

// USDC ABI (can be the same as ERC20 for most cases)
export const USDC_ABI = ERC20_ABI;

// QRBN Treasury Contract ABI (placeholder - update with actual ABI)
export const TREASURY_ABI = [
  // Function to deposit tokens for Qurban
  'function depositForQurban(address token, uint256 amount, string calldata recipientName) external',
  
  // Events
  'event QurbanDonation(address indexed donor, address token, uint256 amount, string recipientName, uint256 timestamp)',
] as const;

// QRBN NFT Contract ABI (placeholder - update with actual ABI)
export const QRBN_NFT_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function tokenURI(uint256 tokenId) view returns (string memory)',
  
  // Authenticated Functions
  'function safeMint(address to, string memory uri) external',
  
  // Events
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
] as const;
