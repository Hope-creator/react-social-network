export const objectInArray = (items, itemId, objPropName, objProp, value ,method) => {
    return items.map(i => {
        if (i[itemId] === objPropName) {
            if(method === "add") {
                const newProp = [...i[objProp], value]
                const newObj = {...i};
                newObj[objProp] = newProp;
                return newObj
            }
            if(method === "delete") {
                const newProp = [...i[objProp]];
                const index = newProp.indexOf(value);
                newProp.splice(index,1);
                const newObj = {...i};
                newObj[objProp] = newProp;
                return newObj
            }
            return {...i}
        }
        return i
    })
}

