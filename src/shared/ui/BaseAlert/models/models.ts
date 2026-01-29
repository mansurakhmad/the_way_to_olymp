export namespace BaseAlertTypes {
  export type Theme = 'error' | 'default';
  export interface AlertData {
    title: string;
    message: string;
    theme?: Theme;
  }
  export interface TriggerAlertProps extends AlertData {
    closeTime: number;
    onClose?: () => void;
  }
}
