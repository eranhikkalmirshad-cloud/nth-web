import { getFooterSettings } from "@/app/actions/cms";
import FooterSettingsClient from "./FooterSettingsClient";

export const metadata = {
  title: "Footer & Contact Settings | Nilambur Teak Heritage Admin",
};

export default async function FooterAdminPage() {
  const initialSettings = await getFooterSettings();

  return <FooterSettingsClient initialSettings={initialSettings} />;
}
