export enum Mode  {
  DESIGN = "design",
  RUNTIME = "runtime",
}

export type SelectItem = {
  label: string;
  value: string;
};

export type SetterItem = {
  type: string;
  propKey: string;
  label: string;
  options?: SelectItem[];
  defaultValue?: any;
  [key: string]: any;
};

export type ExportComponent = {
  design: React.FC<any>;
  runtime: React.FC<any>;
  setter?: SetterItem[];
  events?: IEvents;
  methods?: {
    label: string
    name: string
  }[]
}

export type EventsName =
  | "onClick"
  | "onDoubleClick"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseUp"
  | "onMouseDown";

export enum ActionTypeName {
  url = "url",
  message = "message",
  customScript = "customScript",
  componentMethod = "componentMethod",
}

export type ActionType = keyof typeof ActionTypeName;

export type EventAction = {
  type: ActionType;
  label: string;
  config?: {
    [key: string]: any;
  };
};

export type IEvent = {
  type: EventsName;
  label: string;
  actions?: EventAction[];
};

export type IEvents = IEvent[]