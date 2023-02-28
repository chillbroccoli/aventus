import { showNotification } from "@mantine/notifications";
import { QueryCache, QueryClient } from "@tanstack/react-query";

import { RequestError } from "./api/Fetcher";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (error instanceof RequestError) {
        showNotification({
          title: "Error",
          message: error.message,
          color: "red",
        });
      }
    },
  }),
});
