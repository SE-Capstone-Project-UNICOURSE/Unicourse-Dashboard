import io from 'socket.io-client';

class SocketClient {
  private socket: ReturnType<typeof io> | null = null;

  private static instance: SocketClient;

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.socket = null;
  }

  // Singleton: Get the single instance of SocketClient
  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  // Connect to the server with optional parameters
  public connect(url: string, options: object = {}): void {
    if (!this.socket) {
      this.socket = io(url, options);
    }
  }

  // Disconnect from the server and clean up socket
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Listen to a specific event from the server
  public on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Emit a specific event to the server
  public emit(event: string, ...args: any[]): void {
    if (this.socket) {
      this.socket.emit(event, ...args);
    }
  }
}

export default SocketClient.getInstance();
