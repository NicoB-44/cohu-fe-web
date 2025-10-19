import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCallback } from "react";

const SUPPORTED_LOCALES = ["en", "fr"];

const FLAG_CODE: {[key: string]: string} = {
  en: "GB",
  fr: "FR",
};

const LocaleSwitch = ({ onChange }: { onChange?: () => void }) => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const handleLocaleChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newLocale: string) => {
      i18n.changeLanguage(newLocale);
      onChange?.();
    },
    [i18n, onChange]
  );

  return (
    <ToggleButtonGroup
      value={locale}
      exclusive
      onChange={handleLocaleChange}
    >
      {SUPPORTED_LOCALES.map((lang) => (
        <ToggleButton value={lang} key={lang}>
          <Flag code={FLAG_CODE[lang]} height="16" />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default LocaleSwitch;
