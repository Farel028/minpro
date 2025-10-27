import ExperienceClient from "./ExperienceClient";
import { notFound } from "next/navigation";
import { QUEST_MAP, type QuestKey } from "@/data/quests";

export default function ExperiencePage({
  params
}: {
  params: { quest: string; mode: string };
}) {
  const questKey = params.quest as QuestKey;
  const mode = params.mode === "demo" ? "demo" : "ar";

  if (!QUEST_MAP[questKey]) {
    notFound();
  }

  return <ExperienceClient questKey={questKey} mode={mode} />;
}
