import { SecretPage } from "@/components/SecretPage";

export default function Definitely404Page() {
  return (
    <SecretPage
      badgeId="fake-404"
      title="404 Not Found"
      description="Except you found it. So it's not really a 404. Paradox achieved."
      bg="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"
      flavourText={[
        "This page claims to be missing but is clearly right here.",
        "HTTP status: 200. Emotional status: confused.",
        "You typed a URL that doesn't exist on the menu. The menu is incomplete. Always has been.",
        "The real 404 was the friends we made along the way.",
        "If a page 404s in the forest and you're the only one who finds it, did it 404?",
      ]}
    />
  );
}
