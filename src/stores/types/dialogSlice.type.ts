import type { ReactNode } from 'react';

export enum DialogType {
  NORMAL = 'NORMAL',
  ERROR = 'ERROR',
  ALERT = 'ALERT',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

export type DialogSize = 'small' | 'medium' | 'large';

interface DialogState {
  isVisible: boolean;
  content: ReactNode | null;
  type: DialogType;
  title: string | null;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isCustomizeButton: boolean;
  size: DialogSize;
}

const initialDialogState: DialogState = {
  isVisible: false,
  content: null,
  title: null,
  confirmButtonText: 'OK',
  type: DialogType.NORMAL,
  cancelButtonText: 'Close',
  onConfirm: undefined,
  onCancel: undefined,
  isCustomizeButton: false,
  size: 'medium',
};

export { initialDialogState };
export type { DialogState };
