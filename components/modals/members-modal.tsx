'use client';

import { useState } from 'react';
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react';
import { MemberRole } from '@prisma/client';

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAvatar } from '@/components/user-avatar';

// hooks
import { useModal } from '@/hooks/use-modal-store';

//type
import { ServerWithMembersWithProfiles } from '@/types';

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className={'h-4 w-4 ml-2 text-indigo-500'} />,
  ADMIN: <ShieldAlert className={'h-4 w-4 text-rose-500'} />,
};

export const MembersModal = () => {
  const [loadingId, setLoadingId] = useState('');
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const isModalOpen = isOpen && type === 'members';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'bg-white text-black overflow-hidden'}>
        <DialogHeader className={'pt-8 px-6'}>
          <DialogTitle className={'text-2xl text-center'}>⚙️ 멤버관리</DialogTitle>
          <DialogDescription className={'text-center text-zinc-500'}>
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className={'mt-8 max-h-[420px] pr-6'}>
          {server?.members?.map(member => (
            <div key={member.id} className={'flex items-center gap-x-2 mb-6'}>
              <UserAvatar src={member.profile.imageUrl} />
              <div className={'flex flex-col gap-y-1'}>
                <div className={'text-xs font-semibold flex items-center gap-x-1'}>
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className={'text-xs text-zinc-500'}>{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId && loadingId !== member.id && (
                <div className={'ml-auto'}>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className={'h-4 w-4 text-zinc-500'} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className={'flex items-center'}>
                          <ShieldQuestion className={'h-4 w-4 mr-2'} />
                          <span>역할</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>
                              <Shield className={'h-4 w-4 mr-2'} />
                              게스트
                              {member.role === 'GUEST' && <Check className={'h-4 w-4 ml-auto'} />}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className={'h-4 w-4 mr-2'} />
                              중간 관리자
                              {member.role === 'MODERATOR' && (
                                <Check className={'h-4 w-4 ml-auto'} />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Gavel className={'h-4 w-4 mr-2'} />
                        추방
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === member.id && (
                <Loader2 className={'animate-spin text-zinc-500 ml-auto w-4 h-4'} />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};