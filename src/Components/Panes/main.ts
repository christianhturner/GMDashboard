import { PaneManager } from "./paneManager";
import { Pane, PaneOptions } from "./panes";

const gmPaneContainer = document.querySelector<HTMLDivElement>('#gm-pane-container')!

const paneContent = `
<div>
    <h1> This is our first pane </h1>
    <ul>
        <li> Doesn't it look nice? </li>
        <li> I think it does. </li>
    </ul>
</div>
`

const firstPane: PaneOptions = {
    id: 'FirstPane',
    content: paneContent,
    title: "First pane"
};

const paneManager = PaneManager.instance;
paneManager.initialize('#gm-pane-container');
paneManager.createTab('First Tab');
paneManager.createPane(firstPane, 'First Tab')
paneManager.renderTab('First Tab')

// injectPanels(gmPaneContainer, firstPane);

// function injectPanels(parentDiv: HTMLDivElement, pane: Pane): void {
//     const childElement = pane.getElement()
//     parentDiv.appendChild(childElement);
// }
