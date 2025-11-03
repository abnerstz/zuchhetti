// Polyfills para APIs Web necessárias pelo MSW e testes
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, TransformStream } from 'stream/web';
import { MessageChannel } from 'worker_threads';
import 'whatwg-fetch';
import 'broadcastchannel-polyfill';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
global.ReadableStream = ReadableStream as typeof global.ReadableStream;
global.TransformStream = TransformStream as typeof global.TransformStream;

// MessageChannel polyfill
if (typeof global.MessageChannel === 'undefined') {
  global.MessageChannel = MessageChannel as unknown as typeof global.MessageChannel;
}
