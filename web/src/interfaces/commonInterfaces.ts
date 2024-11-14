export interface ISearchOptions {
    search: string,
    sort: string,
    price: string,
    date: string,
    subject: string
}

export const defaultSearchOptions: ISearchOptions = {
    search: "",
    sort: "",
    price: "",
    date:  "",
    subject: ""
}

export interface ICart {
    id: number,
    reminderId: number,
    quantity: number,
    priority: number
}