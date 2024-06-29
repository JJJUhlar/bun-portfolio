import { Readable } from "stream";
import { Router } from '@stricjs/router';

export default new Router()
  .get('/', () =>  new Response(Readable.from(Bun.file('public/index.html').stream())))
  .get('/ascii', () => new Response(Bun.file("public/ascii.js"), {headers: {"Content-Type": "text/javascript"}}))
  .get('/frames', () => new Response(Readable.from(Bun.file('public/frames.txt').stream()), {headers: {"Content-Type": "text"}}))

   
  // .get('/ascii', () => new Response(Bun.file('public/ascii.js'), {headers: {"Content-Type": "text"}}))
  // .get('/frames', () => new Response(Readable.from(Bun.file('public/frames.txt').stream()),))
