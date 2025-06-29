'use client';
import { useState } from 'react';

export default function TestApi() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    try {
      setLoading(true);
      setResult('Testing connection...');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kitchen/queue/lowest`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      // TypeScript-safe error handling
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setResult(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const testAllEndpoints = async () => {
    const endpoints = [
      { name: 'Test Base URL', url: '', method: 'GET' },
      { name: 'Get All Menu (v1)', url: '/api/v1/menu', method: 'GET' },
      { name: 'Get All Menu (direct)', url: '/menu', method: 'GET' },
      { name: 'Get All Categories', url: '/api/v1/category', method: 'GET' },
    ];

    setResult('Testing all endpoints...\n\n');
    
    for (const endpoint of endpoints) {
      try {
        setResult(prev => prev + `Testing ${endpoint.name}...\n`);
        setResult(prev => prev + `URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint.url}\n`);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint.url}`);
        
        setResult(prev => prev + `Status: ${response.status} ${response.statusText}\n`);
        setResult(prev => prev + `Content-Type: ${response.headers.get('content-type')}\n`);
        
        const responseText = await response.text();
        
        if (response.headers.get('content-type')?.includes('application/json')) {
          try {
            const data = JSON.parse(responseText);
            setResult(prev => prev + `✅ ${endpoint.name}: Success\n${JSON.stringify(data, null, 2)}\n\n`);
          } catch (parseError) {
            setResult(prev => prev + `❌ ${endpoint.name}: JSON Parse Error\n${responseText.substring(0, 200)}...\n\n`);
          }
        } else {
          setResult(prev => prev + `❌ ${endpoint.name}: Not JSON response\n${responseText.substring(0, 200)}...\n\n`);
        }
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setResult(prev => prev + `❌ ${endpoint.name}: Network Error - ${errorMessage}\n\n`);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Connection Test</h1>
      
      <div className="mb-4 space-x-4">
        <button 
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded"
        >
          {loading ? 'Testing...' : 'Test Single Endpoint'}
        </button>
        
        <button 
          onClick={testAllEndpoints}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded"
        >
          Test All Endpoints
        </button>

        <button 
          onClick={() => {location.reload()}}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reload Page
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          API Base URL: <code className="bg-gray-100 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_BASE_URL || 'Not set'}</code>
        </p>
      </div>
      
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
        {result || 'Click button to test API connection'}
      </pre>
    </div>
  );
}