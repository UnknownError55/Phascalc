import { EvidenceType, Ghost } from "./types"

const RealEvidence: { [k: string]: EvidenceType[] } = {
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
};

export default RealEvidence;