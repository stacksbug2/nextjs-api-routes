// Next.js API Routes Example
export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are allowed for this endpoint'
    });
  }

  // Simulate some processing
  const timestamp = new Date().toISOString();
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const host = req.headers['host'] || 'localhost';

  // Generate response
  const response = {
    message: 'Hello from Next.js API Routes!',
    timestamp,
    method: req.method,
    url: req.url,
    userAgent,
    host,
    query: req.query,
    environment: {
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development',
      platform: process.platform,
      arch: process.arch,
    },
    features: [
      'API Routes',
      'Middleware Support',
      'Dynamic Routing',
      'Request/Response Helpers',
      'File-based Routing',
      'Automatic Code Splitting',
      'TypeScript Support',
    ],
  };

  // Add custom headers
  res.setHeader('X-API-Version', '1.0.0');
  res.setHeader('X-Response-Time', Date.now().toString());
  res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes

  // Return JSON response
  return res.status(200).json(response);
}

// Additional examples for different HTTP methods
export async function POST(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Name and message are required'
      });
    }

    const response = {
      success: true,
      data: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        message,
        createdAt: new Date().toISOString(),
      },
      message: 'Message created successfully'
    };

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to process request'
    });
  }
}

// PUT example
export async function PUT(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, name, message } = req.body;

    if (!id || !name || !message) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'ID, name, and message are required'
      });
    }

    const response = {
      success: true,
      data: {
        id,
        name,
        message,
        updatedAt: new Date().toISOString(),
      },
      message: 'Message updated successfully'
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update message'
    });
  }
}

// DELETE example
export async function DELETE(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'ID is required'
      });
    }

    const response = {
      success: true,
      message: `Message ${id} deleted successfully`,
      deletedAt: new Date().toISOString(),
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete message'
    });
  }
}

// PATCH example
export async function PATCH(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, ...updateFields } = req.body;

    if (!id) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'ID is required'
      });
    }

    const response = {
      success: true,
      data: {
        id,
        ...updateFields,
        updatedAt: new Date().toISOString(),
      },
      message: 'Message partially updated successfully'
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to patch message'
    });
  }
}