import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import ReminderServices from "../services/ReminderServices";
import {defaultSearchOptions, ISearchOptions} from "../interfaces/commonInterfaces";
import {IReminder} from "../interfaces/reminderInterfaces";

export const getReminders = createAsyncThunk(
    'reminders/getReminders',
    async (searchOptions: ISearchOptions, thunkAPI) => {
        return ReminderServices.getAllReminders(searchOptions);
    }
);

interface RemindersState {
    reminders: IReminder[] | null;
    searchOptions: ISearchOptions;
    status: string;
    error: string | null;
}

const initialStateReminders: RemindersState = {
    reminders: [],
    searchOptions: defaultSearchOptions,
    status: 'pending',
    error: null
}

export const reminderSlice = createSlice({
    name: 'reminders',
    initialState: initialStateReminders,
    reducers: {
        setSearchOption: (state, action: PayloadAction<ISearchOptions>) => {
            state.searchOptions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReminders.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getReminders.fulfilled, (state, action) => {
                state.reminders = action.payload.data.data
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(getReminders.rejected, (state, action) => {
                state.status = 'rejected';
                state.reminders = [];
                state.error = action.payload as string;
            })

    }
})

const remindersReducer = reminderSlice.reducer
export const { setSearchOption} = reminderSlice.actions

export {initialStateReminders};

export default remindersReducer