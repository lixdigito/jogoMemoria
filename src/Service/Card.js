
function FillJasonDataCard(id, valueCompare, path) {
  return {
    id,
    valueCompare,
    clicked: false,
    match: false,
    picture: path,
  }
}

function GerateJasonDataCard (paths, idx) {
  const valueCompare = idx + 1;
  const id = valueCompare * 2;
  const card1 = FillJasonDataCard(id-1, valueCompare, paths[0]);
  const card2 = FillJasonDataCard(id, valueCompare, paths[1]);
  return [card1, card2];
}

function GerateDataListCards(listPaths) {
  const resultList = []; 
  listPaths.map((paths, idx) => {
    const cards = GerateJasonDataCard(paths, idx);
    resultList.push(cards[0]);
    resultList.push(cards[1]);    
  });
  return [...resultList];
}

export function GetDataCards(amountPairs) {
  const listPaths = GerateListImages();
  const listLimitedPairs = SortAumontPairs(listPaths, amountPairs);
  const list = GerateDataListCards(listLimitedPairs);
  const listShuffle = ShuffleCards(list);
  return listShuffle;

}

function SortAumontPairs(list, amountPairs) {
  const listIdx = GetIindexlist(list);
  const listResult =[];
  while (listResult.length < amountPairs) {
    let sortedNumber = SortNumber(listIdx);
    listResult.push(list[listIdx[sortedNumber]]);
    listIdx.splice(sortedNumber, 1);;
  }
  return listResult;
}

function GerateListImages() {
  const path = 'Assets/Images/CardFrench';
  //const listJpeg = GerateListImagesGeneric(path,'a','a','jpeg',54);
  const listJpeg = [];
  const listPng = GerateListImagesGeneric(path,'A','B','png',11);
  return [...listJpeg, ...listPng]
} 

function GerateListImagesGeneric(path, nameFirst, nameSecond, extension, size) {
  const listResult = [];
  let i = 1;
  for(i; i <= size; i++ ) {
    const listPath = [`${path}/${nameFirst}${i}.${extension}`,`${path}/${nameSecond}${i}.${extension}`];
    listResult.push(listPath);
  }
  return listResult;
}

function SortNumber(list) {
  return Math.floor(Math.random() * list.length);
}

function GetIindexlist(list) {
  return list.map((item,idx) =>  idx);
}

function ShuffleCards(list) {
  const listIdx = GetIindexlist(list);
  const listResult =[];
  while (listIdx.length > 0) {
    let sortedNumber = SortNumber(listIdx);
    listResult.push(list[listIdx[sortedNumber]]);
    listIdx.splice(sortedNumber, 1);;
  }
  return listResult;
}