
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

export function GetDataCards(amountPairs, themeId) {
  const listPaths = GerateListImages(themeId);
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

function GerateListImages(themeId) {
  const theme = themesList[themeId];
  const listPng = GerateListImagesGeneric(theme.path,theme.imageName,theme.wordName,theme.extension,theme.maxValue);
  return [...listPng]
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

export const themesList = [
  {
    id: 0,
    value: 0,
    name: 'Objeto',
    path: 'Assets/Images/CardFrench/Object',
    imageName: 'A',
    wordName: 'B',
    extension: 'png',
    maxValue: 11
  },
  {
    id: 1,
    value: 1,
    name: 'Comida',
    path: 'Assets/Images/CardFrench/Food',
    imageName: 'A',
    wordName: 'B',
    extension: 'png',
    maxValue: 24
  },
  {
    id: 2,
    value: 2,
    name: 'Vestuário',
    path: 'Assets/Images/CardFrench/Clothing',
    imageName: 'A',
    wordName: 'B',
    extension: 'png',
    maxValue: 19
  },
  {
    id: 3,
    value: 3,
    name: 'Cor',
    path: 'Assets/Images/CardFrench/Color',
    imageName: 'A',
    wordName: 'B',
    extension: 'png',
    maxValue: 12
  }
]