import { Readable } from "stream";

const app = Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  fetch(req) {
    let route = new URL(req.url).pathname
    switch (route) {
      case "/":
        return new Response(Readable.from(Bun.file('public/index.html').stream()))
      case "/ascii":
        return new Response(Bun.file("public/ascii.js"), {headers: {"Content-Type": "text/javascript"}})
      case "/frames":
        return new Response(Readable.from(Bun.file('public/frames.txt').stream()), {headers: {"Content-Type": "text"}})
      default:
        return new Response("Whoops, nothing to see here!",{status: 404})
    }

  }
})

console.log(app.hostname)
console.log(app.port)