import { RootStore } from "./index";
import { SubStore } from "./SubStore";
import { observable, action, computed } from "mobx";
import { longDataUrl, shortDataUrl } from "../vars";

export type TAddress = {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
};

export type TData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: TAddress;
  description: string;
};

export type TDataSource = "long" | "short";

export const isDataSource = (str: string): str is TDataSource =>
  ["long", "short"].includes(str);

export class DataStore extends SubStore {
  @observable serverData: TData[] | null = null;
  @observable userData: TData[] = [];
  @observable dataSource: TDataSource = "short";

  @action changeDataSource = async (dataSource: TDataSource) => {
    this.dataSource = dataSource;
    this.serverData = null;
    await this.fetchData();
  };

  @computed get data(): TData[] | null {
    return this.serverData ? [...this.serverData, ...this.userData] : null;
  }

  @action fetchData = async () => {
    const url = this.dataSource === "long" ? longDataUrl : shortDataUrl;
    const data: TData[] = await (await fetch(url)).json();
    this.serverData = data;
  };

  constructor(rootStore: RootStore, initState: any) {
    super(rootStore);

    if (initState) {
      if (Array.isArray(initState.userData)) this.userData = initState.userData;
      if (isDataSource(initState.dataSource))
        this.dataSource = initState.dataSource;
    }

    this.fetchData();
    setTimeout(this.fetchData, 1e5);
  }
}
