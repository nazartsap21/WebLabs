import $api from "../http";
import { AxiosResponse } from "axios";
import {IReminder} from "../interfaces/reminderInterfaces";
import { ISearchOptions } from "../interfaces/commonInterfaces";

export default class ReminderServices {
    static async getAllReminders(searchOptions: ISearchOptions): Promise<AxiosResponse<{ data: IReminder[] }>> {
        return $api.get<{ data: IReminder[] }>('/reminders', {
            params: searchOptions
        });
    }

    static async getReminder(id: number): Promise<AxiosResponse<{data: IReminder}>> {
        return $api.get<{data: IReminder}>(`/reminders/${id}`);
    }

    static async createReminder(reminder: IReminder): Promise<AxiosResponse<void>> {
        return $api.post<void>('/reminders', reminder);
    }

    static async updateReminder(reminder: IReminder): Promise<AxiosResponse<IReminder>> {
        return $api.put<IReminder>(`/reminders/${reminder.id}`, reminder);
    }

    static async deleteReminder(id: number): Promise<AxiosResponse<void>> {
        return $api.delete<void>(`/reminders/${id}`);
    }

    // static async countPrices(ids: number[]): Promise<AxiosResponse<number>> {
    //     return $api.post<number>('/reminders/countPrices', ids);
    // }
}