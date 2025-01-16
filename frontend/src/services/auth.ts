interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock validation
  if (!credentials.email || !credentials.password) {
    return {
      success: false,
      error: 'Email och lösenord krävs'
    };
  }

  // Mock successful login (in real app, this would be an API call)
  if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
    return {
      success: true,
      token: 'mock-jwt-token'
    };
  }

  return {
    success: false,
    error: 'Felaktiga inloggningsuppgifter'
  };
};

export const logout = async (): Promise<void> => {
  // Clear local storage/cookies in real implementation
  await new Promise(resolve => setTimeout(resolve, 300));
}; 