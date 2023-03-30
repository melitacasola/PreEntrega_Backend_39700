export function getNextId(arr){
    if(arr.length === 0){
        return 0
    }
    const maxId = arr.reduce((acc, curr) =>{
        return curr.id > acc ? curr.id : acc
    }, 0);

    return maxId +1
}