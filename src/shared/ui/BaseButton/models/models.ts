import type { ButtonHTMLAttributes } from 'vue';

export namespace BaseButtonTypes {
  export interface Props {
    disabled?: boolean;
    value: string;
    theme?: 'primary' | 'secondary' | 'accent';
    type?: ButtonHTMLAttributes['type'];
  }
}
