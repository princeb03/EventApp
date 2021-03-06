import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (userForm: UserFormValues) => {
        try {
            const user = await agent.Accounts.login(userForm);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            })
            history.push('/activities');
            store.modalStore.closeModal();
        } catch(err) {
            throw err;
        }
    };

    register = async (userForm: UserFormValues) => {
        try {
            const user = await agent.Accounts.register(userForm);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        } catch(err) {
            throw err;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Accounts.getCurrent();
            runInAction(() => this.user = user);
        } catch (err) {
            console.log(err);
        }
    }

    setImage = (image: string) => {
        if (this.user) {
            this.user.image = image;      
        }
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }
}