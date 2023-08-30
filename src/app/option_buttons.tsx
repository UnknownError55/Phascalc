import { Tooltip as ReactTooltip } from "react-tooltip";

export enum Choice {
    Unknown,
    Yes,
    No,
}

export interface OptionButtonsProps {
    state: Choice,
    setter: (x: Choice) => void,
    label: string,
    tip?: string | string[],
}

export default function OptionButtons(props: OptionButtonsProps) {
    const default_color = 'bg-black-500';
    const yes_classes = 'text-white font-bold py-2 px-4 rounded ' + (props.state === Choice.Yes ? 'bg-blue-500 hover:bg-blue-700' : default_color);
    const no_classes = 'text-white font-bold py-2 px-4 rounded ' + (props.state === Choice.No ? 'bg-red-500 hover:bg-red-700' : default_color);

    const yes_click = () => {
        if (props.state === Choice.Yes) { props.setter(Choice.Unknown); }
        else { props.setter(Choice.Yes); }
    };

    const no_click = () => {
        if (props.state === Choice.No) { props.setter(Choice.Unknown); }
        else { props.setter(Choice.No); }
    }

    let tip = null;

    if (props.tip) {
        let text;
        if (Array.isArray(props.tip)) {
            text = <ol>{props.tip.map((x, i) => <li key={i}>{x}</li>)}</ol>;
        }
        else {
            text = <span>props.tip</span>;
        }
        tip = <ReactTooltip id='tip' place='bottom' variant='info'>
            <div className='wrap-this flex flex-col'>{text}</div>
        </ReactTooltip>;
    }

    return <div>
        <span data-tooltip-id='tip'>{props.label}</span>
        <button className={yes_classes} onClick={yes_click}>Yes</button>
        <button className={no_classes} onClick={no_click}>No</button>
        {tip}
    </div>;
}
