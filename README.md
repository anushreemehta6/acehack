# Idea Nest

A decentralized platform connecting innovative project creators with potential investors.

## Features

- Project creator and investor profiles
- MetaMask integration for Web3 functionality
- Google authentication for seamless sign-in
- Modern and responsive UI built with Next.js and Tailwind CSS

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Prisma (for database management)
- MongoDB
- NextAuth.js (for authentication)

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
     # Google OAuth
     GOOGLE_CLIENT_ID=your_google_client_id_here
     GOOGLE_CLIENT_SECRET=your_google_client_secret_here

     # NextAuth.js
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your_nextauth_secret_here
     ```

4. Set up Google OAuth:
   - Go to the [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to Credentials > Create Credentials > OAuth Client ID
   - Set up the OAuth consent screen
   - Create a Web Application type credential
   - Add `http://localhost:3000` to Authorized JavaScript origins
   - Add `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs
   - Copy the Client ID and Client Secret to your `.env.local` file

5. Generate a NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output to your `NEXTAUTH_SECRET` in `.env.local`

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication Methods

### MetaMask
- Install the MetaMask browser extension
- Connect your wallet through the sign-up process
- Your Ethereum address will be linked to your account

### Google
- Click the "Continue with Google" button
- Select your Google account
- Grant the necessary permissions

## Development

- Built with Next.js 13 (App Router)
- Styled using Tailwind CSS
- Web3 integration with ethers.js
- Authentication handled by NextAuth.js

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
