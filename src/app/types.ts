export enum EvidenceSelection {
    Unknown,
    Confirmed,
    NotSeen,
}

export type State = { [key: string]: EvidenceSelection };

export enum EvidenceType {
    DOTS,
    Orbs,
    Fingerprints,
    EMF,
    SpiritBox,
    Freezing,
    Writing,
}

export enum Ghost {
    Spirit,
    Wraith,
    Phantom,
    Poltergeist,
    Banshee,
    Jinn,
    Mare,
    Revenant,
    Shade,
    Demon,
    Yurei,
    Oni,
    Yokai,
    Hantu,
    Goryo,
    Myling,
    Onryo,
    TheTwins,
    Raiju,
    Obake,
    TheMimic,
    Moroi,
    Deogen,
    Thaye,
}

export const AllEvidence = [
    EvidenceType.DOTS,
    EvidenceType.Orbs,
    EvidenceType.Fingerprints,
    EvidenceType.EMF,
    EvidenceType.SpiritBox,
    EvidenceType.Freezing,
    EvidenceType.Writing,
];

export const AllGhosts = [
    Ghost.Spirit,
    Ghost.Wraith,
    Ghost.Phantom,
    Ghost.Poltergeist,
    Ghost.Banshee,
    Ghost.Jinn,
    Ghost.Mare,
    Ghost.Revenant,
    Ghost.Shade,
    Ghost.Demon,
    Ghost.Yurei,
    Ghost.Oni,
    Ghost.Yokai,
    Ghost.Hantu,
    Ghost.Goryo,
    Ghost.Myling,
    Ghost.Onryo,
    Ghost.TheTwins,
    Ghost.Raiju,
    Ghost.Obake,
    Ghost.TheMimic,
    Ghost.Moroi,
    Ghost.Deogen,
    Ghost.Thaye,
];

export function ghost_to_string(ghost: Ghost): string {
    switch (ghost) {
        case Ghost.Spirit: return 'Spirit';
        case Ghost.Wraith: return 'Wraith';
        case Ghost.Phantom: return 'Phantom';
        case Ghost.Poltergeist: return 'Poltergeist';
        case Ghost.Banshee: return 'Banshee';
        case Ghost.Jinn: return 'Jinn';
        case Ghost.Mare: return 'Mare';
        case Ghost.Revenant: return 'Revenant';
        case Ghost.Shade: return 'Shade';
        case Ghost.Demon: return 'Demon';
        case Ghost.Yurei: return 'Yurei';
        case Ghost.Oni: return 'Oni';
        case Ghost.Yokai: return 'Yokai';
        case Ghost.Hantu: return 'Hantu';
        case Ghost.Goryo: return 'Goryo';
        case Ghost.Myling: return 'Myling';
        case Ghost.Onryo: return 'Onryo';
        case Ghost.TheTwins: return 'The Twins';
        case Ghost.Raiju: return 'Raiju';
        case Ghost.Obake: return 'Obake';
        case Ghost.TheMimic: return 'The Mimic';
        case Ghost.Moroi: return 'Moroi';
        case Ghost.Deogen: return 'Deogen';
        case Ghost.Thaye: return 'Thaye';
    }
}

export function evidence_to_old_names(evidence: EvidenceType): string {
    switch (evidence) {
        case EvidenceType.DOTS: return "D.O.T.S. Projector";
        case EvidenceType.Orbs: return "Ghost Orbs";
        case EvidenceType.Fingerprints: return "Fingerprints";
        case EvidenceType.EMF: return "EMF Level 5";
        case EvidenceType.SpiritBox: return "Spirit Box";
        case EvidenceType.Freezing: return "Freezing Temperature";
        case EvidenceType.Writing: return "Ghost Writing";
    }
}

export function evidence_to_simple_names(evidence: EvidenceType): string {
    switch (evidence) {
        case EvidenceType.DOTS: return "dots";
        case EvidenceType.Orbs: return "orbs";
        case EvidenceType.Fingerprints: return "fingerprints";
        case EvidenceType.EMF: return "emf";
        case EvidenceType.SpiritBox: return "spiritbox";
        case EvidenceType.Freezing: return "freezing";
        case EvidenceType.Writing: return "writing";
    }
}
