import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Test GET request
  const testGetRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test POST request
  const testPostRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          message: 'Hello from the frontend!',
        }),
      });

      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test PUT request
  const testPutRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/hello', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: '123',
          name: 'Jane Doe',
          message: 'Updated message!',
        }),
      });

      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test DELETE request
  const testDeleteRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/hello?id=123', {
        method: 'DELETE',
      });

      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test PATCH request
  const testPatchRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/hello', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: '123',
          message: 'Patched message!',
        }),
      });

      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js API Routes Demo</title>
        <meta name="description" content="Demonstrate Next.js API Routes functionality" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Next.js API Routes Demo</h1>

        <p className="description">
          Test different HTTP methods with Next.js API Routes
        </p>

        <div className="grid">
          <button
            className="card"
            onClick={testGetRequest}
            disabled={loading}
          >
            <h2>GET Request</h2>
            <p>Test basic GET functionality</p>
          </button>

          <button
            className="card"
            onClick={testPostRequest}
            disabled={loading}
          >
            <h2>POST Request</h2>
            <p>Create new resources</p>
          </button>

          <button
            className="card"
            onClick={testPutRequest}
            disabled={loading}
          >
            <h2>PUT Request</h2>
            <p>Update existing resources</p>
          </button>

          <button
            className="card"
            onClick={testDeleteRequest}
            disabled={loading}
          >
            <h2>DELETE Request</h2>
            <p>Remove resources</p>
          </button>

          <button
            className="card"
            onClick={testPatchRequest}
            disabled={loading}
          >
            <h2>PATCH Request</h2>
            <p>Partial updates</p>
          </button>
        </div>

        {loading && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {apiResponse && (
          <div className="response">
            <h3>API Response:</h3>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </main>

      <footer className="footer">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Powered by Next.js
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }

        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4rem 0;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          cursor: pointer;
          background: white;
        }

        .card:hover {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h2 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .loading {
          margin: 2rem 0;
          padding: 1rem;
          background: #f0f0f0;
          border-radius: 5px;
        }

        .error {
          margin: 2rem 0;
          padding: 1rem;
          background: #ffebee;
          border: 1px solid #f44336;
          border-radius: 5px;
          color: #c62828;
        }

        .response {
          margin: 2rem 0;
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 5px;
          max-width: 800px;
          overflow-x: auto;
        }

        .response pre {
          white-space: pre-wrap;
          word-break: break-all;
        }

        .footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }

          .card {
            flex-basis: auto;
            margin: 0.5rem 0;
          }
        }
      `}</style>
    </div>
  );
}