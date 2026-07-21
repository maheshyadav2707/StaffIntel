import { useState } from "react";
import { DecisionMaker } from "@/types/decisionMaker";

type Props = {
  person: DecisionMaker;
  isTopRecommendation?: boolean;
};

export default function DecisionMakerCard({
  person,
  isTopRecommendation = false,
}: Props) {
    const [showReasons, setShowReasons] = useState(false);
return (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 mb-3">

    <div className="flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {person.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {person.name}
          </h3>

          <p className="text-sm text-zinc-400">
            {person.title}
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            {person.department}
          </p>

        {person.isTopRecommendation ? (
  <div className="mt-2 inline-flex rounded-full bg-yellow-500/20 px-2 py-1 text-xs font-medium text-yellow-300">
    🏆 Best First Contact
  </div>
) : person.recommendation ? (
  <div className="mt-2 inline-flex rounded-full bg-violet-500/20 px-2 py-1 text-xs font-medium text-violet-300">
    ⭐ {person.recommendation}
  </div>
) : null}
        </div>
      </div>

      {/* Right Side */}
      <div className="text-right">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            person.priority === "High"
              ? "bg-red-500/20 text-red-400"
              : person.priority === "Medium"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {person.priority}
        </span>

        <p className="text-xs text-zinc-500 mt-2">
          {person.confidence}% Match
        </p>

        {person.score !== undefined && (
  <p className="text-xs text-cyan-400 font-medium mt-1">
    Contact Score: {person.score}
  </p>
)}
      </div>

    </div>

    {/* Action Buttons */}

    <div className="mt-4 flex gap-2">
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500 transition"
        >
          LinkedIn
        </a>
      )}

      {person.email && (
        <a
          href={`mailto:${person.email}`}
          className="rounded-lg bg-zinc-700 px-3 py-2 text-xs font-medium text-white hover:bg-zinc-600 transition"
        >
          Email
        </a>
      )}
    </div>

    {/* Toggle Button */}

    {person.reasons && (
      <button
        onClick={() => setShowReasons(!showReasons)}
        className="mt-4 text-sm font-medium text-violet-400 hover:text-violet-300 transition"
      >
        {showReasons ? "▼ Hide AI Reasoning" : "▶ Show AI Reasoning"}
      </button>
    )}

    {/* AI Reasons */}

    {showReasons && person.reasons && (
      <div className="mt-3 rounded-lg bg-zinc-800 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Why this contact?
        </p>

        <ul className="space-y-1">
          {person.reasons.map((reason, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-zinc-300"
            >
              <span className="text-green-400">✓</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

  </div>
);
}