export function hapticFeedback () {
    navigator.vibrate ? navigator.vibrate(100) : null
}