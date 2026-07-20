export async function getLiveCompanies() {
  const response = await fetch("/api/jobs", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
}