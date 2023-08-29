import EvidenceIcon from "./evidence_icon";
import { EvidenceSelection, EvidenceType, State, evidence_to_old_names } from "./types";
import { classNames } from "./utils";

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
        'large': true,
        'svg-green': current === EvidenceSelection.Confirmed,
        'svg-red': current === EvidenceSelection.NotSeen,
    });

    return <div className={classes} onClick={onClick}>
        <EvidenceIcon name={props.name} />
    </div>;
}
