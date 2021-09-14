export default function isProfilePage(): boolean {
  const pathname = window.location.pathname
  const [begin, user, ...rest] = pathname.split('/')
  return begin === '' && user && rest.length === 0
}
