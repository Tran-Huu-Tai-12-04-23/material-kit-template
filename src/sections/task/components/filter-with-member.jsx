import { useTheme } from "@emotion/react";
import { Avatar, AvatarGroup, Box, IconButton, Stack, Tooltip, alpha } from "@mui/material";
import { EffectBtn } from "src/components/EffectBtn";
import Iconify from "src/components/iconify";
import { useColumnAction } from "src/redux/features/column/action";
import { useColumnState } from "src/redux/features/column/columnSlice";
import { useTeamState } from "src/redux/features/team/teamSlice";

function FilterWithMember() {
    const theme = useTheme()
    const {currentTeam} = useTeamState()

    const {filter} = useColumnState()

    const {onChangeFilter} = useColumnAction()

    const handleToggleSelectMember = (user) => {
      console.log(user)
      if(filter?.members?.includes(user?.id)){
        const newLstMember = filter?.members?.filter((value) => value !== user?.id)
        onChangeFilter( 'members', newLstMember)
      }else{
        onChangeFilter('members', [...(filter?.members || []), user?.id])
      }
    }

    return  <Stack direction="row" gap={2}>
          <AvatarGroup total={currentTeam?.members?.length} max={4}>
            {currentTeam?.members?.map((user, index) => (
              <Tooltip key={index} title={user?.username} >
                <EffectBtn sx={{ borderRadius: '50%' }} onClick={() => handleToggleSelectMember(user)}>
                  <Box
                    sx={{
                      border: () => filter?.members?.includes(user?.id) ? `solid 1px ${theme.palette.primary.main}` : `dashed 1px ${theme.palette.divider}`,
                      cursor: 'pointer',
                      borderRadius: '50%',
                       backgroundColor: filter?.members?.includes(user?.id) ? alpha(theme.palette.primary.main, 0.2) : 'transparent',
                      ':hover': {
                        border: () => `dashed 1px ${theme.palette.primary.main}`,
                        backgroundColor: () => alpha(theme.palette.primary.main, 0.2),
                      },
                    }}
                  >
                    <Avatar  alt={user?.username} src={user?.avatar} />
                  </Box>
                </EffectBtn>
              </Tooltip>
            ))}
          </AvatarGroup>
          <IconButton
            aria-label="fingerprint"
            color="primary"
            size="large"
            sx={{
              border: () => `dashed 1px ${theme.palette.divider}`,
               width: 50, height: 50 
            }}
          >
            <Iconify icon="eva:plus-fill" />
          </IconButton>
          
        </Stack>
}

export default FilterWithMember;