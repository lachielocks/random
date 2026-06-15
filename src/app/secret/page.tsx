import { SecretPage } from "@/components/SecretPage";

export default function SecretSecretPage() {
  return (
    <SecretPage
      badgeId="secret"
      title="You found the secret."
      description="The secret is: there is no secret. But you found this page, which is something."
      bg="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      flavourText={[
        "The URL /secret is perhaps the least subtle secret URL in internet history. And yet here you are.",
        "We considered hiding something genuinely mysterious here. We ran out of ideas.",
        "You've been logged. (We don't actually log anything. This is part of the vibe.)",
        "The real secret was the friends we made along the way. We made no friends.",
        "If you tell someone about this page, is it still a secret? Philosophers remain divided.",
        "You are one of very few people to have seen this page. Or many. We genuinely have no idea.",
      ]}
    />
  );
}
