export function startCase(str: string): string {
  if (!str || typeof str !== "string") {
    return "";
  }

  return (
    str
      // Split on word boundaries (spaces, hyphens, underscores, camelCase)
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Handle camelCase
      .replace(/[_-]+/g, " ") // Replace underscores and hyphens with spaces
      .replace(/\s+/g, " ") // Normalize multiple spaces to single space
      .trim() // Remove leading/trailing whitespace
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  );
}
