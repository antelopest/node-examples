export default function dataBuilding<T extends Record<string, any>>(file: string, data: T): string {
  for (const [key, value] of Object.entries(data)) {
    file = file.replace(`{{${key}}}`, String(value));
  }

  return file;
}
