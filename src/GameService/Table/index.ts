import { GetTableItemsOptions } from './models';
import axios from 'axios';
import { GameService } from '..';
import { Url } from '../../Utils/Consts';
import { Log } from '../../Utils/Logger';

export class Table {
    constructor(public superThis: GameService) { }

    async GetTableItems(tableId: String, isGlobal: Boolean = false, options: GetTableItemsOptions = { skip: 0, limit: 25, find: undefined, rowsOwner: undefined, sort: undefined }): Promise<object[]> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Table}${tableId}?skip=${options.skip}&limit=${options.limit}`
            if (options.rowsOwner && options.rowsOwner != "")
                url += `&owner=${options.rowsOwner}`
            if (options.sort && options.sort[0] && options.sort[1] && options.sort[0] != "")
                url += `&sort=${options.sort[0]}&sortby=${options.sort[1]}`
            if (options.find && options.find[0] && options.find[1] && options.find[0] != "")
                url += `&conditionProperty=${options.find[0]}&conditionValue=${options.find[1]}`
            let { data } = await axios.get(url, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("GetTableItems", data);

            return data;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }

    Aggrigation(aggrigation: object) {

    }

    async GetTableItem(tableId: string, itemId: number, isGlobal: boolean = false): Promise<object> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Table}${tableId}/${itemId}`
            let { data } = await axios.get(url, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("GetTableItem", data);

            return data.data;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }

    async AddItemToTable(tableId: string, newItem: object) {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Table}${tableId}`
            let { data } = await axios.post(url, newItem, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("AddItemToTable", data);

            return data.data;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }

    async UpdateTableItem(tableId: string, itemId: number, editedItem: object): Promise<object> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Table}${tableId}/${itemId}`
            let { data } = await axios.put(url, editedItem, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("UpdateTableItem", data);

            return data.data;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }

    async DeleteTableItem(tableId: string, itemId: number): Promise<boolean> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Table}${tableId}/${itemId}`
            let { data } = await axios.delete(url, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("DeleteTableItem", data);

            return data.status;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }

    async DeleteAllTableItems(tableId: string): Promise<boolean> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Table}${tableId}`
            let { data } = await axios.delete(url, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("DeleteTableItems", data);

            return data.status;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
}