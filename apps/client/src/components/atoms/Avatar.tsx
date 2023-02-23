import { Avatar as MantineAvatar, AvatarProps, createStyles } from "@mantine/core";

export function Avatar(props: AvatarProps) {
  const { classes } = styles();

  return <MantineAvatar color="teal" alt="Avatar" {...props} className={classes.avatar} />;
}

const styles = createStyles((theme) => ({
  avatar: {
    textTransform: "uppercase",
    border: `1px solid ${theme.colors.teal[5]}`,
  },
}));
