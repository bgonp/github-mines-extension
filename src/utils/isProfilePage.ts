const isProfilePage = (pathname: string): boolean => {
  const splitted = pathname.split('/').filter(part => part !== '')
  return splitted.length === 1
}

export default isProfilePage
