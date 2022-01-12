export function hapticFeedback () {
    navigator.vibrate ? navigator.vibrate(90) : null
}