
import { useState } from "react";
import {
  UserRound,
  Settings,
  Shield,
  SlidersHorizontal,
  Mail,
  Phone,
  Save,
  Eye,
  EyeOff,
  Clock,
  CalendarDays,
  Info,
  Camera,
} from "lucide-react";
import { AdminRegister } from "../../../Store/AdminStore";

const AdminSettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const admin = { AdminRegister }

  const [settings, setSettings] = useState({
    name: admin.name || "",
    email: admin.email || "",
    phone: admin.phone || "",
    displayName: admin.name || "",
    language: "English",
    timeZone: "Africa/Lagos",
    dateFormat: "MM/DD/YYYY",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    twoFactor: false,
    autoLogout: "Never",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Connect your admin update API here.
    // Do not send password fields unless changing the password.

    console.log("Admin settings form submitted.");
  };

  const inputStyle =
    "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelStyle = "mb-1.5 block text-xs font-semibold text-slate-800";

  const Card = ({ children, className = "" }) => (
    <section
      className={`rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );

  const SectionHeading = ({ icon: Icon, title, description }) => (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon size={23} />
      </div>

      <div>
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );

  const PasswordField = ({
    label,
    name,
    value,
    visible,
    toggle,
    placeholder,
  }) => (
    <div>
      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="new-password"
          className={`${inputStyle} pr-11`}
        />

        <button
          type="button"
          onClick={toggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );

  const Toggle = ({ name, title, description }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-xs font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={settings[name]}
        onClick={() =>
          setSettings((prev) => ({
            ...prev,
            [name]: !prev[name],
          }))
        }
        className={`relative h-5 w-10 shrink-0 rounded-full transition ${
          settings[name] ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            settings[name] ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account settings and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
            {/* Profile Information */}
            <Card className="h-full">
              <SectionHeading
                icon={UserRound}
                title="Profile Information"
                description="Update your personal information and contact details."
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[155px_minmax(0,1fr)]">
                <div className="flex flex-col items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-3xl font-semibold text-blue-500">
                    {(settings.name || "A").charAt(0).toUpperCase()}
                  </div>

                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <Camera size={15} />
                    Change Photo
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className={labelStyle}>
                      Full Name
                    </label>
                    <div className="relative">
                      <UserRound
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="name"
                        name="name"
                        value={settings.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className={`${inputStyle} pl-9`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelStyle}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={settings.email}
                        onChange={handleChange}
                        placeholder="admin@example.com"
                        className={`${inputStyle} pl-9`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelStyle}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={settings.phone}
                        onChange={handleChange}
                        placeholder="+234 000 000 0000"
                        className={`${inputStyle} pl-9`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>Role</label>
                    <input
                      value={admin.role || "Administrator"}
                      disabled
                      className={`${inputStyle} cursor-not-allowed bg-slate-100 text-slate-500`}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="h-full">
              <SectionHeading
                icon={Settings}
                title="Account Settings"
                description="Manage your account preferences and general settings."
              />

              <div className="space-y-5">
                <div>
                  <label htmlFor="displayName" className={labelStyle}>
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    name="displayName"
                    value={settings.displayName}
                    onChange={handleChange}
                    placeholder="Enter display name"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="language" className={labelStyle}>
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeZone" className={labelStyle}>
                    Time Zone
                  </label>
                  <div className="relative">
                    <Clock
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      id="timeZone"
                      name="timeZone"
                      value={settings.timeZone}
                      onChange={handleChange}
                      className={`${inputStyle} pl-10`}
                    >
                      <option value="Africa/Lagos">
                        (GMT+01:00) West Africa Time
                      </option>
                      <option value="UTC">(GMT+00:00) UTC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="dateFormat" className={labelStyle}>
                    Date Format
                  </label>
                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      id="dateFormat"
                      name="dateFormat"
                      value={settings.dateFormat}
                      onChange={handleChange}
                      className={`${inputStyle} pl-10`}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security */}
            <Card>
              <SectionHeading
                icon={Shield}
                title="Security"
                description="Keep your account secure with a strong password."
              />

              <div className="space-y-4">
                <PasswordField
                  label="Current Password"
                  name="currentPassword"
                  value={settings.currentPassword}
                  visible={showCurrentPassword}
                  toggle={() =>
                    setShowCurrentPassword((prev) => !prev)
                  }
                  placeholder="Enter current password"
                />

                <PasswordField
                  label="New Password"
                  name="newPassword"
                  value={settings.newPassword}
                  visible={showNewPassword}
                  toggle={() => setShowNewPassword((prev) => !prev)}
                  placeholder="Enter new password"
                />

                <PasswordField
                  label="Confirm New Password"
                  name="confirmPassword"
                  value={settings.confirmPassword}
                  visible={showConfirmPassword}
                  toggle={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  placeholder="Confirm new password"
                />

                <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-600">
                  <Info size={17} className="mt-0.5 shrink-0" />
                  Leave the password fields blank if you do not want to
                  change your password.
                </div>
              </div>
            </Card>

            {/* Preferences */}
            <Card>
              <SectionHeading
                icon={SlidersHorizontal}
                title="Preferences"
                description="Customize your admin experience."
              />

              <div className="divide-y divide-slate-100">
                <Toggle
                  name="emailNotifications"
                  title="Email Notifications"
                  description="Receive email alerts for important updates and activities."
                />

                <Toggle
                  name="twoFactor"
                  title="Two-Factor Authentication"
                  description="Add an extra layer of security to your account."
                />

                <div className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Auto Logout
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Automatically log out after a period of inactivity.
                    </p>
                  </div>

                  <select
                    name="autoLogout"
                    value={settings.autoLogout}
                    onChange={handleChange}
                    className="max-w-36 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500"
                  >
                    <option value="Never">Never</option>
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Save Changes */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
