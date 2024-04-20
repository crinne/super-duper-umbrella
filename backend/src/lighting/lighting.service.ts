import * as os from 'os';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'net';
import { SendRpcRequest } from './interface/rpc-request.type';

@Injectable()
export class LightingService {
  constructor(private readonly configService: ConfigService) {}

  async sendRpcRequest<T>(method: SendRpcRequest, params = []): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestId = Math.random().toString(36).slice(2, 9);
      const socket = new Socket();
      const homeDir = os.homedir();

      const socketPath = path.join(
        homeDir,
        this.configService.get<string>('lighting.socketPath'),
      );

      socket.connect(socketPath);

      socket.on('connect', () => {
        const request = JSON.stringify({
          jsonrpc: '2.0',
          method: method,
          params: params,
          id: requestId,
        });

        socket.write(request);
      });

      let receivedData = Buffer.alloc(0);

      socket.on('data', (data: Buffer) => {
        receivedData = Buffer.concat([receivedData, data]);
        try {
          const response = JSON.parse(receivedData.toString());
          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response.result);
          }
          socket.end();
        } catch (error) {}
      });

      socket.on('error', (error) => {
        reject(error);
      });
    });
  }
}
