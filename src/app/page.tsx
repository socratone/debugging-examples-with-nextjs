import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-8">
      <Link href="/eruda">Eruda</Link>
      <Link href="/winston">Winston</Link>
    </main>
  );
}
