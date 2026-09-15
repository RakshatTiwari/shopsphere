import { useContext } from "react";
import { FeedbackContext } from "../../context/feedbackContext";
import "./FeedbackToast.css";

function FeedbackToast() {
  const { feedback, dismissFeedback } = useContext(FeedbackContext);

  if (!feedback) {
    return null;
  }

  const isError = feedback.variant === "error";

  return (
    <div
      className={`feedback-toast feedback-toast--${feedback.variant}`}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
    >
      <span className="feedback-toast__message">{feedback.message}</span>

      <button
        className="feedback-toast__close"
        type="button"
        onClick={dismissFeedback}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

export default FeedbackToast;
