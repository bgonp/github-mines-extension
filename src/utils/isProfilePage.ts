const isProfilePage = (): boolean => {
  const { pathname } = window.location
  const splitted = pathname.split('/').filter(part => part !== '')
  return splitted.length === 1
}

export default isProfilePage
