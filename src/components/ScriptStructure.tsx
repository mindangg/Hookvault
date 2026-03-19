import React from "react";
import { ScriptStructure as ScriptStructureType } from "@/lib/openai";
import { CopyButton } from "./CopyButton";

interface ScriptStructureProps {
  data: ScriptStructureType;
}

export function ScriptStructure({ data }: ScriptStructureProps) {
  const copyText = [
    `FORMULA: ${data.title}`,
    "",
    data.sections
      .map(
        (s) =>
          `[${s.timestamp}] ${s.section_name}\n"${s.content}"\nPurpose: ${s.purpose}\nTechnique: ${s.technique}`
      )
      .join("\n\n"),
    "",
    `OVERALL FORMULA:\n${data.overall_formula}`,
    "",
    `HOW TO REUSE:\n${data.reuse_tip}`,
  ].join("\n");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white/90 font-semibold text-lg">{data.title}</h3>
        <CopyButton text={copyText} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left text-white/40 text-xs uppercase tracking-wider pb-3 pr-4 font-medium">
                Time
              </th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wider pb-3 pr-4 font-medium">
                Section
              </th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wider pb-3 pr-4 font-medium">
                Content
              </th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wider pb-3 pr-4 font-medium">
                Purpose
              </th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wider pb-3 font-medium">
                Technique
              </th>
            </tr>
          </thead>
          <tbody>
            {data.sections.map((section, i) => (
              <tr
                key={i}
                className="border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors"
              >
                <td className="py-3 pr-4 text-white/40 text-xs whitespace-nowrap align-top">
                  {section.timestamp}
                </td>
                <td className="py-3 pr-4 text-white/70 font-medium align-top whitespace-nowrap">
                  {section.section_name}
                </td>
                <td className="py-3 pr-4 text-white/60 align-top max-w-[200px]">
                  <span className="italic">&ldquo;{section.content}&rdquo;</span>
                </td>
                <td className="py-3 pr-4 text-white/50 align-top max-w-[200px]">
                  {section.purpose}
                </td>
                <td className="py-3 align-top">
                  <span className="inline-block bg-white/[0.08] text-white/70 text-xs px-2 py-0.5 rounded-full border border-white/[0.08] whitespace-nowrap">
                    {section.technique}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overall Formula */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mt-6">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Overall Formula</p>
        <p className="text-white/70 text-sm leading-relaxed">{data.overall_formula}</p>
      </div>

      {/* How to Reuse */}
      <div className="bg-white/[0.06] border border-white/[0.12] border-l-2 border-l-white/30 rounded-xl p-4 mt-4">
        <p className="text-white/80 text-sm leading-relaxed">
          <span className="mr-2">💡</span>
          <span className="text-white/30 text-xs tracking-widest uppercase mr-2">How to Reuse:</span>
          {data.reuse_tip}
        </p>
      </div>
    </div>
  );
}
