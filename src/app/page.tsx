'use client';
import { useState } from 'react';
import { AllEvidence, AllGhosts, EvidenceSelection, Ghost, State, evidence_to_old_names } from './types';
import Evidence from './evidence';
import GhostComponent from './ghost';
import RealEvidence from './real_evidence';
import { Tooltip as ReactTooltip } from "react-tooltip";
import OptionButtons, { Choice } from './option_buttons';
import { set_diff } from './utils';

const DefaultBlankEvidence: State = {};
for (const k of AllEvidence) {
  DefaultBlankEvidence[k] = EvidenceSelection.Unknown;
}

export default function Home() {
  const [evidence, set_evidence] = useState(DefaultBlankEvidence);
  const [hunt_sanity, set_hunt_sanity] = useState('');
  const [known_age, set_known_age] = useState('');
  const [hunt_refusal, set_hunt_refusal] = useState(Choice.Unknown);

  const impossible_evidence: { [key: string]: boolean } = {};
  const possible_evidence: { [key: string]: number } = {};
  for (const k of AllEvidence) {
    impossible_evidence[k] = false;
    possible_evidence[k] = 0;
  }

  const impossible_ghost: { [key: string]: string[] } = {};
  for (const ghost of AllGhosts) {
    impossible_ghost[ghost] = [] as string[];
  }

  if (hunt_sanity !== '') {
    const s = +hunt_sanity;
    if (s > 70) { impossible_ghost[Ghost.Demon].push('Sanity durring hunt was above 70% (Careful: Can hunt due to "ability phase activation" regardless of sanity)'); }
    if (s > 40) { impossible_ghost[Ghost.Deogen].push('Sanity durring hunt was above 40%'); }
    if (s > 60) {
      impossible_ghost[Ghost.Mare].push('Sanity durring hunt was above 60%');
      impossible_ghost[Ghost.Onryo].push('Sanity durring hunt was above 60% (Careful: Can hunt after 3 candle blowouts regardless of sanity)');
    }
    if (s > 65) { impossible_ghost[Ghost.Raiju].push('Sanity durring hunt was above 65%'); }
    if (s > 35) { impossible_ghost[Ghost.Shade].push('Sanity durring hunt was above 35%'); }
    if (known_age === '') {
      // Assuming highest threshhold
      if (s > 75) {
        impossible_ghost[Ghost.Thaye].push('Sanity durring hunt was above 75%');
      }
    }
    else {
      const requirement = 75 - (Math.max(0, Math.min(10, +known_age)) * 6);
      if (s > requirement) {
        impossible_ghost[Ghost.Thaye].push(`Sanity durring hunt was above ${requirement.toFixed(0)}%, too high for a Thaye at age ${known_age}`);
      }
    }
    if (s > 80) { impossible_ghost[Ghost.Yokai].push('Sanity durring hunt was above 80%'); }
    if (s > 50) {
      const ghosts = [
        Ghost.Spirit, Ghost.Wraith, Ghost.Phantom, Ghost.Poltergeist, Ghost.Jinn, Ghost.Revenant, Ghost.Yurei,
        Ghost.Oni, Ghost.Hantu, Ghost.Goryo, Ghost.Myling, Ghost.Obake, Ghost.Moroi
      ];
      for (const ghost of ghosts) {
        impossible_ghost[ghost].push('Sanity durring hunt was above 50%');
      }
    }
  }

  // Ghost refusal to hunt
  const refusal_ghosts = [Ghost.Raiju, Ghost.Yokai];
  if (hunt_refusal === Choice.Yes) {
    for (const ghost of set_diff(AllGhosts, [...refusal_ghosts, Ghost.TheMimic])) {
      impossible_ghost[ghost].push('This is not a ghost that refuses to hunt');
    }
  }
  else if (hunt_refusal === Choice.No) {
    for (const ghost of refusal_ghosts) {
      impossible_ghost[ghost].push('This is a ghost that refuses to hunt');
    }
  }

  // Ensure that the Mimic is not solo at this point. The mimic needs to be able to mimic another ghost.
  if (impossible_ghost[Ghost.TheMimic].length === 0) {
    if (!Object.entries(impossible_ghost).filter(([k, _v]) => +k !== Ghost.TheMimic).some(([_k, v]) => v.length === 0)) {
      impossible_ghost[Ghost.TheMimic].push('No ghost to mimic');
    }
  }

  for (const ghost of AllGhosts) {
    const reasoning = impossible_ghost[ghost];
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
    if (impossible_ghost[k].length > 0) { continue; }
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
      <div className='additional-tells'>
        <div className='hunt-section'>
          <h1>Hunt</h1>
          <div>
            <label htmlFor='hunt_sanity'>Highest hunt sanity:</label>
            <input name='hunt_sanity' type='number' className='num' value={hunt_sanity} onChange={e => set_hunt_sanity(e.target.value)}></input>
          </div>
          <OptionButtons state={hunt_refusal} setter={set_hunt_refusal} label='Refuses to hunt' tip={[
            'Raiju will refuse to hunt if there is no active electronic equipment',
            'Yokai will not hunt unless someone talks in the ghosts current room',
            'The Mimic can mimic these ghosts\' traits'
          ]} />
        </div>
        <div>
          <h1>Additional Info</h1>
          <label data-tooltip-id='ghost-age'>Ghost age</label>
          <input type='number' className='num' value={known_age} onChange={e => set_known_age(e.target.value)}></input>
          <ReactTooltip id='ghost-age' place='bottom' variant='info'>
            <div className='wrap-this'>
              The ghost age is used to determine the threshhold for the Thaye hunt range, which can start at 75% at age 0, and end at 15% for age 10+
            </div>
          </ReactTooltip>
        </div>
      </div>
    </div>
  )
}
