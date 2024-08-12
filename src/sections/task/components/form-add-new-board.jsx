import { Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { EffectBtn } from "src/components/EffectBtn";
import { ButtonPrimary } from "src/components/button";
import UploadBtn from "src/components/upload";
import { useModal } from "src/contexts/modal-context";
import { useTeamAction } from "src/redux/features/team/action";
import { useTeamState } from "src/redux/features/team/teamSlice";
import SelectMember from "./select-member";
import SelectTag from "./select-tags";


export default function FormAddNewBoard() {
    const {hideModal} = useModal()
    const [state, setState] = useState({
        name: '',
        description: '',
        thumbnails: '',
        isNameError: false,
    })
      const { createNewTeam } = useTeamAction();
      const {isLoadingCreateNew} = useTeamState()

    const handleCreateTeam = async () => {
        setState({ ...state, isNameError: state.name === '' })
        if(state.name !== '') {
            await createNewTeam({
                ...state, tags: state.tags.join(","),
                 thumbnails: state.thumbnails || "https://firebasestorage.googleapis.com/v0/b/travelappsu.appspot.com/o/undraw_choose_card_n0x0.png?alt=media&token=a3d7f996-ee91-4cfc-9c71-2f2ad7866d03"
            }).then(() => {
               if(!isLoadingCreateNew) hideModal()
            })
        }
    }

    return <Stack direction="column" gap={2} pt={2} >
             <Typography variant="h6" textAlign="center" fontWeight={900}>Add new board</Typography>
         <EffectBtn sx={{ borderRadius: 2, overflow: 'hidden'}}>
             <Box sx={{width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden'}}>
                <img src={state?.thumbnails || "https://firebasestorage.googleapis.com/v0/b/travelappsu.appspot.com/o/undraw_choose_card_n0x0.png?alt=media&token=a3d7f996-ee91-4cfc-9c71-2f2ad7866d03"} alt="thumbnail" style={{width: '100%', objectFit: 'contain', height: 150, borderRadius: 5}}/>
         </Box></EffectBtn>   <Stack direction="row" gap={2} alignItems="center" justifyContent="space-evenly">
                 <UploadBtn onChangeFile={file => setState({...state, thumbnails: file})}/>
            </Stack>
               <TextField
               size="small"
          name="nameOfBoard"
          label="Name of board"
          placeholder="Enter name of board"
          error={state.isNameError}
          helperText={state.isNameError ? 'Name is required' : null}
          onChange={(e) => setState({ ...state, name: e.target.value, isNameError: false })}
        />
        <SelectTag onChangeValue={value => setState({...state, tags: value})}/>
            <SelectMember onChangeValue={value => setState({...state, members: value})}/>
        <Stack direction="row" gap={2} justifyContent="end">
            <ButtonPrimary disabled={isLoadingCreateNew} onClick={handleCreateTeam}>{isLoadingCreateNew && <CircularProgress size={20}/>}Create</ButtonPrimary>
        </Stack>
    </Stack>
}

