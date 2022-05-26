export const sortByOrderNumber = (a, b) => {
  if (b.value.orderNumber < a.value.orderNumber) {
    return -1
  }
  if (b.value.orderNumber > a.value.orderNumber) {
    return 1
  }
  return 0
}

export const makeContent = ({ value = { title: "", text: "" }, key }) => {
  const { title, text } = value;

  if (title) {
    return ({
      id: key,
      title,
      link: makeLinkFromTitle(title)
    })
  } else {
    const newTitle = text?.split('\n')[ 0 ];
    return ({
      id: key,
      title: newTitle,
      link: makeLinkFromTitle(newTitle)
    })
  }
}

export function getTitleLink(title, text) {
  if (title) {
    return makeLinkFromTitle(title)
  } else {
    const newTitle = text?.split('\n')[ 0 ];
    return makeLinkFromTitle(newTitle)
  }
}

export const makeContents = (poems) => {
  if (!poems) return []
  return poems.map(makeContent)
}

export function getHighlightedText(text, highlight) {
  if (!highlight) return text;
  const parts = text.split(new RegExp(`(${ highlight })`, 'gi'));
  return <span>
    { parts.map(part => part.toLowerCase() === highlight.toLowerCase()
      ? <mark>{ part }</mark>
      : part) }
  </span>;
}


export function makeLinkFromTitle(title) {
  return title?.split(" ").join("-");
}
