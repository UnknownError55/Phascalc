import { EvidenceSelection, EvidenceType, State, evidence_to_old_names } from "./types";
import Image from 'next/image'
import { classNames } from "./utils";
import Dots from './icons/noun-dots.svg?url';
import GhostOrbs from './icons/noun-bubbles.svg?url';
import Fingerprints from './icons/noun-fingerprints.svg?url';
import EMF from './icons/noun-meter.svg?url';
import SpiritBox from './icons/noun-radio.svg?url';
import Freezing from './icons/noun-thermometer.svg?url';
import Writing from './icons/noun-witch-book.svg?url';

const ToSvg: {[key: string]: any} = {
    [EvidenceType.DOTS]: Dots,
    [EvidenceType.EMF]: EMF,
    [EvidenceType.Fingerprints]: Fingerprints,
    [EvidenceType.Freezing]: Freezing,
    [EvidenceType.Orbs]: GhostOrbs,
    [EvidenceType.SpiritBox]: SpiritBox,
    [EvidenceType.Writing]: Writing
}

export interface EvidenceProps {
    name: EvidenceType;
    state: State;
    setter: (x: State) => void;
    impossible: { [key: string]: string[] };
}

export default function Evidence(props: EvidenceProps) {
    const current = props.state[props.name];
    const onClick = () => {
        let next_state: EvidenceSelection;
        if (current === EvidenceSelection.Unknown) {
            next_state = EvidenceSelection.Confirmed;
        }
        else if (current === EvidenceSelection.Confirmed) {
            next_state = EvidenceSelection.NotSeen;
        }
        else if (current === EvidenceSelection.NotSeen) {
            next_state = EvidenceSelection.Unknown;
        }
        else {throw new Error('Reached the end of the EvidenceSelection branch');}
        const new_state = { ...props.state, [props.name]: next_state };
        props.setter(new_state);
    };

    const classes = classNames({
        'svg': true,
        'green': current === EvidenceSelection.Confirmed,
        'red': current === EvidenceSelection.NotSeen,
    });

    const svg = ToSvg[props.name];

    return <Image className={classes} src={svg} alt={evidence_to_old_names(props.name)} onClick={onClick} />
}
