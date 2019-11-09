export default async function fetchJson(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  return response.json()
}
