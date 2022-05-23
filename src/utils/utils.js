export const sortByDateTime = (a, b) => {
  if (b.value.createdAt < a.value.createdAt) {
    return -1
  }
  if (b.value.createdAt > a.value.createdAt) {
    return 1
  }
  return 0
}

export const makeContent = ({ title, text }) => {
  if (title) {
    return ({
      title,
      link: makeLinkFromTitle(title)
    })
  } else {
    const newTitle = text?.split('\n')[ 0 ];
    return ({
      title: newTitle,
      link: makeLinkFromTitle(newTitle)
    })
  }
}

export const makeContents = (poems) => {
  if (!poems) return []
  return poems.map(({ value }) => makeContent(value))
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
