const keyStrokeSounds = [
  "/sounds/keystroke1.mp3",
  "/sounds/keystroke2.mp3",
  "/sounds/keystroke3.mp3",
  "/sounds/keystroke4.mp3",
];

export const playRandomKeyStrokeSound = () => {
  try {
    const randomSound =
      keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
    const audio = new Audio(randomSound);
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch (error) {
    console.error("Failed to play sound:", error);
  }
};

export default function useKeyboardSound() {
  return { playRandomKeyStrokeSound };
}
