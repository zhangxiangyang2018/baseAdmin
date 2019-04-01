const Admin = 'Admin-User'
export function getUser() {
  return window.sessionStorage.getItem(Admin)
}

export function setUser(user) {

  return window.sessionStorage.setItem(Admin, user)
}

export function removeUser() {
  return window.sessionStorage.removeItem(Admin)
}
