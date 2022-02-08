// modules
import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// icons
import { Icon } from "@iconify/react";
import editFill from "@iconify/icons-eva/edit-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// components
import SpringModal from "../modal/springModel";

// ----------------------------------------------------------------------

export default function UserMoreMenu({
  deviceId,
  setDevices,
  setAlertOpen,
  alertOpen,
  setMessage,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // A function to open the modal
  const handleDelete = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }} onClick={handleDelete}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <SpringModal
          setDevices={setDevices}
          deviceId={deviceId}
          open={open}
          setOpen={setOpen}
          setAlertOpen={setAlertOpen}
          alertOpen={alertOpen}
          setMessage={setMessage}
        />
      </Menu>
    </>
  );
}
