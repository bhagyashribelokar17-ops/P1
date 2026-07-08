import AuthLayout from "../components/AuthLayout";
import DynamicForm from "../components/DynamicForm";

export default function SignupScreen() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your account to access secure biometric authentication."
    >
      <DynamicForm formKey="signup" />
    </AuthLayout>
  );
}