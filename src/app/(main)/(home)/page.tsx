import { redirect } from "next/navigation";

export default function Home() {
  redirect("/sets");
  return <div>Dashboard</div>;
}
