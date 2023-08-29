import { EvidenceType, evidence_to_old_names, evidence_to_simple_names } from "./types";
import Image from 'next/image'
import Dots from './icons/noun-dots.svg?url';
import GhostOrbs from './icons/noun-bubbles.svg?url';
import Fingerprints from './icons/noun-fingerprints.svg?url';
import EMF from './icons/noun-meter.svg?url';
import SpiritBox from './icons/noun-radio.svg?url';
import Freezing from './icons/noun-thermometer.svg?url';
import Writing from './icons/noun-witch-book.svg?url';
import { classNames } from "./utils";

const ToSvg: { [key: string]: any } = {
    [EvidenceType.DOTS]: Dots,
    [EvidenceType.EMF]: EMF,
    [EvidenceType.Fingerprints]: Fingerprints,
    [EvidenceType.Freezing]: Freezing,
    [EvidenceType.Orbs]: GhostOrbs,
    [EvidenceType.SpiritBox]: SpiritBox,
    [EvidenceType.Writing]: Writing
}

export default function EvidenceIcon(props: { name: EvidenceType, inactive?: boolean }) {
    const svg = ToSvg[props.name];
    const name = evidence_to_old_names(props.name);
    const classes = classNames({
        svg: true,
        [`evidence-${evidence_to_simple_names(props.name)}`]: true && !props.inactive,
        'svg-inactive': props.inactive ?? false
    })

    return <Image className={classes} src={svg} alt={name} />;
}