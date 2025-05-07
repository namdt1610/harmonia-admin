export const convertSecondsToMinutes = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '00:00'

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
        remainingSeconds
    ).padStart(2, '0')}`
}
