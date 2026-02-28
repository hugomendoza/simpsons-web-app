export class ApiError extends Error {
  code: string;
  statusCode: number;
  isRetryable: boolean;
  originalError?: Error;

  constructor(
    message: string,
    code: string,
    statusCode: number,
    isRetryable = false,
    originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
    this.originalError = originalError;
  }

  static fromResponse(response: Response, message?: string): ApiError {
    const statusCode = response.status;
    const defaultMessages: Record<number, string> = {
      400: 'Solicitud inválida',
      401: 'No autorizado',
      403: 'Acceso prohibido',
      404: 'Recurso no encontrado',
      429: 'Demasiadas solicitudes. Intenta más tarde.',
      500: 'Error del servidor',
      502: 'Servicio no disponible',
      503: 'Servicio temporalmente no disponible',
    };

    const defaultMessage = message || defaultMessages[statusCode] || 'Ha ocurrido un error';
    const isRetryable = statusCode >= 500 || statusCode === 429;

    return new ApiError(
      defaultMessage,
      `HTTP_${statusCode}`,
      statusCode,
      isRetryable
    );
  }

  static networkError(originalError: Error): ApiError {
    return new ApiError(
      'Error de conexión. Verifica tu conexión a internet.',
      'NETWORK_ERROR',
      0,
      true,
      originalError
    );
  }

  static timeout(): ApiError {
    return new ApiError(
      'La solicitud tardó demasiado. Intenta de nuevo.',
      'TIMEOUT',
      0,
      true
    );
  }
}

export class ValidationError extends Error {
  field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class RateLimitError extends ApiError {
  retryAfter?: number;

  constructor(retryAfter?: number) {
    super(
      'Has realizado demasiadas solicitudes. Por favor, espera un momento.',
      'RATE_LIMIT',
      429,
      true
    );
    this.retryAfter = retryAfter;
  }
}
