import pyautogui
import time

def click_at_pointer():
    try:
        while True:
            # Get the current mouse position
            x, y = pyautogui.position()

            # Perform a mouse click at the current position
            pyautogui.click(x, y)

            # Adjust the delay (you can change this as needed)
            time.sleep(0.5)  # Click every 0.5 seconds
    except KeyboardInterrupt:
        print("\nScript stopped by user (Ctrl+C).")

if __name__ == "__main__":
    print("Press Ctrl+C to stop the script.")
    click_at_pointer()
