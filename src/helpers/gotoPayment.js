import qs from 'qs'
import { local } from '@/helpers'
import { apiUrl } from '@/utils/path'

export default function(item, user, fullPath) {
  // save current path first,
  // on app open, redirect to that path
  local.savedPath = fullPath

  const data = qs.stringify({
    authId: user.id
  })

  const url = `${apiUrl}/answers/${item.id}/pay?${data}`
  window.location.href = url
}
