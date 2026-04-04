/**
 * useSiteContent – Fetches editable site copy from Supabase site_content table.
 * Returns a key-value map merged with defaults so the app works before any content exists.
 * Authenticated users can update content via upsertContent; updates are persisted to Supabase.
 */

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export type SiteContentKey =
  | "intro"
  | "parkCity"
  | "mooseIntro"
  | "experience"
  | "callToAction"
  | "contact"
  | "newStudentsIntro"
  | "newStudentsProcess"
  | "veteranStudents";

export type SiteContentMap = Record<SiteContentKey, string>;

export const DEFAULT_SITE_CONTENT: SiteContentMap = {
  intro:
    "The leaves are turning and starting to fall while summer quickly fades, which means winter will soon be on our doorstep. In a matter of weeks Park City will soon transform into a winter wonderland creating new stories of skiing, snowboarding and a host of winter activities.",
  parkCity:
    "Park City Mountain Resort is a premier ski destination with easy convenient access being under an hour from the Salt Lake City airport complete with local lodging, great dinning, shopping and galleries all nestled in and around Park City for a great start to your epic ski vacation.",
  mooseIntro:
    "Hello I am Moose, I'm a local full time certified ski instructor here at Park City Ski School. Myself along with a host of others, are here to help you, make your ski vacation at Park City Mountainside, Canyons and Deervalley Fun, Safe and the most Memorable Epic Ski Vacation ever.",
  experience:
    "I create a fun one on one personalized learning experience thats tailored to your specific needs, abilities and or learning style. From first time never ever's to advanced, I make it fun while you learn at all levels.",
  callToAction:
    'So get your calendars out and start planning your 2025/2026 ski trip in advance and request a private ski lessons with me, "The Moose"! To get you started safely, in control and in the right direction, which is all downhill from here.',
  contact:
    "Call today to secure your ski school vacation dates that best work for you and request The Moose!",
  newStudentsIntro:
    "Welcome to a new experience here at the Park City Ski School. My goal is to build your self-confidence while unleashing your athletic ability to teach you to ski in the safest, most fun manner possible.",
  newStudentsProcess:
    "Are you going to fall? Yes! That is primarily the biggest fear for most. We start by getting comfortable, then it's on to the gradual slope where I teach you to stop and turn. Once mastered, it's on to learning how to get on and off the lift safely and on to a beginner slope. What I just explained all happens in about the first 30-60 min, changing the inner screams and fears into outer smiles and laughter. We have fun!",
  veteranStudents:
    'Get those legs in shape with a little cardio and if you like, sign up for a level-up or refresher class with me to get you off to a safe "in control" season, having fun exploring our entire mountain again creating your best ski vacation ever.',
};

export function useSiteContent() {
  const [content, setContent] = useState<SiteContentMap>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: e } = await supabase.from("site_content").select("key, value");
    setLoading(false);
    if (e) {
      setError(e);
      return;
    }
    const merged: SiteContentMap = { ...DEFAULT_SITE_CONTENT };
    if (data) {
      for (const row of data) {
        const key = row.key as SiteContentKey;
        if (key in DEFAULT_SITE_CONTENT && typeof row.value === "string") {
          merged[key] = row.value;
        }
      }
    }
    setContent(merged);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const upsertContent = useCallback(async (updates: Partial<SiteContentMap>) => {
    const rows = Object.entries(updates).map(([key, value]) => ({
      key,
      value: value as string,
      updated_at: new Date().toISOString(),
    }));
    if (rows.length === 0) return { error: null };
    const { error: e } = await supabase.from("site_content").upsert(rows, {
      onConflict: "key",
    });
    return { error: e };
  }, []);

  return { content, loading, error, refetch, upsertContent };
}
