import { useCallback, useMemo, useRef, useState } from "react";
import { FeedbackContext } from "./feedbackContext";

const DEFAULT_DURATION = 3200;

export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState(null);
  const timeoutRef = useRef(null);

  const dismissFeedback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setFeedback(null);
  }, []);

  const showFeedback = useCallback(
    (message, variant = "success", duration = DEFAULT_DURATION) => {
      if (!message) {
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const id = Date.now();

      setFeedback({
        id,
        message,
        variant,
      });

      timeoutRef.current = setTimeout(() => {
        setFeedback((currentFeedback) => {
          if (currentFeedback?.id !== id) {
            return currentFeedback;
          }

          return null;
        });

        timeoutRef.current = null;
      }, duration);
    },
    [],
  );

  const value = useMemo(
    () => ({
      feedback,
      showFeedback,
      dismissFeedback,
    }),
    [feedback, showFeedback, dismissFeedback],
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}
