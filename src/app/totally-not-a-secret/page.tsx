import { SecretPage } from "@/components/SecretPage";

export default function TotallyNotASecretPage() {
  return (
    <SecretPage
      badgeId="totally-not-a-secret"
      title="Nothing to see here."
      description="This is totally not a secret page. Please move along. Nothing is happening."
      bg="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50"
      flavourText={[
        "The URL 'totally-not-a-secret' is extremely suspicious in retrospect.",
        "You saw nothing. We were never here. This page does not exist.",
        "The badge you just unlocked also does not exist. Please disregard the popup.",
        "If anyone asks, you typed this URL by accident. A very long, very specific accident.",
        "We appreciate your discretion in this matter.",
        "There are no other secret pages. (There are other secret pages.)",
      ]}
    />
  );
}
