import Featurelayout from "@/app/global/components/Featurelayout"


export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Featurelayout>{children}</Featurelayout>;
}