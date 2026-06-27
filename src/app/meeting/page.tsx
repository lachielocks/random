"use client";

import { useState, useCallback } from "react";
import { GeneratorPage, pick } from "@/components/GeneratorPage";
import { meetingTitles, agendaItems, durations, locations } from "@/data/meetings";

interface Meeting {
  title: string;
  duration: string;
  location: string;
  agenda: string[];
}

function generate(): Meeting {
  const shuffled = [...agendaItems].sort(() => Math.random() - 0.5);
  return {
    title: pick(meetingTitles),
    duration: pick(durations),
    location: pick(locations),
    agenda: shuffled.slice(0, 4 + Math.floor(Math.random() * 3)),
  };
}

export default function MeetingPage() {
  const [meeting, setMeeting] = useState<Meeting>(() => generate());
  const [key, setKey] = useState(0);

  const regen = useCallback(() => {
    setMeeting(generate());
    setKey((k) => k + 1);
  }, []);

  const copyText = () =>
    `MEETING INVITE\n\n${meeting.title}\nWhen: ${meeting.duration}\nWhere: ${meeting.location}\n\nAgenda:\n${meeting.agenda.map((a, i) => `${i + 1}. ${a}`).join("\n")}\n\n(This could have been an email.)`;

  return (
    <GeneratorPage
      href="/meeting"
      badge="Calendar Blocker™"
      badgeColor="text-teal-600 border-teal-200"
      title="Meeting Invite Generator"
      subtitle="Calendar invites for meetings that should have been emails."
      gradient="from-teal-50 via-cyan-50 to-sky-50"
      buttonLabel="Schedule Suffering"
      buttonClass="bg-teal-500 hover:bg-teal-600 shadow-teal-200"
      cardBorder="border-teal-200"
      footerNote="No actual calendar invites will be sent. You're welcome."
      onGenerate={regen}
      onCopy={copyText}
      render={() => (
        <div key={key} className="space-y-4">
          <div>
            <p className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1">Subject</p>
            <p className="text-xl font-black text-gray-900">{meeting.title}</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>⏱ {meeting.duration}</span>
            <span>📍 {meeting.location}</span>
          </div>
          <div className="pt-4 border-t-2 border-gray-100">
            <p className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-3">Agenda</p>
            <ol className="space-y-2">
              {meeting.agenda.map((item, i) => (
                <li key={i} className="text-gray-700 text-sm flex gap-2">
                  <span className="font-bold text-teal-400 shrink-0">{i + 1}.</span> {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    />
  );
}
