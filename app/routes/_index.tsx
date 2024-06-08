import type { MetaFunction } from "@remix-run/node";
import { Layout } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Instant temperature app" },
    { name: "description", content: "Get the temperature of your location" },
  ];
};

export default function Index() {
  return (
    <Layout>
      <h1 className="text-3xl text-orange-600 font-bold underline">
        Hello world!
      </h1>
    </Layout>
  );
}
