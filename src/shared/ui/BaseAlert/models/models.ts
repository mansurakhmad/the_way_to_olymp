export namespace BaseAlertTypes {
  export interface Props {
    title: string;
    message: string;
    isVisible: boolean;
    themeValue?: 'default' | 'error';
  }
}
