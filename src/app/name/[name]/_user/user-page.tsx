import { type NameStoneUser } from "@/lib/namestone";
import UpdateForm from "./update-form";

export default function UserPage({ user }: { user: NameStoneUser }) {
  return (
    <main className="max-w-xl w-full self-center">
      <UpdateForm user={user} />
    </main>
  );
}
