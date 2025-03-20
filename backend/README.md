# Link2Pay - Crypto Payment Link Generator

Link2Pay is a Node.js-based backend for generating standardized cryptocurrency payment links. It simplifies the process of sharing wallet addresses by creating links with predefined parameters like address, amount, and currency.

## Features

- Generate payment links for multiple blockchains (Ethereum, Bitcoin, Solana, Polygon, BNB, Avalanche)
- Store and manage payment links
- Track link usage with click counters
- Secure API with validation

## Requirements

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/link2pay.git
cd link2pay
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Edit the `.env` file with your configuration

## Running the application

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

## API Endpoints

### Create a payment link
```
POST /api/payments
```

Request body:
```json
{
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "blockchain": "ethereum",
  "currency": "ETH",
  "amount": 0.1,
  "title": "Payment for services",
  "memo": "Invoice #12345",
  "description": "Payment for web development services"
}
```

### Get all payment links
```
GET /api/payments
```

### Get a specific payment link
```
GET /api/payments/:linkId
```

### Update a payment link
```
PUT /api/payments/:linkId
```

### Delete a payment link
```
DELETE /api/payments/:linkId
```

## Future Enhancements

- User authentication and authorization
- Custom payment link slugs
- QR code generation
- Analytics dashboard
- Internationalization support

## License

MIT 