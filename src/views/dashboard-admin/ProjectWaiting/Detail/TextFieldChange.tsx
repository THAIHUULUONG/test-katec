import { useTheme } from '@mui/material/styles';
import MuiTooltip from '@mui/material/Tooltip';
import { IconEditCircle } from '@tabler/icons';
function TextFieldChange() {
  const theme = useTheme();
  return (
    <MuiTooltip title="Những trường đã được cập nhật" placement='top'>
      <span>
        <IconEditCircle color={theme.palette.primary.dark} />
      </span>
    </MuiTooltip>
  )
}
export default TextFieldChange;