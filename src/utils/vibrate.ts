export function hapticFeedback () {
    navigator.vibrate ? navigator.vibrate(80) : null
}