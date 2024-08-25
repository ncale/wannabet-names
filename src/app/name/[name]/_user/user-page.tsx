import { type NameStoneUser } from "@/lib/namestone";
import UpdateForm from "./update-form";

export default function UserPage({ user }: { user: NameStoneUser }) {
  return (
    <main className="w-full max-w-xl self-center">
      <UpdateForm user={user} />
    </main>
  );
}
