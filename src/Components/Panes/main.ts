import { PanelLayout, PaneManager } from "./paneManager";
import { Pane, PaneOptions } from "./panes";

const paneContent = `
<div>
    <h1> This is our first pane </h1>
    <ul>
        <li> Doesn't it look nice? </li>
        <li> I think it does. </li>
    </ul>
</div>
`


const paneContentTwo = `
<div style="display: flex;">
    <table>
        <tbody>
            <tr>
                <th><b>Level</b></th>
                <th><b>DC</b></th>
            </tr>
            <tr>
                <td>0</td>
                <td>14</td>
            </tr>
            <tr>
                <td>1</td>
                <td>15</td>
            </tr>
            <tr>
                <td>2</td>
                <td>16</td>
            </tr>
            <tr>
                <td>3</td>
                <td>18</td>
            </tr>
            <tr>
                <td>4</td>
                <td>19</td>
            </tr>
            <tr>
                <td>5</td>
                <td>20</td>
            </tr>
            <tr>
                <td>6</td>
                <td>22</td>
            </tr>
            <tr>
                <td>7</td>
                <td>23</td>
            </tr>
            <tr>
                <td>8</td>
                <td>24</td>
            </tr>
            <tr>
                <td>9</td>
                <td>26</td>
            </tr>
            <tr>
                <td>10</td>
                <td>27</td>
            </tr>
            <tr>
                <td>11</td>
                <td>28</td>
            </tr>
            <tr>
                <td>12</td>
                <td>30</td>
            </tr>
            <tr>
                <td>13</td>
                <td>31</td>
            </tr>
            <tr>
                <td>14</td>
                <td>32</td>
            </tr>
            <tr>
                <td>15</td>
                <td>34</td>
            </tr>
            <tr>
                <td>16</td>
                <td>35</td>
            </tr>
            <tr>
                <td>17</td>
                <td>36</td>
            </tr>
            <tr>
                <td>18</td>
                <td>38</td>
            </tr>
            <tr>
                <td>19</td>
                <td>39</td>
            </tr>
            <tr>
                <td>20</td>
                <td>40</td>
            </tr>
            <tr>
                <td>21</td>
                <td>42</td>
            </tr>
            <tr>
                <td>22</td>
                <td>44</td>
            </tr>
            <tr>
                <td>23</td>
                <td>46</td>
            </tr>
            <tr>
                <td>24</td>
                <td>48</td>
            </tr>
            <tr>
                <td>25</td>
                <td>50</td>
            </tr>
        </tbody>
    </table>
    <table>
        <tbody>
            <tr>
                <td><b>Spell Rank*</b></td>
                <td><b>DC</b></td>
            </tr>
            <tr>
                <td>1st</td>
                <td>15</td>
            </tr>
            <tr>
                <td>2nd</td>
                <td>18</td>
            </tr>
            <tr>
                <td>3rd</td>
                <td>20</td>
            </tr>
            <tr>
                <td>4th</td>
                <td>23</td>
            </tr>
            <tr>
                <td>5th</td>
                <td>26</td>
            </tr>
            <tr>
                <td>6th</td>
                <td>28</td>
            </tr>
            <tr>
                <td>7th</td>
                <td>31</td>
            </tr>
            <tr>
                <td>8th</td>
                <td>34</td>
            </tr>
            <tr>
                <td>9th</td>
                <td>36</td>
            </tr>
            <tr>
                <td>10th</td>
                <td>39</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2">*If the spell is uncommon or rare, its<br>difficulty should be adjusted accordingly</td>
            </tr>
        </tfoot>
    </table>
</div>
`

const firstPane: PaneOptions = {
    id: 'FirstPane',
    content: paneContent,
    title: "First pane"
};

const secondPane: PaneOptions = {
    id: 'SecondPane',
    content: paneContentTwo,
    title: "Second Pane"
}

const thirdPane: PaneOptions = {
    id: 'ThridPane',
    content: paneContent,
    title: "Third pane"
};

const fourthPane: PaneOptions = {
    id: 'FourthPane',
    content: paneContentTwo,
    title: "Fourth Pane"
}


const fifthPane: PaneOptions = {
    id: 'FifthPane',
    content: paneContent,
    title: "Fifth pane"
};

const sixthPane: PaneOptions = {
    id: 'SixthPane',
    content: paneContentTwo,
    title: "Sixth Pane"
}
const seventhPane: PaneOptions = {
    id: 'SeventhPane',
    content: paneContent,
    title: "Seventh pane"
};

const eigthPane: PaneOptions = {
    id: 'EigthPane',
    content: paneContentTwo,
    title: "Eight Pane"
}

const layout = new PanelLayout('gm-pane-container');

layout.createTab('tab1', 'Tab 1');
layout.createTab('tab2', 'Tab 2');

layout.createPanelGrid('tab1', 6, [
    { id: 'panel1', content: paneContent },
    { id: 'panel2', content: paneContentTwo },
    { id: 'panel3', content: paneContent },
    { id: 'panel4', content: paneContentTwo },
    { id: 'panel5', content: paneContent },
    { id: 'panel6', content: paneContentTwo },
])


layout.createPanelGrid('tab2', 8, [
    { id: 'panel7', content: paneContentTwo },
    { id: 'panel8', content: paneContent },
    { id: 'panel9', content: paneContentTwo },
    { id: 'panel10', content: paneContent },
    { id: 'panel11', content: paneContentTwo },
    { id: 'panel12', content: paneContent },
    { id: 'panel13', content: paneContentTwo },
    { id: 'panel14', content: paneContent },
])

// Initialize on a tab, this should be saved and remember between loads,
// changing models, etc.
layout.switchTab('tab1')

console.log(layout)
// const paneManager = PaneManager.instance;
// paneManager.initialize('#gm-pane-container');
// paneManager.createTab('First Tab');
// paneManager.createPane(firstPane, 'First Tab')
// paneManager.createPane(secondPane, 'First Tab')
// paneManager.createPane(thirdPane, 'First Tab')
// paneManager.createPane(fourthPane, 'First Tab')
// paneManager.createPane(fifthPane, 'First Tab')
// paneManager.createPane(sixthPane, 'First Tab')
// paneManager.createPane(seventhPane, 'First Tab')
// paneManager.createPane(eigthPane, 'First Tab')
// paneManager.renderTab('First Tab')

// injectPanels(gmPaneContainer, firstPane);

// function injectPanels(parentDiv: HTMLDivElement, pane: Pane): void {
//     const childElement = pane.getElement()
//     parentDiv.appendChild(childElement);
// }
