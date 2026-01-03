import type { ButtonHTMLAttributes } from 'vue';

export namespace BaseButtonTypes {
  export interface Props {
    value: string;
    theme?: 'primary' | 'secondary';
    type?: ButtonHTMLAttributes['type'];
  }
}
