import { InvitationPage } from '@/components/InvitationPage';

type Props = {
  params: Promise<{
    guest: string;
  }>;
};

export default async function Home({ params }: Props) {
  const { guest } = await params;

  const guestName = guest
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <InvitationPage guestName={guestName} />;
}
