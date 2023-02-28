import { generateSeed } from "@/utils/helpers/generateSeed";

export function generateRandomAvatar() {
  return `https://api.dicebear.com/5.x/avataaars/svg?seed=${generateSeed()}`;
}
