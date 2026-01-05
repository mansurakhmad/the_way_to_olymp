import type { BaseAlertTypes } from '@/shared/ui';

export namespace EnrollmentFormTypes {
  export interface TriggerAlertProps extends BaseAlertTypes.AlertData {
    closeTime?: number;
  }
}
