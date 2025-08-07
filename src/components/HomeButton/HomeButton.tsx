import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRegion } from "@CONTEXTS/RegionContext";
import imgSrc from "@ASSETS/logo.png";

export default function HomeButton() {
  const navigate = useNavigate();
  const region = useRegion();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/${region}`);
  };

  return (
    <Tooltip title={t("HEADER.HOME")} arrow>
      <Button onClick={handleClick} color="primary" aria-label="home">
        <img src={imgSrc} alt="Logo" style={{ width: 48, height: 48 }} />
      </Button>
    </Tooltip>
  );
}
