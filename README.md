# Link2Pay - Crypto Payment Link Generator

Link2Pay is a full-stack application that allows users to create, share, and manage cryptocurrency payment links. It simplifies the process of receiving crypto payments by generating links with predefined parameters like wallet address, amount, and currency.

## 📱 Demo Implementation

This project is a practical implementation of a concept shared in a viral tweet about simplified cryptocurrency payments. The tweet highlighted the need for an easy way to create and share payment links for crypto transactions without complex wallet interactions.

Link2Pay demonstrates how such an idea can be built into a functional product that addresses real user needs in the cryptocurrency space. While the original tweet proposed a simple concept, this implementation expands on it with additional features like multi-chain support, QR code generation, and wallet integration.

![Link2Pay Screenshot](https://via.placeholder.com/800x400?text=Link2Pay+Screenshot)

## Features

- **Multi-Chain Support:** Generate payment links for Ethereum, Bitcoin, Solana, Polygon, BNB Chain, and Avalanche
- **Customizable Parameters:** Set wallet address, amount, currency, memo, and more
- **QR Code Generation:** Create scannable QR codes for easier mobile payments
- **Wallet Integration:** Direct open-in-wallet functionality for supported cryptocurrency wallets
- **Block Explorer Integration:** View wallet addresses on blockchain explorers
- **Shareable Links:** Easily share payment links via URL or QR code
- **Link Management:** Create, view, edit, and delete payment links
- **Click Tracking:** Monitor link usage with integrated click counter

## 🚀 Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- RESTful API architecture
- Input validation with Joi

### Frontend
- Next.js 13+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Hook Form for form management

## 📋 Project Structure

```
link2pay/
├── backend/            # Express backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Utility functions
│   │   └── index.js      # Entry point
│   ├── .env              # Environment variables
│   └── package.json      # Dependencies
│
├── frontend/           # Next.js frontend
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   ├── components/   # React components
│   │   └── utils/        # Utility functions
│   ├── .env.local        # Environment variables
│   └── package.json      # Dependencies
│
└── README.md           # Project documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

The backend will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local
```

4. Start the development server
```bash
npm run dev
```

The frontend will run on http://localhost:3000

## 📱 Usage

### Creating a Payment Link

1. Navigate to the "Create Link" page
2. Fill in the required fields:
   - Wallet Address: Your cryptocurrency address
   - Blockchain: Select the blockchain network (Ethereum, Bitcoin, etc.)
   - Currency: The cryptocurrency symbol (ETH, BTC, SOL, etc.)
   - Amount (optional): The payment amount
   - Title: A title for the payment link
   - Description (optional): Additional details about the payment
3. Click "Create Payment Link"

### Sharing a Payment Link

1. From the dashboard, find the payment link you want to share
2. Copy the payment URL or share it directly
3. Alternatively, view the payment details page to access the QR code

### Making a Payment

1. Open the payment link in a web browser
2. Scan the QR code with a cryptocurrency wallet app
3. Or click "Open in Wallet" to launch a compatible wallet application
4. Complete the transaction in your wallet app

## 💻 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/payments | Get all payment links |
| GET | /api/payments/:linkId | Get a specific payment link |
| POST | /api/payments | Create a new payment link |
| PUT | /api/payments/:linkId | Update a payment link |
| DELETE | /api/payments/:linkId | Delete a payment link |

## 🔮 Future Enhancements

- User authentication and accounts
- Transaction status tracking
- Additional blockchain support
- Payment analytics and reporting
- Webhook notifications
- Customizable payment page themes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [QRCode.react](https://github.com/zpao/qrcode.react) 