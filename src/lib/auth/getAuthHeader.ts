import { getToken } from '@/lib/cookies';

export function getAuthHeader(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjVlZTljMTYtYjc0OC00M2E0LWJkMWEtNjU2ZmYyNGE3NmRhIiwicm9sZSI6ImtpdGNoZW4iLCJpc3MiOiJmcC1rcGwiLCJleHAiOjE3NTE1NjQyOTEsImlhdCI6MTc1MTUzNTQ5MX0.SwQltPbw5UbtXnT-2hYVzm7mdEqlJxkWPJxufZkUcbo"
  };
}