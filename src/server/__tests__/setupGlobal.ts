export default function setupGlobal(): void {
  process.env.TZ = 'UTC';
  delete process.env.IRIS_URL;
  delete process.env.IRIS_FALLBACK_URL;
}
