import {
  Button,
  Container,
  createStyles,
  Divider,
  Flex,
  Grid,
  Text,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClientRoutes } from "shared";

import { Feed } from "@/components/project/Feed";
import { MainLayout } from "@/layouts/MainLayout";
import { api } from "@/utils/api";
import { pluralizeCount } from "@/utils/helpers/pluralizeCount";

export function TagView() {
  const { classes } = styles();

  const router = useRouter();

  const { tag } = router.query as { tag: string };

  const { data, isLoading } = api.project.useAll(
    { tag },
    {
      enabled: router.isReady,
    }
  );

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Grid gutter={60}>
          <Grid.Col span={3}>
            <Flex direction="column" className={classes.sidebar} p={10} px={14}>
              <Title order={2} transform="capitalize" mb={8}>
                {router.query?.tag}
              </Title>
              <Button
                component={Link}
                href={ClientRoutes.NEW_PROJECT}
                color="teal"
                leftIcon={<IconPlus size={20} />}
              >
                New Project
              </Button>

              <Divider my="sm" />

              <Text>
                {pluralizeCount(data?.meta?.total._all ?? 0, "post")} found
              </Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={7}>
            <Feed data={data?.data} isLoading={isLoading} />
          </Grid.Col>
          <Grid.Col span={2}></Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}

const styles = createStyles((theme) => ({
  sidebar: {
    boxShadow: theme.shadows.lg,
    border: `1px solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.white,
  },
}));
