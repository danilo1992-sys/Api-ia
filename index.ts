const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    return new Response("Hello word");
  },
});

