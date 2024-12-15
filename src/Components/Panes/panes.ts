
import './style.css'

export interface PaneOptions {
    id: string;
    title?: string;
    content: HTMLElement | string;
    width?: number | string;
    height?: number | string;
    position?: {
        column?: number;
        row?: number;
    }
}

export class Pane {
    private element: HTMLElement;
    private options: PaneOptions;

    constructor(options: PaneOptions) {
        this.options = options;
        this.element = this.createPaneElement();
    }

    private createPaneElement(): HTMLElement {
        const pane = document.createElement('div')
        pane.className = 'gm-screen-pane';
        pane.id = this.options.id;

        // This will become the pane manager bar and will give users the options to close the pane,
        // potentially provide metadata, find a replace with different content, inline edit content 
        // (possible feature, but this would edit the global html, so we'll see) and any other 
        // window options features we may determine.
        if (this.options.title) {
            const optionsBar = document.createElement('div');
            optionsBar.className = 'gm-screen-panel-options-bar';
            optionsBar.textContent = this.options.title;
            pane.appendChild(optionsBar)
        }

        const contentContainer = document.createElement('div');
        contentContainer.className = 'gm-screen-panel-content';

        if (typeof this.options.content === 'string') {
            contentContainer.innerHTML = this.options.content;
        } else {
            contentContainer.appendChild(this.options.content);
        }

        pane.appendChild(contentContainer);

        // need to do things with height, width, and position, but need to consider the larger pane
        // manager

        return pane;
    }

    public getId(): string {
        return this.options.id;
    }

    public getElement(): HTMLElement {
        return this.element;
    }
}
