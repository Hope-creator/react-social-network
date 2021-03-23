export const objectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(i => {
        if (i[itemId] === objPropName) { return { ...i, ...newObjProps } }
        return i
    })
}

