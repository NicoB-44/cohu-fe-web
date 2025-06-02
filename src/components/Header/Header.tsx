import LocaleSwitch from "@COMPONENTS/LocaleSwitch";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <LocaleSwitch />
      <h1>{t("HEADER.TITLE")}</h1>
    </Container>
  );
};
export default Header;
