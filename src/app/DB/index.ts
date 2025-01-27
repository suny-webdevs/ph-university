import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { User } from "../modules/user/user.model"

const superUser = {
  id: "SA-0001",
  email: "superadmin@gmail.com",
  password: config.super_admin_password,
  changePassword: false,
  role: USER_ROLE.superAdmin,
  status: "in-progress",
  isDeleted: false,
}

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    role: USER_ROLE.superAdmin,
  })
  if (!isSuperAdminExists) {
    await User.create(superUser)
  }
}
export default seedSuperAdmin
