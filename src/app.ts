import { Pane } from "./Components/Panes";

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

const firstPane = new Pane({
    id: 'FirstPane',
    content: paneContent
});

injectPanels(gmPaneContainer, firstPane);

function injectPanels(parentDiv: HTMLDivElement, pane: Pane): void {
    const childElement = pane.getElement()
    parentDiv.appendChild(childElement);
}
