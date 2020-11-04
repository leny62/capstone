export default ()=>{
    let date = new Date();
    let today = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    return today;
}
