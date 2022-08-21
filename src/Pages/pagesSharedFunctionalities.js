
function goTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

  const isTouchDevice = () => {
    return window.matchMedia('(pointer: coarse)').matches
  }

export {
  goTop,
  isTouchDevice,
}
