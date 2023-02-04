import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CreateAdvertiserCredentials } from "@/setup/types/advertiser.type";
import { findAll, findOne, create, update, remove, selectAdvertisers } from "@/setup/redux/slices/advertiser/advertiser.slice";
import { UserService } from "@/setup/services/user.service";

export class AdvertiserService {
    dispatch = useDispatch();
    params = useParams();
    advertisers = useSelector(selectAdvertisers)
    userService = new UserService;

    public async findAll() {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser`)
            const responseJSON = await response.json();
            this.dispatch(findAll(responseJSON));
            console.log(responseJSON);
        } catch (err) {
            console.error(err);
        }
    }
    
    public async findOne(id: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser/${id}`)
            const responseJSON = await response.json();
            console.log(responseJSON);
            this.dispatch(findOne(id));
        } catch (err) {
            console.error(err);
        }
    }

    public async create(credentials: any) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(credentials)
            });
            const responseAdvertiserJSON = await response.json();
            this.dispatch(create(responseAdvertiserJSON));

            const advertiserId = responseAdvertiserJSON.id;
            const userId = this.params.id;

            console.log('advertiserId', advertiserId);
            console.log('userId', userId);

            const userQuery = {
                advertiser: advertiserId,
            }

            const advertiserQuery = {
                user: userId,
            }

            this.userService.update(String(userId), userQuery);
            this.update(advertiserId, advertiserQuery);
        } catch (err) {
            console.error(err);
        }
    };

    public async update(id: string, credentials: any) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(credentials)
            });
            const responseJSON = await response.json();
            this.dispatch(update({id, responseJSON}));
            console.log(responseJSON);
        } catch (err) {
            console.error(err);
        }
    }

    public async delete(id: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/advertiser/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE'
            });
            const responseJSON = await response.json();
            this.dispatch(remove(id));
            console.log(responseJSON);
        } catch (err) {
            console.error(err);
        }
    }
}