import pyautogui
import time

def main():
    pyautogui.PAUSE = 0.1  # Set a short delay for accurate position readings

    try:
        while True:
            # Simulate a click every 0.1 seconds (adjust if needed)
            pyautogui.click(interval=0.1, button='left')

            # Check for mouse down (left button) and then mouse up (indicating a click)
            if pyautogui.mouseDown(button='left') and not pyautogui.mouseDown(button='left', interval=0.01):
                # Click happened, get current position
                x, y = pyautogui.position()
                print(f"Mouse clicked at: ({x}, {y})")
                break  # Exit the loop after the first click

    except KeyboardInterrupt:
        print("\nExiting...")

if __name__ == "__main__":
    main()
