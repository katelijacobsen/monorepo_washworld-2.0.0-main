"use client";

import type { User } from "@/app/global/types/global";
import { useUploadAvatar } from "@/app/(features)/profile/hooks/useUploadAvatar";
import Icon from "@/app/global/components/Icon";

type Props = { user: User };

export default function PersonalOverview({ user }: Props) {
  const memberSince = new Date(user.user_created_at * 1000).toLocaleDateString(
    "da-DK",
  );
  const uploadMutation = useUploadAvatar();

  return (
    <article className="flex flex-col gap-16 border-b border-grey-100 pb-24">
      <div className="flex items-center gap-16">
        <figure className="shrink-0 relative">
          <label
            htmlFor="avatar-upload"
            className="block cursor-pointer rounded-full overflow-hidden w-[72px] h-[72px] bg-grey-100"
          >
            {user.user_img_key ? (
              <img
                src={`${(globalThis as any)?.process?.env?.NEXT_PUBLIC_BACKEND_URL}/static/uploads/${user.user_img_key}`}
                alt={user.user_fullname}
                width={72}
                height={72}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-xs text-grey-200">
                Intet billede
              </span>
            )}
          </label>
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadMutation.mutate(f);
            }}
          />
          <label
            htmlFor="avatar-upload"
            className="absolute right-0 bottom-0 cursor-pointer shrink-0 flex items-center justify-center w-[32px] h-[32px] rounded-full border border-primary-200 bg-success-100 text-primary-800"
            aria-label="Rediger profilbillede"
          >
            <Icon iconName="pencil" />
          </label>
        </figure>

        <header className="flex-1 flex flex-col">
          <h2 className="uppercase text-base text-text leading-tight font-bold">
            {user.user_fullname}
          </h2>
        </header>
      </div>
    </article>
  );
}
