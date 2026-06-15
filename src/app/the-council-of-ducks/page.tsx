import { SecretPage } from "@/components/SecretPage";

export default function CouncilOfDucksPage() {
  return (
    <SecretPage
      badgeId="council-of-ducks"
      title="The Council of Ducks"
      description="You have been found worthy. The Council acknowledges your presence."
      bg="bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-100"
      flavourText={[
        "The Council of Ducks has convened since 1987, when three ducks in a park made a series of decisions that would affect no one.",
        "Membership is by invitation only. You were not invited. You found your way here regardless. The Council respects this.",
        "The Council's primary concerns are: bread quality, pond temperature, and the inexplicable audacity of geese.",
        "You have been granted the rank of Associate Member. This comes with no privileges, responsibilities, or benefits of any kind.",
        "The Council meets quarterly. You will not be informed of the meeting times. The ducks will know.",
        "Quack.",
      ]}
    />
  );
}
