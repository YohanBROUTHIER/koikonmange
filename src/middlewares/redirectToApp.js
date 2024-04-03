export default function (_, res) {
  res.sendFile(new URL('../../dist/index.html', import.meta.url).pathname);
}