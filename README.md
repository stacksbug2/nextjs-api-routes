# Next.js API Routes Starter

A comprehensive Next.js application demonstrating API Routes functionality with all HTTP methods, error handling, middleware, and modern development practices.

## 🚀 Features

- **API Routes**: Complete implementation of all HTTP methods (GET, POST, PUT, DELETE, PATCH)
- **Error Handling**: Comprehensive error handling and custom error responses
- **Middleware Support**: Request/response middleware examples
- **TypeScript Ready**: TypeScript configuration included
- **Environment Configuration**: Multiple environment support
- **Modern Development**: Latest Next.js features and best practices
- **Testing Ready**: Jest and testing utilities configured
- **Production Ready**: Optimized for production deployment

## 📋 Prerequisites

- **Node.js**: `>= 18.0.0`
- **npm**: `>= 9.0.0`
- **Git**: For version control

## 🏗️ Architecture

```
nextjs-api-routes/
├── pages/
│   ├── api/
│   │   └── hello.js          # API Routes examples
│   └── index.js              # Frontend interface
├── public/                   # Static assets
├── styles/                   # CSS modules
├── .env.local               # Environment variables
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
└── README.md                # This documentation
```

## 🚀 Quick Start

### 1. Clone and Setup
```bash
# Clone the repository
git clone <repository-url>
cd nextjs-api-routes

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

### 2. Development Mode
```bash
# Start development server
npm run dev

# Open browser and navigate to
# http://localhost:3000
```

### 3. Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
nextjs-api-routes/
├── pages/
│   ├── api/
│   │   ├── hello.js          # Complete API Routes example
│   │   └── [dynamic].js      # Dynamic routes example
│   └── index.js              # React frontend
├── public/
│   ├── favicon.ico
│   └── images/
├── styles/
│   ├── globals.css
│   └── Home.module.css
├── .env.local               # Environment variables
├── .env.example             # Environment template
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
├── README.md                # Documentation
└── tailwind.config.js       # Tailwind CSS (optional)
```

## 🔧 API Routes Examples

### GET Request
```javascript
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({
    message: 'Hello from Next.js API Routes!',
    timestamp: new Date().toISOString(),
    method: req.method,
  });
}
```

### POST Request
```javascript
export async function POST(req, res) {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Name and message are required'
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        message,
        createdAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}
```

### Dynamic Routes
```javascript
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        user: { id, name: 'John Doe' }
      });
    case 'PUT':
      return res.status(200).json({
        message: `User ${id} updated`
      });
    case 'DELETE':
      return res.status(200).json({
        message: `User ${id} deleted`
      });
    default:
      return res.status(405).json({
        error: 'Method not allowed'
      });
  }
}
```

### Middleware Example
```javascript
// Custom middleware
export default function handler(req, res) {
  // Authentication middleware
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Rate limiting middleware
  const rateLimit = checkRateLimit(req.ip);
  if (rateLimit.exceeded) {
    return res.status(429).json({
      error: 'Too many requests'
    });
  }

  // Your API logic here
  return res.status(200).json({ message: 'Success' });
}
```

## 🌐 Frontend Interface

The included React frontend provides:

- **Interactive API Testing**: Test all HTTP methods
- **Real-time Response Display**: View API responses instantly
- **Error Handling Demo**: See error responses in action
- **Loading States**: Proper loading indicators
- **Responsive Design**: Works on all devices

### Key Components

```javascript
// API testing component
const APITester = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async (method) => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello', { method });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => testAPI('GET')}>Test GET</button>
      <button onClick={() => testAPI('POST')}>Test POST</button>
      {loading && <p>Loading...</p>}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};
```

## 🔧 Configuration

### Environment Variables
```bash
# Application
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database
DATABASE_URL=your-database-url

# API Configuration
API_BASE_URL=http://localhost:3000/api
API_TIMEOUT=30000

# Development
NODE_ENV=development
DEBUG=true
```

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,PATCH' },
        ],
      },
    ];
  },
};
```

## 🧪 Testing

### API Testing
```bash
# Test GET request
curl http://localhost:3000/api/hello

# Test POST request
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"name":"John","message":"Hello"}'

# Test with query parameters
curl "http://localhost:3000/api/hello?param1=value1&param2=value2"
```

### Using Postman
1. Import the collection from `docs/postman-collection.json`
2. Set environment variables
3. Test all endpoints

### Frontend Testing
```bash
# Run component tests
npm run test

# Run E2E tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXTAUTH_SECRET
vercel env add DATABASE_URL
```

### Docker
```bash
# Build image
docker build -t nextjs-api-routes .

# Run container
docker run -p 3000:3000 nextjs-api-routes
```

### Other Platforms
- **Netlify**: Connect to Git repository
- **Heroku**: Add `next.config.js` buildpack
- **AWS Amplify**: Auto-deployment from Git
- **Railway**: Git push deployment

## 🔒 Security

### API Security
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Authentication middleware
- Request size limits

### Environment Security
```javascript
// Secure headers in next.config.js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ];
}
```

### Error Handling
```javascript
// Custom error page
export default function CustomError({ statusCode, message }) {
  return (
    <div>
      <h1>{statusCode}</h1>
      <p>{message}</p>
    </div>
  );
}
```

## 📊 Monitoring

### Health Check
```bash
# Health check endpoint
curl http://localhost:3000/api/health

# Response
{
  "status": "healthy",
  "timestamp": "2023-10-01T12:00:00.000Z",
  "uptime": 3600
}
```

### Performance Monitoring
```javascript
// Add performance monitoring
export default function handler(req, res) {
  const start = Date.now();

  // Your API logic here

  const duration = Date.now() - start;
  console.log(`Request took ${duration}ms`);
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📚 Documentation

### API Endpoints
- `GET /api/hello` - Hello world example
- `POST /api/hello` - Create resource
- `PUT /api/hello` - Update resource
- `DELETE /api/hello` - Delete resource
- `PATCH /api/hello` - Partial update

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Create new resources
- **PUT**: Update existing resources
- **DELETE**: Remove resources
- **PATCH**: Partial updates

### Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- **403**: Forbidden
- `404`: Not Found
- `405`: Method Not Allowed
- `429`: Too Many Requests
- `500`: Internal Server Error

## 📄 License

MIT

## 🆘 Support

For issues and questions:
- **GitHub Issues**: https://github.com/your-org/nextjs-api-routes/issues
- **Documentation**: https://nextjs.org/docs/api-routes/introduction
- **Community**: https://nextjs.org/community
- **Discord**: https://nextjs.org/discord

## 🔗 External Links

- **Next.js Documentation**: https://nextjs.org/docs
- **API Routes Guide**: https://nextjs.org/docs/api-routes/introduction
- **Middleware**: https://nextjs.org/docs/middleware
- **Deployment**: https://nextjs.org/docs/deployment

---

Built with ❤️ using Next.js API Routes
