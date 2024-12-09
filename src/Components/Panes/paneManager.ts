import { Pane, PaneOptions } from "./panes";

export interface PaneTab extends Object {
    id: string;
    panes: Pane[]
    maxPanes: number;
}

export class PaneManager {
    static #instance: PaneManager;
    private paneTabs: PaneTab[] = [];
    private domElement: HTMLDivElement | null = null;

    constructor() { }

    public static get instance(): PaneManager {
        if (!PaneManager.#instance) {
            PaneManager.#instance = new PaneManager();
        }
        return PaneManager.#instance;
    }

    public initialize(div: string) {
        if (this.domElement) {
            throw new Error('Pane Manager is already initialized')
        }
        const htmlDivElement = document.querySelector<HTMLDivElement>('div')
        if (!htmlDivElement) {
            throw new Error(`Cannot find div element with id ${div}. Ensure you including the prefixing '#'`)
        }
        this.domElement = htmlDivElement
    }

    public createTab(id: string) {
        const checkForTab = this.paneTabs.find(paneTab => paneTab.id === id);
        if (checkForTab) {
            throw new Error(`Tab with name ${id} already exist, please select a unique name`);
        }
        this.paneTabs.push({ id: id, panes: [], maxPanes: 8 }) // make maxPanes changeable
    }


    public createPane(paneOptions: PaneOptions, tabId: string) {
        const targetTab = this.paneTabs.find(paneTab => paneTab.id === tabId);
        if (!targetTab) {
            throw new Error(`Target Tab doesn't exist: ${tabId}`)
        }
        if (targetTab.panes.length >= targetTab.maxPanes) {
            throw new Error(`Too many panes Need to actually handle this, but works for now`)
        }
        const pane = new Pane({ ...paneOptions });
        targetTab.panes.push(pane);
    }

    public renderTab(id: string) {
        const targetTab = this.paneTabs.find(paneTab => paneTab.id === id);
        if (this.domElement) {
            targetTab?.panes.forEach((pane) => {
                this.domElement!.appendChild(pane.getElement());
            })
        }
        throw new Error('You must first initialize the Pane Manager before rendering tabs')
    }
}


