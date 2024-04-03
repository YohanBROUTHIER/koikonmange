export default function (req, res) {
  res.sendFile(new URL('../../dist/index.html', import.meta.url).pathname);
}