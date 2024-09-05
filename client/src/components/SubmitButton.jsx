import { useNavigation } from "react-router-dom";

const SubmitButton = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-orange-600 py-2 text-white font-medium text-lg rounded">
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};
export default SubmitButton;
