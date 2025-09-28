# XChat Server

XChat is a simple chat application server.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/xchat.git
cd xchat/server
npm install
```

### Running the Server

```bash
npm start
```

The server will start on the default port (e.g., `3000`). You can configure the port in `.env`.

### Running Migrations

If your project uses database migrations (e.g., with Prisma, Sequelize, or Knex), run:

```bash
npm run migrate
```

Or, for Prisma:

```bash
npx prisma migrate deploy
```

Or, for Sequelize:

```bash
npx sequelize db:migrate
```

Check your project's documentation or `package.json` scripts for the exact command.

### Features

- Real-time messaging
- User authentication
- RESTful API endpoints

### Folder Structure

```
server/
├── src/
├── package.json
├── README.md
└── .env
```

### Environment Variables

Create a `.env` file in the `server` directory:

```
PORT=3000
DB_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Contributing

Feel free to open issues or submit pull requests!

### License

MIT
