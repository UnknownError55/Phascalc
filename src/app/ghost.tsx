import { Ghost, ghost_to_string } from "./types";
import { classNames } from "./utils";

export interface GhostComponentProps {
    name: Ghost;
    impossible: {[key: string]: string[]}
}

export default function GhostComponent(props: GhostComponentProps) {
    const classes = classNames({
        inactive: props.impossible[props.name].length > 0
    });
    return <div className={classes}>{ghost_to_string(props.name)}</div>
}
