export function displayFileSize(bytes: number): string {
  if (bytes == null) {
    return "-";
  } else {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${Math.floor(bytes / (1024 / 10)) / 10} kB`;
    } else {
      return `${Math.floor(bytes / ((1024 * 1024) / 10)) / 10} mB`;
    }
  }
}
