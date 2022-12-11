const isUserAdmin = (userRoles) => {
  const adminPermissions = ['admin', 'superadmin']

  const userHasPermission = adminPermissions.some((role) =>
    userRoles.includes(role)
  )

  return userHasPermission
}

module.exports = { isUserAdmin }
