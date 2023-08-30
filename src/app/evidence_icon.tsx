import { EvidenceType, evidence_to_simple_names } from "./types";
import Dots from './icons/noun-dots.svg';
import GhostOrbs from './icons/noun-bubbles.svg';
import Fingerprints from './icons/noun-fingerprints.svg';
import EMF from './icons/noun-meter.svg';
import SpiritBox from './icons/noun-radio.svg';
import Freezing from './icons/noun-thermometer.svg';
import Writing from './icons/noun-witch-book.svg';
import { classNames } from "./utils";

const ToSvg: { [key: string]: () => any } = {
    [EvidenceType.DOTS]: () => <Dots />,
    [EvidenceType.EMF]: () => <EMF />,
    [EvidenceType.Fingerprints]: () => <Fingerprints />,
    [EvidenceType.Freezing]: () => <Freezing />,
    [EvidenceType.Orbs]: () => <GhostOrbs />,
    [EvidenceType.SpiritBox]: () => <SpiritBox />,
    [EvidenceType.Writing]: () => <Writing />
}

export default function EvidenceIcon(props: { name: EvidenceType, inactive?: boolean }) {
    const classes = classNames({
        [`evidence-${evidence_to_simple_names(props.name)}`]: true && !props.inactive,
        'svg-inactive': props.inactive ?? false
    })

    return <span className={classes}>{ToSvg[props.name]()}</span>;
}