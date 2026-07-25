import type { Metadata } from "next";
import { TeamTest } from "@/components/swissbrut/TeamTest";

export const metadata: Metadata = {
  title: "Test - Team Names"
};

export default function TestPage() {
  return <TeamTest />;
}
