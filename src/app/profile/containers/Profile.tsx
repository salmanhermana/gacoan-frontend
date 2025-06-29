"use client";

import { LogOut } from "lucide-react";
import Button from "@/components/buttons/Button";
import ProfileField from "@/app/profile/components/ProfileFields";
import useAuthStore from "@/app/stores/useAuthStore";
import { useGetMe } from "@/app/hooks/useGetMe";
import ProfileSkeleton from "@/app/profile/components/ProfileSkeleton";
import { removeToken } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import withAuth from "@/components/hoc/withAuth";

export default withAuth(ProfileContainer, "customer");

function ProfileContainer() {
  const { user: storedUser, logout } = useAuthStore();

  const router = useRouter();

  const { data: user, isLoading: isGetMeLoading } = useGetMe();

  if (isGetMeLoading) {
    return (
      <div className="p-12 max-md:p-6 space-y-6 px-[5%]">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <section className="p-12 min-h-screen max-md:p-6 space-y-6 px-[5%]">
      <div>
        <h1 className="text-3xl font-semibold max-md:text-2xl">Profil Kamu</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <ProfileField
            label="Nama Lengkap"
            value={user?.name || ""}
          />

          <ProfileField
            label="Email"
            value={user?.email || ""}
          />

          <ProfileField
            label="Nomor Telepon"
            value={user?.phone_number || ""}
          />


          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => {
                removeToken();
                logout();
                router.push("/login");
              }}
              variant="red"
              className="flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={16} />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
