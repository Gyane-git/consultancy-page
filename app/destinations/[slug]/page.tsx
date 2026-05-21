import DestinationDetailPage from "@/components/destination-detail-page";

export default async function DynamicDestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DestinationDetailPage slug={slug} />;
}
