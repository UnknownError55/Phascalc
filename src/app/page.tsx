'use client';
import { useState } from 'react';
import { AllEvidence, AllGhosts, EvidenceSelection, State, evidence_to_old_names } from './types';
import Evidence from './evidence';
import GhostComponent from './ghost';
import RealEvidence from './real_evidence';

const DefaultBlankEvidence: State = {};
for (const k of AllEvidence) {
  DefaultBlankEvidence[k] = EvidenceSelection.Unknown;
}

export default function Home() {
  const [evidence, set_evidence] = useState(DefaultBlankEvidence);

  const impossible_evidence: { [key: string]: boolean } = {};
  const possible_evidence: { [k: string]: number } = {};
  for (const k of AllEvidence) {
    impossible_evidence[k] = false;
    possible_evidence[k] = 0;
  }

  const impossible_ghost: { [key: string]: string[] } = {};
  for (const ghost of AllGhosts) {
    const reasoning = impossible_ghost[ghost] = [] as string[];
    for (const [e, value] of Object.entries(evidence)) {
      const e_name = evidence_to_old_names(+e);
      if (value === EvidenceSelection.Confirmed) {
        if (!RealEvidence[ghost].includes(+e)) {
          reasoning.push(`Confirmed ${e_name}`);
        }
      }
      else if (value === EvidenceSelection.NotSeen) {
        if (RealEvidence[ghost].includes(+e)) {
          reasoning.push(`Have not seen ${e_name}`);
        }
      }
    }
  }

  // Find out what evidence is available from the ghosts available
  // This needs to be done last
  for (const k of AllGhosts) {
    if (impossible_ghost[k].length > 0) {continue;}
    for (const e of RealEvidence[k]) {
      possible_evidence[e]++;
    }
  }

  for (const e of AllEvidence) {
    if (evidence[+e] !== EvidenceSelection.Unknown) { continue; }
    impossible_evidence[e] = possible_evidence[+e] === 0;
  }

  const reset = () => {
    set_evidence({ ...DefaultBlankEvidence });
  };

  return (
    <div>
      <div className='evidence'>
        {AllEvidence.map(k => <Evidence name={k} key={k} state={evidence} setter={set_evidence} impossible={impossible_evidence[k]} />)}
        <div className='flex-1'></div>
        <button className='reset-button' onClick={reset}>Clear</button>
      </div>
      <div className='ghosts'>
        {AllGhosts.map(k => <GhostComponent name={k} key={k} impossible={impossible_ghost} evidence={evidence} />)}
      </div>
    </div>
  )
}
