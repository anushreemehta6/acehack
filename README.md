# Idea Nest

A decentralized platform connecting innovative project creators with potential investors.

## Features

- Project creator and investor profiles
- MetaMask integration for Web3 functionality
- Modern and responsive UI built with Next.js and Tailwind CSS

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Prisma (for database management)
- MongoDB
- Firebase Authentication

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     # Firebase Configuration
     NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
     ```

4. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com)
   - Create a new project or select an existing one
   - Enable Email/Password authentication
   - Get your Firebase configuration from Project Settings
   - Add the configuration values to your `.env.local` file

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication Methods

### Email/Password
- Sign up with your email and password
- Create your profile with additional information
- Access your dashboard

### MetaMask
- Install the MetaMask browser extension
- Connect your wallet through the sign-up process
- Your Ethereum address will be linked to your account

## Development

- Built with Next.js 13 (App Router)
- Styled using Tailwind CSS
- Web3 integration with ethers.js
- Authentication handled by Firebase

## Project Structure

```
idea-nest/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/             # Utility functions and configurations
│   └── types/           # TypeScript type definitions
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
