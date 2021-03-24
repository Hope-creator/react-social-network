export const updateArray = (updateItem, arr) => {
    if (!updateItem || !Array.isArray(arr)) return arr;
    const index = arr.findIndex(conversation => conversation._id === updateItem._id);
    if (index !== -1) {
        let copy = [...arr];
        copy.splice(index, 1);
        copy = [updateItem, ...copy];
        return copy;
    } else {
        return [updateItem, ...arr]
    }
}
