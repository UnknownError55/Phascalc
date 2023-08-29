'use client';
import { useState } from 'react';
import { AllEvidence, AllGhosts, EvidenceSelection, EvidenceType, Ghost, State, evidence_to_old_names } from './types';
import Evidence from './evidence';
import GhostComponent from './ghost';

const DefaultBlankEvidence: State = {};
for (const k of AllEvidence) {
  DefaultBlankEvidence[k] = EvidenceSelection.Unknown;
}

const RealEvidence: {[k: string]: EvidenceType[]} = {
  [Ghost.Banshee]: [EvidenceType.DOTS, EvidenceType.Orbs, EvidenceType.Fingerprints],
  [Ghost.Demon]: [EvidenceType.Writing, EvidenceType.Fingerprints, EvidenceType.Freezing],
  [Ghost.Deogen]: [EvidenceType.DOTS, EvidenceType.Writing, EvidenceType.SpiritBox],
  [Ghost.Goryo]: [EvidenceType.DOTS, EvidenceType.EMF, EvidenceType.Fingerprints],
  [Ghost.Hantu]: [EvidenceType.Orbs, EvidenceType.Fingerprints, EvidenceType.Freezing],
  [Ghost.Jinn]: [EvidenceType.EMF, EvidenceType.Fingerprints, EvidenceType.Freezing],
  [Ghost.Mare]: [EvidenceType.Writing, EvidenceType.Orbs, EvidenceType.SpiritBox],
  [Ghost.Moroi]: [EvidenceType.Writing, EvidenceType.Freezing, EvidenceType.SpiritBox],
  [Ghost.Myling]: [EvidenceType.Writing, EvidenceType.EMF, EvidenceType.Fingerprints],
  [Ghost.Obake]: [EvidenceType.EMF, EvidenceType.Orbs, EvidenceType.Fingerprints],
  [Ghost.Oni]: [EvidenceType.DOTS, EvidenceType.EMF, EvidenceType.Freezing],
  [Ghost.Onryo]: [EvidenceType.Orbs, EvidenceType.Freezing, EvidenceType.SpiritBox],
  [Ghost.Phantom]: [EvidenceType.DOTS, EvidenceType.Fingerprints, EvidenceType.SpiritBox],
  [Ghost.Poltergeist]: [EvidenceType.Writing, EvidenceType.Fingerprints, EvidenceType.SpiritBox],
  [Ghost.Raiju]: [EvidenceType.DOTS, EvidenceType.EMF, EvidenceType.Orbs],
  [Ghost.Revenant]: [EvidenceType.Writing, EvidenceType.Orbs, EvidenceType.Freezing],
  [Ghost.Shade]: [EvidenceType.Writing, EvidenceType.EMF, EvidenceType.Freezing],
  [Ghost.Spirit]: [EvidenceType.Writing, EvidenceType.EMF, EvidenceType.SpiritBox],
  [Ghost.Thaye]: [EvidenceType.DOTS, EvidenceType.Writing, EvidenceType.Orbs],
  [Ghost.TheMimic]: [EvidenceType.Fingerprints, EvidenceType.Freezing, EvidenceType.SpiritBox],
  [Ghost.TheTwins]: [EvidenceType.EMF, EvidenceType.Freezing, EvidenceType.SpiritBox],
  [Ghost.Wraith]: [EvidenceType.DOTS, EvidenceType.EMF, EvidenceType.SpiritBox],
  [Ghost.Yokai]: [EvidenceType.DOTS, EvidenceType.Orbs, EvidenceType.SpiritBox],
  [Ghost.Yurei]: [EvidenceType.DOTS, EvidenceType.Orbs, EvidenceType.Freezing]
}

export default function Home() {
  const [evidence, set_evidence] = useState(DefaultBlankEvidence);

  const impossible_evidence: {[key: string]: string[]} = {};
  for (const k of AllEvidence) {
    impossible_evidence[k] = [];
  }

  const impossible_ghost: {[key: string]: string[]} = {};
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

  return (
    <div>
      <div className='evidence'>
        {AllEvidence.map(k => <Evidence name={k} key={k} state={evidence} setter={set_evidence} impossible={impossible_evidence} />)}
      </div>
      <div className='ghosts'>
        {AllGhosts.map(k => <GhostComponent name={k} key={k} impossible={impossible_ghost} />)}
      </div>
    </div>
  )
}
