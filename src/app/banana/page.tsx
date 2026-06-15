import { SecretPage } from "@/components/SecretPage";

export default function BananaPage() {
  return (
    <SecretPage
      badgeId="banana"
      title="You found the banana."
      description="Of all the URLs to type, you typed /banana. Respect."
      bg="bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100"
      flavourText={[
        "Bananas are berries. Strawberries aren't. You probably know this if you've been to the facts page.",
        "The word 'banana' is believed to come from the Arabic word 'banan,' meaning finger.",
        "Bananas are technically herbs. The banana 'tree' is actually the world's largest herbaceous plant.",
        "A cluster of bananas is called a hand. A single banana is called a finger. You are holding a finger right now, metaphorically.",
        "The Cavendish banana — the one you eat — nearly went extinct in the 1950s and replaced the Gros Michel, which people say tasted much better.",
        "There are over 1,000 varieties of banana. You probably eat one.",
      ]}
    />
  );
}
