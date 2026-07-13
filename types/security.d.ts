// Tipos de seguridad para la aplicación

export interface SecureUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  createdAt: Date;
  lastLogin: Date;
}

export interface SecureSession {
  user: SecureUser;
  expires: string;
  accessToken: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SecureRequest {
  userId?: string;
  userRole?: string;
  timestamp: number;
  ip: string;
  userAgent: string;
}

// Tipos para validación de entrada
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ConsultaData {
  titulo: string;
  descripcion: string;
  categoria: string;
  urgencia: 'baja' | 'media' | 'alta';
}

// Tipos para auditoría
export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  timestamp: Date;
  ip: string;
  userAgent: string;
} 