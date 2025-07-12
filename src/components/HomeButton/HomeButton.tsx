import { IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRegion } from "@CONTEXTS/RegionContext";

export default function HomeButton() {
  const navigate = useNavigate();
  const region = useRegion();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/${region}`);
  };

  return (
    <Tooltip title={t("goHome")}>
      <IconButton onClick={handleClick} color="primary" aria-label="home">
        <HomeIcon />
      </IconButton>
    </Tooltip>
  );
}
