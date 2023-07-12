export default function assignShortcuts(shortcutObj) {
  window.addEventListener("keyup", (event) => {
    const keysUp = (
      (event?.shiftKey ? "shift+" : "") +
      (event?.ctrlKey ? "ctrl+" : "") +
      (event?.altKey ? "alt+" : "") +
      (event.key.trim() === "" ? "NULL" : event.key)
    ).toLowerCase();

    const pressed = Object.keys(shortcutObj).includes(keysUp);

    if (pressed) {
      event.preventDefault();

      const action = shortcutObj[keysUp].current;
      action.click();
    }
  });
}
