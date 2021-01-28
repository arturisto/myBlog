const getPreviewImageUrl = (blogs) => {
  let returnItems = [];
  const stringStart ='<img src="';
  const stringEnd = '">';
  const mrandmrseatmedia = "mrandmrseatmedia"
  blogs.forEach((blogItem) => {
    const content = blogItem.content;
    // const subStringStartIndex = content.indexOf(stringStart);
    // const substringStart = content.substring(subStringStartIndex);
    // const subStringEndIndex = substringStart.indexOf(stringEnd);
    // const substringEnd = substringStart.substring(0, subStringEndIndex + 1);
    const stringList = content.split(stringStart);
    let imgUrl = "";
    for(let i =0; i<stringList.length; i++){
        if(stringList[i].includes(mrandmrseatmedia)){
            const subStringEndIndex = stringList[i].indexOf(stringEnd);
            imgUrl = stringList[i].substring(0,subStringEndIndex);
            break;
        }
    }
    let newItem = blogItem;
    newItem.dataValues.previewImageUrl = imgUrl;
    returnItems.push(newItem)
  });
  return returnItems;
};


module.exports = getPreviewImageUrl;
