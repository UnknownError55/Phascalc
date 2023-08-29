import EvidenceIcon from "./evidence_icon";
import RealEvidence from "./real_evidence";
import { EvidenceSelection, Ghost, State, ghost_to_string } from "./types";
import { classNames } from "./utils";
import { Tooltip as ReactTooltip } from "react-tooltip";

export interface GhostComponentProps {
    name: Ghost;
    impossible: { [key: string]: string[] };
    evidence: State;
}

export default function GhostComponent(props: GhostComponentProps) {
    const impossible = props.impossible[props.name];
    const is_impossible = impossible.length > 0;
    const name = ghost_to_string(props.name);

    const classes = classNames({
        small: true,
        ghost: true,
        inactive: is_impossible
    });

    let tooptip = null;
    if (is_impossible) {
        tooptip = <ReactTooltip
            id={name}
            place="bottom"
            variant="info"
        >
            <div className="impossible">
                {impossible.map(x => <span>{x}</span>)}
            </div>
        </ReactTooltip>;
    }

    const evidence = RealEvidence[props.name].map(x => <EvidenceIcon name={x} inactive={props.evidence[x] !== EvidenceSelection.Unknown || is_impossible} />)

    return <>
        <div className={classes}>
            {evidence}<span data-tooltip-id={name}>{name}</span>
        </div>
        {tooptip}
    </>;
}
