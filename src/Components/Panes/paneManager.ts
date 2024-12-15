import { handleDelayedInput } from "./events";
import { Pane, PaneOptions } from "./panes";
import "./style.css";
import { destoryElement, evenlyDivideGridColumnsAndRows } from "./utilities";

export interface PaneTab extends Object {
    id: string;
    panes: Pane[]
    maxPanes: number;
    domElement: HTMLDivElement
}

export class PaneManager {
    static #instance: PaneManager;
    private paneTabs: PaneTab[] = [];
    private domElement: HTMLDivElement | null = null;
    focusedTab: string = '';

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
        const htmlDivElement = document.querySelector<HTMLDivElement>(div)
        if (!htmlDivElement) {
            throw new Error(`Cannot find div element with id ${div}.`)
        }
        this.domElement = htmlDivElement
        this.createControlbanner();
    }

    public createTab(id: string) {
        const checkForTab = this.paneTabs.find(paneTab => paneTab.id === id);
        if (checkForTab) {
            throw new Error(`Tab with name ${id} already exist, please select a unique name`);
        }
        const domElement = document.createElement('div');
        domElement.setAttribute('class', 'pane-tab')
        domElement.setAttribute('id', `pane-tab-${id}`)
        this.paneTabs.push({ id: id, panes: [], domElement, maxPanes: 8 }) // make maxPanes changeable
    }

    public getPaneTab(id: string): PaneTab | undefined {
        return this.paneTabs.find(paneTab => paneTab.id === id)
    }

    private createControlbanner() {
        const controlBanner = document.createElement('div');
        controlBanner.setAttribute('id', 'pane-manager-control-banner');

        const maxPanesInput = document.createElement('input');
        maxPanesInput.setAttribute('id', 'max-panes-input')
        maxPanesInput.addEventListener('input', async (ev) => {
            let numValue: number;
            const newValue = await handleDelayedInput(ev, 2000);
            if (typeof newValue == 'string') {
                numValue = parseInt(newValue as string);
            } else if (typeof newValue == 'number') {
                numValue = (newValue as number)
            } else {
                console.error(`Input value must be a number, instead received ${typeof newValue}`)
                return
            }
            console.log(!isNaN(numValue), this.focusedTab)

            if (!isNaN(numValue) && this.focusedTab) {
                if (numValue < 1) {
                    console.warn('Maximum panes must be at least 1')
                    return;
                }

                const focusedPaneTab = this.getPaneTab(this.focusedTab);
                if (focusedPaneTab) {
                    console.log('setting new value')
                    focusedPaneTab.maxPanes = numValue;
                    this.destroyTab(this.focusedTab);
                    this.renderTab(this.focusedTab);
                }
            }

        })

        const maxPanesLabel = document.createElement('label');
        maxPanesLabel.setAttribute('for', 'max-panes-input');
        maxPanesLabel.textContent = 'Set Maximum number of Panes'

        controlBanner.appendChild(maxPanesLabel);
        controlBanner.appendChild(maxPanesInput)

        this.domElement?.prepend(controlBanner);


    }


    public createPane(paneOptions: PaneOptions, tabId: string) {
        const targetTab = this.paneTabs.find(paneTab => paneTab.id === tabId);
        if (!targetTab) {
            throw new Error(`Target Tab doesn't exist: ${tabId}`)
        }
        if (targetTab.panes.length >= targetTab.maxPanes) {
            console.error('Too many panes to handle with current implementation')
            return
            // throw new Error(`Too many panes Need to actually handle this, but works for now`)
        }
        const pane = new Pane({ ...paneOptions });
        targetTab.panes.push(pane);
    }

    public overFlowPanes(panes: Pane[]) {
        let availableTabs: { tabId: string, availableSlots: number }[] = []
        let trackingPos: number = 0;
        let currentPos: number = 0;
        this.paneTabs.forEach((tab) => {
            if (tab.id === this.focusedTab) {
                currentPos = trackingPos;
                trackingPos++;
            } else {
                trackingPos++
            }
        });
        while (currentPos < this.paneTabs.length) {
            if (this.paneTabs[currentPos].maxPanes > this.paneTabs[currentPos].panes.length) {
                const tabInfo = { tabId: this.paneTabs[currentPos].id, availableSlots: this.paneTabs[currentPos].maxPanes - this.paneTabs[currentPos].panes.length }
                availableTabs.push(tabInfo)
            }
        }
    }

    private adjustPaneCount(tabId: string): void {
        const targetTab = this.getPaneTab(tabId);
        if (targetTab) {
            if (targetTab.maxPanes >= targetTab.panes.length) {
                return
            } else {
                let reduceBy = targetTab.panes.length - targetTab.maxPanes
                while (reduceBy > 0) {
                    targetTab.panes.pop()
                    reduceBy--;
                }
            }
        } else {
            console.error(`Cannot find targetTab with id ${tabId}`)
        }
    }

    public destroyTab(tabId: string) {
        const targetTab = this.getPaneTab(tabId);
        if (this.domElement) {
            targetTab?.panes.forEach((pane) => {
                const elementId = pane.getId();
                destoryElement(elementId);
            })
        }
    }

    public renderTab(id: string) {
        this.adjustPaneCount(id)
        const targetTab = this.paneTabs.find(paneTab => paneTab.id === id);
        if (this.domElement) {
            targetTab?.panes.forEach((pane) => {
                targetTab.domElement.appendChild(pane.getElement())
            })
            if (targetTab?.domElement) {
                this.domElement.appendChild(targetTab?.domElement);
                evenlyDivideGridColumnsAndRows(`pane-tab-${targetTab.id}`, targetTab.maxPanes)
                // set focused tab when rendered
                this.focusedTab = targetTab.id;
            } else {
                throw new Error('Tab doesn\'t have assigned Dom element');
            }
        } else {
            throw new Error('You must first initialize the Pane Manager before rendering tabs')
        }
    }
}


