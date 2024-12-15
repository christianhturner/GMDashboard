export function destoryElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove()
    } else {
        console.error(`Cannot find element with id: ${elementId}`);
    }
}

export function destoryElements(elementIds: string[]): void {
    const elementsNotFound: string[] = [];
    elementIds.forEach((elId) => {
        const element = document.getElementById(elId);
        if (element) {
            return element.remove()
        } else {
            elementsNotFound.push(elId)
        }
    })
    if (elementsNotFound) {
        console.warn(`The following elements: ${elementsNotFound}, could not be found by ID`)
    }

}

export function evenlyDivideGridColumnsAndRows(id: string, maxPanes: number) {
    const domElement = document.getElementById(id);
    if (!domElement) {
        throw new Error(`Dom Element ${id}, does not exist.Did you forget the preceeding '#'`)
    }
    const columnsPerRow = Math.ceil(maxPanes / 2);

    // create basic grid template
    domElement.style.display = 'grid';
    domElement.style.gridTemplateRows = '1fr 1fr';
    domElement.style.gridTemplateColumns = `repeat(${columnsPerRow}, 1fr)`;

    // if odd number, span the last column
    if (maxPanes % 2 !== 0) {
        // select last cell
        const lastCell = domElement.children[maxPanes - 1];
        if (lastCell) {
            const lastCellId = lastCell.getAttribute('id');
            if (lastCellId) {
                const lastCellElement = document.getElementById(lastCellId);
                lastCellElement!.style.gridRow = '1 / span 2';
                lastCellElement!.style.gridColumn = `${columnsPerRow} `;
            }
            throw new Error(`Last element of ${domElement} has no id can't continue`)
        }
    }
}
