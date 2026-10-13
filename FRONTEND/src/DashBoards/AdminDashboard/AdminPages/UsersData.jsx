import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users as UsersIcon,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import useUserManagementStore from "../../UserDashboard/CourseStore/AdminUserManagementStore";

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getUsername = (user) =>
  user.username || user.email || "Unknown User";

const isAdminAccount = (user) =>
  user.accountType === "Admin" || user.role === "Admin";

const UserData = () => {
  const {
    users,
    loading,
    error,
    getAllUsers,
    updateUser,
    deleteUser,
    clearError,
  } = useUserManagementStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    getAllUsers().catch(() => {});
  }, [getAllUsers]);

  // Search and filter users.
  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return users.filter((user) => {
      const username = (user.username || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const matricNumber = (user.matricNumber || "").toLowerCase();
      const department = (user.department || "").toLowerCase();

      const matchesSearch =
        username.includes(search) ||
        email.includes(search) ||
        matricNumber.includes(search) ||
        department.includes(search);

      const matchesVerification =
        verificationFilter === "all" ||
        (verificationFilter === "verified" && user.isVerified) ||
        (verificationFilter === "unverified" && !user.isVerified);

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      const matchesLevel =
        levelFilter === "all" ||
        (!isAdminAccount(user) &&
          String(user.level || "").match(/\d+/)?.[0] === levelFilter);

      const matchesDepartment =
        departmentFilter === "all" ||
        (!isAdminAccount(user) &&
          (user.department || "").toLowerCase() ===
            departmentFilter.toLowerCase());

      return (
        matchesSearch &&
        matchesVerification &&
        matchesRole &&
        matchesLevel &&
        matchesDepartment
      );
    });
  }, [
    users,
    searchTerm,
    verificationFilter,
    roleFilter,
    levelFilter,
    departmentFilter,
  ]);

  // Summary counts.
  const verifiedCount = users.filter(
    (user) => user.isVerified
  ).length;

  const unverifiedCount = users.length - verifiedCount;

  const studentCount = users.filter(
    (user) => !isAdminAccount(user)
  ).length;

  const adminCount = users.length - studentCount;

  // Open the edit form for a student account.
  const openEditModal = (user) => {
    if (isAdminAccount(user)) return;

    clearError();
    setActionMessage("");
    setActionError("");

    setSelectedUser(user);

    setEditData({
      username: user.username || "",
      email: user.email || "",
      level: user.level || "",
      department: user.department || "",
      matricNumber: user.matricNumber || "",
    });
  };

  // Close the edit form.
  const closeEditModal = () => {
    if (saving) return;

    setSelectedUser(null);
    setEditData({});
    clearError();
    setActionError("");
  };

  // Update a student account.
  const handleUpdateUser = async (event) => {
    event.preventDefault();

    if (!selectedUser || isAdminAccount(selectedUser)) return;

    setSaving(true);
    setActionError("");
    setActionMessage("");

    try {
      await updateUser(selectedUser._id, editData);

      setSelectedUser(null);
      setEditData({});
      setActionMessage("User updated successfully.");
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Failed to update user."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete a student account.
  const handleDeleteUser = async (user) => {
    if (isAdminAccount(user)) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${getUsername(user)}'s account? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(user._id);
    setActionError("");
    setActionMessage("");

    try {
      await deleteUser(user._id);

      setActionMessage(
        `${getUsername(user)}'s account was deleted.`
      );
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Failed to delete user."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Get unique departments from student accounts.
  const departments = [
    ...new Set(
      users
        .filter((user) => !isAdminAccount(user))
        .map((user) => user.department)
        .filter(Boolean)
    ),
  ].sort();

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-5 sm:px-5 lg:px-7">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">
            User Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage registered StudStore accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => getAllUsers().catch(() => {})}
          disabled={loading}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh Users"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Accounts</p>
              <h2 className="mt-2 text-2xl font-bold text-blue-950">
                {users.length}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
              <UsersIcon size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Students</p>
              <h2 className="mt-2 text-2xl font-bold text-blue-950">
                {studentCount}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
              <UsersIcon size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Admin Accounts</p>
              <h2 className="mt-2 text-2xl font-bold text-blue-950">
                {adminCount}
              </h2>
            </div>

            <div className="rounded-lg bg-purple-50 p-3 text-purple-700">
              <UsersIcon size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Verified Emails</p>
              <h2 className="mt-2 text-2xl font-bold text-green-700">
                {verifiedCount}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {unverifiedCount} unverified
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-700">
              <CheckCircle2 size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Messages */}
      {(actionMessage || actionError || error) && (
        <div
          role="status"
          className={`mb-4 rounded-lg border p-3 text-sm ${
            actionError || error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {actionError || actionMessage || error}
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3">
          <Search size={18} className="shrink-0 text-gray-400" />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search username, email, matric number..."
            className="w-full min-w-0 py-2.5 text-sm outline-none"
            aria-label="Search users"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {/* Email Verification Filter */}
          <select
            value={verificationFilter}
            onChange={(event) =>
              setVerificationFilter(event.target.value)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            aria-label="Filter by email verification"
          >
            <option value="all">All verification statuses</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            aria-label="Filter by role"
          >
            <option value="all">All roles</option>

            {[...new Set(users.map((user) => user.role).filter(Boolean))]
              .sort()
              .map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
          </select>

          {/* Level Filter */}
          <select
            value={levelFilter}
            onChange={(event) => setLevelFilter(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            aria-label="Filter by level"
          >
            <option value="all">All levels</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
            <option value="500">500 Level</option>
          </select>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(event.target.value)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            aria-label="Filter by department"
          >
            <option value="all">All departments</option>

            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {loading && users.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-500">
            Loading users...
          </div>
        ) : error && users.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => getAllUsers().catch(() => {})}
              className="mt-3 text-sm font-medium text-blue-700 underline"
            >
              Try again
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <UsersIcon
              className="mx-auto mb-3 text-gray-300"
              size={36}
            />

            <p className="font-medium text-gray-700">
              No users found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr className="text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-5 py-4 font-semibold">User</th>
                    <th className="px-5 py-4 font-semibold">
                      Department
                    </th>
                    <th className="px-5 py-4 font-semibold">Level</th>
                    <th className="px-5 py-4 font-semibold">
                      Matric Number
                    </th>
                    <th className="px-5 py-4 font-semibold">Role</th>
                    <th className="px-5 py-4 font-semibold">
                      Email Status
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      Registered
                    </th>
                    <th className="px-5 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => {
                    const adminAccount = isAdminAccount(user);

                    return (
                      <tr
                        key={`${user.accountType || user.role}-${user._id}`}
                        className="border-b border-gray-100 last:border-0 hover:bg-blue-50/40"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-blue-950">
                            {getUsername(user)}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {user.email}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {user.department || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {user.level || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {user.matricNumber || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                            {user.role || "Student"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          {user.isVerified ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                              <CheckCircle2 size={14} />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">
                              <XCircle size={14} />
                              Unverified
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                          {formatDate(user.createdAt)}
                        </td>

                        <td className="px-5 py-4">
                          {adminAccount ? (
                            <span className="text-xs text-gray-400">
                              Admin account
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openEditModal(user)}
                                aria-label={`Edit ${getUsername(user)}`}
                                className="rounded-lg border border-blue-100 p-2 text-blue-700 transition hover:bg-blue-50"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteUser(user)}
                                disabled={deletingId === user._id}
                                aria-label={`Delete ${getUsername(user)}`}
                                className="rounded-lg border border-red-100 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
              {filteredUsers.map((user) => {
                const adminAccount = isAdminAccount(user);

                return (
                  <article
                    key={`${user.accountType || user.role}-${user._id}`}
                    className="rounded-xl border border-gray-100 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="break-words font-semibold text-blue-950">
                          {getUsername(user)}
                        </h3>

                        <p className="mt-1 break-all text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>

                      {user.isVerified ? (
                        <span className="shrink-0 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          Verified
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                          Unverified
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-400">
                          Department
                        </p>
                        <p className="mt-1 break-words text-gray-700">
                          {user.department || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Level</p>
                        <p className="mt-1 text-gray-700">
                          {user.level || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Matric Number
                        </p>
                        <p className="mt-1 break-words text-gray-700">
                          {user.matricNumber || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Role</p>
                        <p className="mt-1 text-gray-700">
                          {user.role || "Student"}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <p className="text-xs text-gray-400">
                          Registered
                        </p>
                        <p className="mt-1 text-gray-700">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-3">
                      {adminAccount ? (
                        <p className="text-center text-xs text-gray-400">
                          Admin account — no student actions available
                        </p>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(user)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user)}
                            disabled={deletingId === user._id}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                          >
                            <Trash2 size={15} />
                            {deletingId === user._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-3">
            <p className="text-xs text-gray-500">
              Showing {filteredUsers.length} of {users.length} accounts
            </p>
          </div>
        )}
      </div>

      {/* Edit Student Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-title"
            className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div>
                <h2
                  id="edit-user-title"
                  className="text-lg font-bold text-blue-950"
                >
                  Edit User
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Update this student's profile information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={saving}
                aria-label="Close edit form"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleUpdateUser}
              className="space-y-4 p-5"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Username
                </label>

                <input
                  required
                  minLength={6}
                  maxLength={20}
                  value={editData.username || ""}
                  onChange={(event) =>
                    setEditData({
                      ...editData,
                      username: event.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={editData.email || ""}
                  onChange={(event) =>
                    setEditData({
                      ...editData,
                      email: event.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Department
                  </label>

                  <input
                    required
                    value={editData.department || ""}
                    onChange={(event) =>
                      setEditData({
                        ...editData,
                        department: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Level
                  </label>

                  <input
                    required
                    value={editData.level || ""}
                    onChange={(event) =>
                      setEditData({
                        ...editData,
                        level: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Matric Number
                </label>

                <input
                  required
                  value={editData.matricNumber || ""}
                  onChange={(event) =>
                    setEditData({
                      ...editData,
                      matricNumber: event.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Current role:</span>{" "}
                  {selectedUser.role || "Student"}
                </p>

                <p className="mt-1">
                  <span className="font-medium">Email verified:</span>{" "}
                  {selectedUser.isVerified ? "Yes" : "No"}
                </p>

                <p className="mt-1">
                  Role and verification status cannot be changed in this form.
                </p>
              </div>

              {actionError && (
                <p className="text-sm text-red-600">{actionError}</p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={saving}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserData;