export default function formatDuration(duration: string): string {
    const hourMatch = duration.match(/(\d+)h/);
    const minMatch = duration.match(/(\d+)m/);

    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minMatch ? parseInt(minMatch[1]) : 0;

    const hourStr = hours > 0 ? `${hours} jam` : "";
    const minStr = minutes > 0 ? `${minutes} menit` : "";

    return [hourStr, minStr].filter(Boolean).join(" ");
}
