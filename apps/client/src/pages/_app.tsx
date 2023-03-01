import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Poppins } from "@next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";

import { RouteGuard } from "@/components/RouteGuard";
import { GlobalStyles } from "@/styles/global";
import { queryClient } from "@/utils/queryClient";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Aventus</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            primaryColor: "teal",
            colorScheme: "light",
            fontFamily: poppins.style.fontFamily,
            headings: { fontFamily: poppins.style.fontFamily },
          }}
        >
          <GlobalStyles />
          <NotificationsProvider position="top-right">
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
