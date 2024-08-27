import { type NameStoneUser } from "@/lib/namestone";
import UpdateForm from "./update-form";

export default function UserPage({ user }: { user: NameStoneUser }) {
  return (
    <>
      <section className="mx-auto w-full max-w-xl pb-40">
        <UpdateForm user={user} />
      </section>
    </>
  );
}
