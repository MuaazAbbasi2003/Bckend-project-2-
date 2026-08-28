export const UserRolesEnum = {
  ADMIN: "admin",
  PROJECT_Admin: "project Admin",
  Mmber: "member",
};

export const AvailableUserRole = Object.values(UserRolesEnum);

export const TaskStatusEnum = {
  TODO: "to-do",
  IN_PROGRESS: "IN-progress",
  DONE: "Done",
};

export const AvailableTaskStatus = Object.values(TaskStatusEnum);
