import ResetPasswordForm from "@/app/(features)/authentication/components/ResetPasswordForm";

export default async function ResetPassword({
    params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  return <ResetPasswordForm ResetKey={key} />;
}