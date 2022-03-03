import { isEmpty } from '/@mflib/str';

export class ClientError extends Error {
  constructor(data) {
    super();
    this.name = 'ClientError';
    if ('string' === typeof data) {
      this.message = data;
    } else if ('object' === typeof data) {
      this.message = data.message;      
      this.statusCode = +(data.code || data.statusCode);
    }

    if (isEmpty(this.message)) {
      this.message = 'Error invoking client API';
    }
  }
}