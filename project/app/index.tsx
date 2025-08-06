import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication status and redirect accordingly
    // For demo purposes, always redirect to login
    router.replace('/auth/login');
  }, []);

  return null;
}