'use client';

import { Plus } from 'lucide-react';

// components
import { ActionTooltip } from '@/components/action-tooltip';

// hooks
import { useModal } from '@/hooks/use-modal-store';

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side={'right'} align={'center'} label={'💡서버를 추가하세요!'}>
        <button className={'group flex items-center'} onClick={() => onOpen('createServer')}>
          <div
            className={
              'flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500'
            }
          >
            <Plus className={'group-hover:text-white transition text-emerald-500'} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
