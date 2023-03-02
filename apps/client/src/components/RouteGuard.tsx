import { useRouter } from "next/router";
import { ClientRoutes, PROTECTED_ROUTES } from "shared";

import { LoaderLayout } from "@/components/layouts/LoaderLayout";
import { api } from "@/utils/api";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data: user, isLoading } = api.user.useUserDetails();

  if (isLoading) return <LoaderLayout />;

  if (!user && PROTECTED_ROUTES.includes(router.pathname as ClientRoutes)) {
    router.push(ClientRoutes.LOGIN);
    return null;
  }

  return <>{children}</>;
}
