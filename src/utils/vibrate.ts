export function hapticFeedback () {
    navigator.vibrate ? navigator.vibrate(120) : null
}